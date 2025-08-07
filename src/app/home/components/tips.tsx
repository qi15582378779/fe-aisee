"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Tips() {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;

        const handleScroll = () => {
            setIsVisible(false);
            setIsScrolling(true);
            
            // 检查是否滚动到底部
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const isBottom = scrollTop + windowHeight >= documentHeight - 10; // 10px的容差
            
            setIsAtBottom(isBottom);
            
            // 清除之前的定时器
            clearTimeout(scrollTimeout);
            
            // 设置新的定时器，1.5秒后认为停止滚动
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
                setIsVisible(true);
            }, 1500);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    return (
        <div className={`fixed bottom-[24px] right-[48px] z-20 w-[12px] h-[30px] animate-float`}>
            <Image 
                src="/images/tips.svg" 
                alt="bg" 
                width={12} 
                height={30} 
                className={`w-[12px] h-[30px] transition-all duration-300 ${
                    isVisible ? "opacity-100" : "opacity-0"
                } ${isAtBottom ? "rotate-180" : ""}`} 
            />
        </div>
    );
}
