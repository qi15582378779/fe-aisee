"use client";

import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

interface FallingTextProps {
    text?: string;
    highlightWords?: string[];
    trigger?: "auto" | "scroll" | "click" | "hover" | "manual";
    backgroundColor?: string;
    wireframes?: boolean;
    gravity?: number;
    mouseConstraintStiffness?: number;
    fontSize?: string;
    separator?: string; // 新增：分割符，默认为逗号
    spanStyles?: Array<{
        backgroundColor?: string;
        color?: string;
        fontWeight?: string;
        fontSize?: string;
        padding?: string;
        borderRadius?: string;
        border?: string;
        boxShadow?: string;
    }>; // 新增：每个span的自定义样式
    onRef?: (trigger: () => void) => void; // 新增：暴露触发函数给父组件
}

const FallingText: React.FC<FallingTextProps> = ({
    text = "",
    highlightWords = [],
    trigger = "auto",
    backgroundColor = "transparent",
    wireframes = false,
    gravity = 1,
    mouseConstraintStiffness = 0.2,
    fontSize = "1rem",
    separator = ",", // 默认使用逗号分割
    spanStyles = [], // 默认空数组
    onRef
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);

    const [effectStarted, setEffectStarted] = useState(false);
    const [resetKey, setResetKey] = useState(0);

    useEffect(() => {
        if (!textRef.current) return;
        const words = text
            .split(separator)
            .map((word) => word.trim())
            .filter((word) => word.length > 0);

        const newHTML = words
            .map((word, index) => {
                const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));

                // 获取当前span的自定义样式
                const customStyle = spanStyles[index] || {};

                // 构建样式字符串
                const styleString = Object.entries(customStyle)
                    .map(([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`)
                    .join("; ");

                return `<span
          class="inline-block mx-[2px] select-none ${isHighlighted ? "text-cyan-500 font-bold" : ""}"
          style="${styleString}"
        >
          ${word}
        </span>`;
            })
            .join(" ");

        textRef.current.innerHTML = newHTML;
    }, [text, highlightWords, separator, spanStyles]);

    useEffect(() => {
        if (trigger === "auto") {
            setEffectStarted(true);
            return;
        }
        if (trigger === "scroll" && containerRef.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setEffectStarted(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.1 }
            );
            observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, [trigger]);

    // 暴露触发函数给父组件
    useEffect(() => {
        if (onRef) {
            onRef(() => {
                setEffectStarted(false);
                setResetKey(prev => prev + 1);
                setTimeout(() => {
                    setEffectStarted(true);
                }, 50);
            });
        }
    }, [onRef]);

    useEffect(() => {
        if (!effectStarted) return;

        const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

        if (!containerRef.current || !canvasContainerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        if (width <= 0 || height <= 0) return;

        const engine = Engine.create();
        engine.world.gravity.y = gravity;

        const render = Render.create({
            element: canvasContainerRef.current,
            engine,
            options: {
                width,
                height,
                background: backgroundColor,
                wireframes
            }
        });

        const boundaryOptions = {
            isStatic: true,
            render: { fillStyle: "transparent" }
        };
        const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
        const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

        if (!textRef.current) return;
        const wordSpans = textRef.current.querySelectorAll("span");
        const wordBodies = [...wordSpans].map((elem) => {
            const rect = elem.getBoundingClientRect();

            const x = rect.left - containerRect.left + rect.width / 2;
            const y = rect.top - containerRect.top + rect.height / 2;

            const body = Bodies.rectangle(x, y, rect.width, rect.height, {
                render: { fillStyle: "transparent" },
                restitution: 0.8,
                frictionAir: 0.01,
                friction: 0.2
            });
            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 5,
                y: 0
            });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

            return { elem, body };
        });

        wordBodies.forEach(({ elem, body }) => {
            elem.style.position = "absolute";
            elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
            elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
            elem.style.transform = "none";
        });

        const mouse = Mouse.create(containerRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: mouseConstraintStiffness,
                render: { visible: false }
            }
        });
        render.mouse = mouse;

        World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map((wb) => wb.body)]);

        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        const updateLoop = () => {
            wordBodies.forEach(({ body, elem }) => {
                const { x, y } = body.position;
                elem.style.left = `${x}px`;
                elem.style.top = `${y}px`;
                elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
            });
            Matter.Engine.update(engine);
            requestAnimationFrame(updateLoop);
        };
        updateLoop();

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas && canvasContainerRef.current) {
                canvasContainerRef.current.removeChild(render.canvas);
            }
            World.clear(engine.world, false);
            Engine.clear(engine);
        };
    }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness, resetKey]);

    const handleTrigger = () => {
        if (trigger === "click" || trigger === "hover") {
            setEffectStarted(false);
            setResetKey(prev => prev + 1);
            setTimeout(() => {
                setEffectStarted(true);
            }, 50);
        }
    };

    return (
        <div ref={containerRef} className="relative z-[1] w-full h-full cursor-pointer text-center overflow-hidden" onClick={trigger === "click" ? handleTrigger : undefined} onMouseEnter={trigger === "hover" ? handleTrigger : undefined}>
            <div
                ref={textRef}
                className="block text-[16px]"
                style={{
                    fontSize
                }}
            />

            <div className="absolute top-0 left-0 z-0" ref={canvasContainerRef} />
        </div>
    );
};

export default FallingText;
