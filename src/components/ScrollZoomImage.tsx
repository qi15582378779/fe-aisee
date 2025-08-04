"use client";

import { useEffect, useRef, useState } from "react";

const imgReelMp4 = "http://localhost:3845/assets/b84efa977a0813d567a2a9322bbf0c586dcef268.png";

interface ScrollZoomImageProps {
    children?: React.ReactNode;
}

export default function ScrollZoomImage({ children }: ScrollZoomImageProps) {
    const [scale, setScale] = useState(1);
    const [isFullSize, setIsFullSize] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !imageRef.current) return;

            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // 定义滚动阶段
            const scrollDistance = windowHeight * 1.5; // 滚动1.5个屏幕高度来完成放大

            // 计算滚动进度 (0 到 1)
            const scrollProgress = Math.max(0, Math.min(1, scrollY / scrollDistance));

            // 计算缩放比例
            // 初始宽度是383.98px，目标宽度是100%视口宽度
            const initialWidth = 383.98;
            const targetWidth = window.innerWidth;
            const initialScale = initialWidth / targetWidth;
            const targetScale = 1;

            // 随着滚动进度增加，scale从initialScale增加到targetScale
            const currentScale = initialScale + (targetScale - initialScale) * scrollProgress;

            setScale(currentScale);

            // 检查是否达到100%宽度
            if (scrollProgress >= 1) {
                setIsFullSize(true);
            } else {
                setIsFullSize(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // 初始调用

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative w-full" ref={containerRef}>
            {/* 图片容器 - 默认在右上角，随着滚动逐渐放大并居中 */}
            <div
                className="fixed z-10"
                style={{
                    top: isFullSize ? '50%' : '20%',
                    left: isFullSize ? '50%' : 'auto',
                    right: isFullSize ? 'auto' : '12%',
                    transform: isFullSize 
                        ? `translate(-50%, -50%) scale(${scale})` 
                        : `scale(${scale})`,
                    transformOrigin: "center center",
                    transition: "all 0.05s ease-out"
                }}
            >
                <div ref={imageRef} className="bg-left bg-no-repeat bg-size-[100%_111.12%] h-[254px] max-w-[400px] relative rounded-xl shrink-0 w-[383.98px]" style={{ backgroundImage: `url('${imgReelMp4}')` }}>
                    <div aria-hidden="true" className="absolute border border-[rgba(17,17,17,0.1)] border-solid inset-0 pointer-events-none rounded-xl" />
                </div>
            </div>

            {/* 内容区域 - 只有在图片达到100%时才显示 */}
            <div
                className={`w-full transition-all duration-700 ease-out ${isFullSize ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
                style={{
                    marginTop: isFullSize ? "100vh" : "0"
                }}
            >
                {children}
            </div>

            {/* 占位空间，确保滚动条正常工作 */}
            <div style={{ height: "200vh" }} />
        </div>
    );
}
