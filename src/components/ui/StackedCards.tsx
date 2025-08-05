"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cardStackImages } from "@/lib/imageConfigs";
import Image from "next/image";

export const StackedCards = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % cardStackImages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // 每个位置的固定缩放比例
    const positionScales = [0.8, 0.9, 1.0, 0.7];

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center perspective-1000">
            {cardStackImages.map((card, index) => {
                // 计算当前图片应该使用的缩放比例
                const currentScale = positionScales[index];
                const nextScale = positionScales[Math.max(0, index - 1)];
                
                return (
                    <div
                        key={card.id}
                        className="h-[56px] mt-[-10px] relative"
                        style={{
                            zIndex: index + 1
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${card.id}-${currentIndex}`}
                                initial={{ 
                                    y: index === 0 ? 80 : 50,
                                    scale: index === 0 ? positionScales[3] : currentScale,
                                    rotateX: 0,
                                    opacity: 1
                                }}
                                animate={{ 
                                    y: 0,
                                    scale: nextScale,
                                    rotateX: 0,
                                    opacity: 1
                                }}
                                exit={{ 
                                    y: -30,
                                    rotateX: index === 0 ? 90 : 0,
                                    opacity: index === 0 ? 0 : 1
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 50,
                                    delay: index * 0.05
                                }}
                                style={{
                                    transformStyle: "preserve-3d"
                                }}
                            >
                                <Image src={cardStackImages[(index + currentIndex) % cardStackImages.length].img} alt={cardStackImages[(index + currentIndex) % cardStackImages.length].id.toString()} width={304} height={56} className="!h-[56px]" />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};
