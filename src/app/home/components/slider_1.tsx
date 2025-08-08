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
    
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            gsap.set(imgRef.current, { width: "100%" });
            gsap.set(textRef.current, { opacity: 1, y: 0 });
            return;
        }
    
        const wrapper = wrapperRef.current as HTMLDivElement;
        const img = imgRef.current as HTMLImageElement;
        const wrapperWidth = wrapper.clientWidth;
        const initialWidth = 383.98;
    
        gsap.set(img, { width: initialWidth });
        gsap.set(textRef.current, { opacity: 1, y: 0 });
    
        // 计算图片宽高比
        const aspectRatio = img.naturalHeight / img.naturalWidth;
    
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: "+=1500",
                scrub: true,
                pin: true,
                onUpdate: (self) => {
                    // self.progress 0~1
                    // 计算当前 img 宽度
                    const currentWidth = gsap.utils.interpolate(initialWidth, wrapperWidth, self.progress);
                    const currentHeight = currentWidth * aspectRatio;
    
                    // 设置 img 宽度和 wrapper 高度
                    gsap.set(img, { width: currentWidth });
                    gsap.set(wrapper, { height: currentHeight + 100 /*或你容器内其他内容高度补偿*/ });
    
                    // 设置文字透明度和位移
                    gsap.to(textRef.current, { opacity: 1 - self.progress, y: -100 * self.progress, overwrite: "auto" });
                }
            }
        });
    
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tl.kill();
        };
    }, []);
    

    return (
        <div ref={wrapperRef} className="w-full min-h-screen relative flex flex-col justify-between pt-[100px] pb-[27px] px-12 z-10 max-md:px-4 max-md:pt-[30px] max-md:pb-[86px]">
            <div className="flex justify-end">
                <div className="flex flex-col gap-2">
                    <img src="/images/bg1.svg" alt="slider_1" ref={imgRef} style={{ objectFit: "contain" }} />
                    <p className="text-[#111111] text-[16px] leading-[150%]">Product Demo • Live Analytics</p>
                </div>
            </div>

            <div className="flex flex-col gap-6 text-[#111111] w-[925px] max-w-full" ref={textRef}>
                <p className="text-[48px] leading-[125%] max-md:text-[20px] max-md:leading-[120%]">Make Your Web3 Project Visible to AI.</p>
                <p className="text-[68px] leading-[117.647%] max-md:text-[36px] max-md:leading-[133.333%]">All-in-One AEO Toolkit built for the AI-first internet.</p>
            </div>
        </div>
    );
}
