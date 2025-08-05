"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Slider1() {
    const wrapperRef = useRef(null);
    const imgRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (!wrapperRef.current || !imgRef.current || !textRef.current) return;

        const wrapper = wrapperRef.current as HTMLElement;
        const wrapperWidth = wrapper.clientWidth;
        const initialWidth = 383.98;

        const ctx = gsap.context(() => {
            // 设置初始宽度和透明度
            gsap.set(imgRef.current, { width: initialWidth });
            gsap.set(textRef.current, { opacity: 1, y: 0 });

            // 创建 timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true
                    // markers: true,
                }
            });

            // 顺序执行两个动画
            tl.to(imgRef.current, { width: wrapperWidth }, 0) // 第一个动画
                .to(textRef.current, { opacity: 0, y: -100 }, 0); // 同步执行
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} className="w-full min-h-screen relative pt-[70px] flex flex-col justify-end pb-[27px] px-12 z-10">
            <div className="flex flex-col gap-2 absolute z-2 top-[100px] right-0 px-12">
                <img src="/images/bg1.svg" alt="slider_1" ref={imgRef} style={{ objectFit: "contain" }} />
                <p className="text-[#111111] text-[16px] leading-[150%]">Product Demo • Live Analytics</p>
            </div>

            <div className="flex flex-col gap-6 text-[#111111] w-[925px] max-w-full" ref={textRef}>
                <p className="text-[48px] leading-[125%]">Make Your Web3 Project Visible to AI.</p>
                <p className="text-[68px] leading-[117.647%]">All-in-One AEO Toolkit built for the AI-first internet.</p>
            </div>
        </div>
    );
}
