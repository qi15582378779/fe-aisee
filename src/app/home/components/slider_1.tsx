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

        // 检查是否为移动设备
        const isMobile = window.innerWidth <= 768;
        
        // 如果是移动设备，直接返回，不执行GSAP动画
        if (isMobile) {
            // 设置移动端的静态样式
            gsap.set(imgRef.current, { width: "100%" });
            gsap.set(textRef.current, { opacity: 1, y: 0 });
            return;
        }

        const wrapper = wrapperRef.current as HTMLElement;
        const wrapperWidth = wrapper.clientWidth;
        const wrapperHeight = wrapper.clientHeight;
        const initialWidth = 383.98;
        const endValue = wrapperHeight >= 2000 ? "bottom top" : `+=3000`;

        console.log(wrapperHeight, endValue);

        const ctx = gsap.context(() => {
            // 设置初始宽度和透明度
            gsap.set(imgRef.current, { width: initialWidth });
            gsap.set(textRef.current, { opacity: 1, y: 0 });

            // 创建 timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    end: endValue,
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
        <div ref={wrapperRef} className="w-full min-h-screen relative pt-[70px] flex flex-col justify-end pb-[27px] px-12 z-10 max-md:px-4 max-md:pt-[30px] max-md:pb-[86px]">
            <div className="flex flex-col gap-2 absolute z-2 top-[100px] right-0 px-12 max-md:px-4">
                <img src="/images/bg1.svg" alt="slider_1" ref={imgRef} style={{ objectFit: "contain" }} />
                <p className="text-[#111111] text-[16px] leading-[150%]">Product Demo • Live Analytics</p>
            </div>

            <div className="flex flex-col gap-6 text-[#111111] w-[925px] max-w-full" ref={textRef}>
                <p className="text-[48px] leading-[125%] max-md:text-[20px] max-md:leading-[120%]">Make Your Web3 Project Visible to AI.</p>
                <p className="text-[68px] leading-[117.647%] max-md:text-[36px] max-md:leading-[133.333%]">All-in-One AEO Toolkit built for the AI-first internet.</p>
            </div>
        </div>
    );
}
