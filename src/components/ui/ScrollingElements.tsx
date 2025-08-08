"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform, useMotionValue, animate } from "framer-motion";

interface ScrollingElementsProps {
    elements?: React.ReactNode[];
    className?: string;
    containerHeight?: number; // 现在作为默认值使用
    itemHeight?: number;
    gap?: number;
    xOffset?: number;
    duration?: number;
}

const ScrollingElement: React.FC<{
    element: React.ReactNode;
    index: number;
    containerHeight: number;
    itemHeight: number;
    gap: number;
    totalCount: number;
    duration: number;
    xOffset: number;
}> = ({ element, index, containerHeight, itemHeight, gap, totalCount, duration, xOffset }) => {
    const offset = itemHeight + gap;

    // 初始位置加上间距 - 第一个元素从容器底部开始
    const y = useMotionValue(containerHeight/2 + offset * index); 

    // x 偏移
    const x = useTransform(
        y,
        [-offset, containerHeight / 2, containerHeight + offset],
        [xOffset, 0, xOffset] // 使用可配置的横向偏移量
    );

    // 透明度变化
    const opacity = useTransform(y, [-offset, containerHeight * 0.25, containerHeight * 0.75, containerHeight + offset], [0, 1, 1, 0]);

    // 无限循环动画 - 暂时关闭
    React.useEffect(() => {
        const controls = animate(y, [-offset, containerHeight + offset], {
            duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: index * (duration / 10)
        });
        return () => controls.stop();
    }, [y, containerHeight, offset, duration, index]);

    return (
        <motion.div
            className="absolute w-full pointer-events-none"
            style={{
                y,
                x,
                opacity,
                top: 0,
                zIndex: totalCount - index
            }}
        >
            {element}
        </motion.div>
    );
};

const ScrollingElements: React.FC<ScrollingElementsProps> = ({
    elements = [],
    className = "",
    containerHeight = 300,
    itemHeight = 64,
    gap = 32, // 修改默认间距
    xOffset = 200, // 默认横向偏移量
    duration = 10 // 默认动画时间
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [actualHeight, setActualHeight] = useState(containerHeight);

    // 监听容器高度变化
    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                const height = containerRef.current.offsetHeight;
                setActualHeight(height);
            }
        };

        // 初始更新
        updateHeight();

        // 监听窗口大小变化
        const resizeObserver = new ResizeObserver(updateHeight);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [containerHeight]);

    const defaultElements = Array.from({ length: 10 }, (_, index) => (
        <div key={index} className="w-full h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold text-lg shadow-lg">
            元素 {index + 1}
        </div>
    ));

    const itemsToRender = elements.length > 0 ? elements : defaultElements;
    const offset = itemHeight + gap;

    return (
        <div 
            ref={containerRef}
            className={`relative  ${className}`} 
            style={{ height: '100%' }}
        >
            {itemsToRender.map((element, index) => (
                <ScrollingElement 
                    key={`element-${index}`} 
                    element={element} 
                    index={index} 
                    containerHeight={actualHeight} 
                    itemHeight={itemHeight} 
                    gap={gap} 
                    totalCount={itemsToRender.length} 
                    duration={duration} 
                    xOffset={xOffset} 
                />
            ))}
        </div>
    );
};

export default ScrollingElements;
