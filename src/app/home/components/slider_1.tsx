"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Slider1() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current || !imgRef.current || !textRef.current) return;

        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            gsap.set(imgRef.current, { width: "100%" });
            gsap.set(textRef.current, { opacity: 1, y: 0 });
            return;
        }

        const wrapper = wrapperRef.current;
        const img = imgRef.current;
        const text = textRef.current;

        // ✅ 初始进入页面的淡入动画
        // gsap.fromTo(text, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

        const initialWidth = 384;
        const wrapperWidth = wrapper.clientWidth;
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const expandedHeight = wrapperWidth * aspectRatio;

        // 给 wrapper 设置最小高度，确保足够撑开
        gsap.set(wrapper, { minHeight: expandedHeight + 100 });

        // 创建 timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: "+=1500",
                scrub: true,
                pin: true,
                invalidateOnRefresh: true
                // markers: true,
            }
        });

        // 图片宽度从初始值到 wrapper 宽度
        tl.fromTo(img, { width: initialWidth }, { width: wrapperWidth, ease: "none" }, 0)
            // 文字透明度从 1 变到 0，Y 轴上移 100px，动画和图片同步进行
            .to(text, { opacity: 0, y: -100, ease: "none" }, 0);

        // 动画结束后给 wrapper 赋一个固定高度，防止后续内容叠加
        ScrollTrigger.addEventListener("refreshInit", () => {
            gsap.set(wrapper, { minHeight: expandedHeight + 100 });
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
            ScrollTrigger.removeEventListener("refreshInit", () => {
                gsap.set(wrapper, { minHeight: expandedHeight + 100 });
            });
        };
    }, []);

    return (
        <div ref={wrapperRef} className="w-full min-h-screen relative flex flex-col justify-between pt-[100px] pb-[27px] px-12 z-10 max-md:px-4 max-md:pt-[30px] max-md:pb-[86px]">
            <div className="flex justify-end relative z-10">
                <div className="flex flex-col gap-2">
                    <img src="/images/bg1.svg" alt="slider_1" ref={imgRef} style={{ objectFit: "contain", display: "block" }} />
                    <p className="text-[#111111] text-[16px] leading-[150%]">Product Demo • Live Analytics</p>
                </div>
            </div>

            <div className="flex flex-col gap-6 text-[#111111] w-[925px] max-w-full absolute bottom-0 left-12 max-md:bottom-auto max-md:left-auto max-md:relative" ref={textRef}>
                <p className="text-[48px] leading-[125%] max-md:text-[20px] max-md:leading-[120%]">Make Your Web3 Project Visible to AI.</p>
                <p className="text-[68px] leading-[117.647%] max-md:text-[36px] max-md:leading-[133.333%]">All-in-One AEO Toolkit built for the AI-first internet.</p>
            </div>
        </div>
    );
}
