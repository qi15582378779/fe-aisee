"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
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
        whiteSpace?: string;
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
          class="inline-block mx-[2px] select-none whitespace-nowrap ${isHighlighted ? "text-cyan-500 font-bold" : ""}"
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
                setResetKey((prev) => prev + 1);
                setTimeout(() => {
                    setEffectStarted(true);
                }, 50);
            });
        }
    }, [onRef]);

    useLayoutEffect(() => {
        if (!effectStarted) return;

        const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

        if (!containerRef.current || !canvasContainerRef.current) return;

        // 添加延迟确保容器尺寸稳定
        const initPhysics = () => {
            setTimeout(() => {
                if (!containerRef.current) return;

                const width = containerRef.current.scrollWidth;
                const height = containerRef.current.scrollHeight;

                console.log("containerRef", containerRef.current);
                console.log("width", width, "height", height);

                if (width <= 0 || height <= 0) return;

                const engine = Engine.create();
                engine.world.gravity.y = gravity;

                // 确保 canvas 容器有正确的尺寸，并清理旧的 canvas
                if (canvasContainerRef.current) {
                    canvasContainerRef.current.style.width = `${width}px`;
                    canvasContainerRef.current.style.height = `${height}px`;

                    // 清理所有已存在的 canvas
                    const existingCanvases = canvasContainerRef.current.querySelectorAll("canvas");
                    existingCanvases.forEach((canvas) => {
                        canvasContainerRef.current!.removeChild(canvas);
                    });
                }

                const render = Render.create({
                    element: canvasContainerRef.current!,
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
                // 修复地板位置，确保在容器底部
                const floor = Bodies.rectangle(width / 2, height - 10, width, 20, boundaryOptions);
                const leftWall = Bodies.rectangle(-10, height / 2, 20, height, boundaryOptions);
                const rightWall = Bodies.rectangle(width + 10, height / 2, 20, height, boundaryOptions);
                const ceiling = Bodies.rectangle(width / 2, -10, width, 20, boundaryOptions);

                if (!textRef.current) return;
                const wordSpans = textRef.current.querySelectorAll("span");
                const wordBodies = [...wordSpans].map((elem) => {
                    const rect = elem.getBoundingClientRect();
                    const containerRect = containerRef.current!.getBoundingClientRect();

                    const x = rect.left - containerRect.left + rect.width / 2;
                    const y = rect.top - containerRect.top + rect.height / 2;

                    const body = Bodies.rectangle(x, y, rect.width, rect.height, {
                        render: { fillStyle: "transparent" },
                        restitution: 0.3, // 降低弹性，让元素更容易停在底部
                        frictionAir: 0.005, // 减少空气阻力
                        friction: 0.1 // 减少摩擦力
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

                const mouse = Mouse.create(containerRef.current!);
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

                // 监听窗口大小变化，重新调整 canvas 尺寸
                const handleResize = () => {
                    if (containerRef.current && canvasContainerRef.current) {
                        const newWidth = containerRef.current.scrollWidth;
                        const newHeight = containerRef.current.scrollHeight;

                        if (newWidth > 0 && newHeight > 0) {
                            canvasContainerRef.current.style.width = `${newWidth}px`;
                            canvasContainerRef.current.style.height = `${newHeight}px`;
                            render.canvas.width = newWidth;
                            render.canvas.height = newHeight;
                            render.options.width = newWidth;
                            render.options.height = newHeight;
                        }
                    }
                };

                window.addEventListener("resize", handleResize);

                const updateLoop = () => {
                    wordBodies.forEach(({ body, elem }) => {
                        const { x, y } = body.position;
                        // 确保元素不会超出容器边界
                        const clampedX = Math.max(0, Math.min(x, width));
                        const clampedY = Math.max(0, Math.min(y, height - 5)); // 留出一些空间给地板

                        elem.style.left = `${clampedX}px`;
                        elem.style.top = `${clampedY}px`;
                        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
                    });
                    Matter.Engine.update(engine);
                    requestAnimationFrame(updateLoop);
                };
                updateLoop();

                return () => {
                    window.removeEventListener("resize", handleResize);
                    Render.stop(render);
                    Runner.stop(runner);
                    // 清理所有 canvas
                    if (canvasContainerRef.current) {
                        const existingCanvases = canvasContainerRef.current.querySelectorAll("canvas");
                        existingCanvases.forEach((canvas) => {
                            canvasContainerRef.current!.removeChild(canvas);
                        });
                    }
                    World.clear(engine.world, false);
                    Engine.clear(engine);
                };
            }, 100);
        };

        // 延迟执行，确保容器尺寸稳定
        initPhysics();

        return () => {
            // 清理可能存在的旧 canvas
            if (canvasContainerRef.current) {
                const existingCanvas = canvasContainerRef.current.querySelector("canvas");
                if (existingCanvas) {
                    canvasContainerRef.current.removeChild(existingCanvas);
                }
            }
        };
    }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness, resetKey]);

    const handleTrigger = () => {
        if (trigger === "click" || trigger === "hover") {
            setEffectStarted(false);
            setResetKey((prev) => prev + 1);
            setTimeout(() => {
                setEffectStarted(true);
            }, 50);
        }
    };

    return (
        <div ref={containerRef} className="relative z-[1] w-full h-full cursor-pointer text-center overflow-hidden min-h-[200px]" onClick={trigger === "click" ? handleTrigger : undefined} onMouseEnter={trigger === "hover" ? handleTrigger : undefined}>
            <div
                ref={textRef}
                className="block text-[16px] w-full h-full"
                style={{
                    fontSize
                }}
            />

            <div className="absolute w-full h-full top-0 left-0 z-0" ref={canvasContainerRef} />
        </div>
    );
};

export default FallingText;
