"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface OrbitalItem {
     id: number;
     icon: string;
     angle?: number; // 轨道角度
     distance?: number; // 轨道距离
 }

interface ImageRotatingProps {
     centerImage?: string;
     orbitalItems?: OrbitalItem[];
     orbitalDistance?: number;
     className?: string;
 }

export default function ImageRotating({
     centerImage = "/images/slider_2/icon10.svg",
     orbitalItems = [
         { id: 1, icon: "/images/slider_2/icon1.svg" },
         { id: 2, icon: "/images/slider_2/icon2.svg" },
         { id: 3, icon: "/images/slider_2/icon3.svg" },
         { id: 4, icon: "/images/slider_2/icon4.svg" },
         { id: 5, icon: "/images/slider_2/icon5.svg" },
         { id: 6, icon: "/images/slider_2/icon6.svg" },
         { id: 7, icon: "/images/slider_2/icon7.svg" },
         { id: 8, icon: "/images/slider_2/icon8.svg" },
         { id: 9, icon: "/images/slider_2/icon9.svg" }
     ],
     orbitalDistance = 65,
     className = ""
 }: ImageRotatingProps) {
    const [animationState, setAnimationState] = useState({
        scale: 1,
        centerScale: 1,
        rotationAngle: 0
    });
    const animationRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        // 记录动画开始时间，确保从正确状态开始
        startTimeRef.current = Date.now();

        const animate = () => {
            const now = Date.now();
            const cycleDuration = 4000; // 4秒一个完整循环
            const progress = (now % cycleDuration) / cycleDuration; // 0 到 1

            // 使用正弦波函数创建更平滑的缩放动画
            // 0-0.25: 放大阶段
            // 0.25-0.5: 保持最大
            // 0.5-0.75: 缩小阶段
            // 0.75-1: 保持最小

            let currentScale = 1;
            let currentCenterScale = 1;

            if (progress < 0.375) {
                // 放大阶段 (0-37.5%)
                const phaseProgress = progress / 0.375;
                currentScale = 1 + 0.5 * phaseProgress;
                currentCenterScale = 1 + 0.3 * phaseProgress;
            } else if (progress < 0.5) {
                // 保持最大阶段 (37.5-50%)
                currentScale = 1.5;
                currentCenterScale = 1.3;
            } else if (progress < 0.875) {
                // 缩小阶段 (50-87.5%)
                const phaseProgress = (progress - 0.5) / 0.375;
                currentScale = 1.5 - 0.5 * phaseProgress;
                currentCenterScale = 1.3 - 0.3 * phaseProgress;
            } else {
                // 保持最小阶段 (87.5-100%)
                currentScale = 1;
                currentCenterScale = 1;
            }

            // 计算旋转角度：只在放大和缩小阶段旋转
            let totalRotation;
            if (progress < 0.375) {
                // 放大阶段：旋转0-90度
                totalRotation = (progress / 0.375) * 90;
            } else if (progress < 0.5) {
                // 保持最大阶段：停止在90度
                totalRotation = 90;
            } else if (progress < 0.875) {
                // 缩小阶段：从90度开始，反向旋转到0度
                const phaseProgress = (progress - 0.5) / 0.375;
                totalRotation = 90 - phaseProgress * 90;
            } else {
                // 保持最小阶段：停止在0度
                totalRotation = 0;
            }

            // 一次性更新所有动画状态
            setAnimationState({
                scale: currentScale,
                centerScale: currentCenterScale,
                rotationAngle: totalRotation
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
            {/* 中心图片 */}
            <div
                className="absolute z-20"
                style={{
                    transform: `scale(${animationState.centerScale})`,
                    transformOrigin: "center center"
                }}
            >
                <div className="w-[132px] h-[132px] rounded-full flex items-center justify-center">
                    <Image src={centerImage} alt={centerImage} width={132/1.5} height={132/1.5} />
                </div>
            </div>

                         {/* 轨道元素 */}
             {orbitalItems.map((item, index) => {
                 // 自动计算角度：均匀分布在圆周上
                 const angleStep = 360 / orbitalItems.length;
                 const baseAngle = item.angle !== undefined ? item.angle : index * angleStep;
                 const currentAngle = baseAngle + animationState.rotationAngle;
                 const itemDistance = item.distance !== undefined ? item.distance : orbitalDistance;
                 const currentDistance = itemDistance * animationState.scale;
 
                 const x = Math.round(Math.cos((currentAngle * Math.PI) / 180) * currentDistance * 100) / 100;
                 const y = Math.round(Math.sin((currentAngle * Math.PI) / 180) * currentDistance * 100) / 100;

                return (
                    <div
                        key={item.id}
                        className="absolute z-10"
                        style={{
                            transform: `translate(${x}px, ${y}px) scale(${animationState.scale})`,
                            transformOrigin: "center center"
                        }}
                    >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                            <Image src={item.icon} alt={item.icon} width={40/1.5} height={40/1.5} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
