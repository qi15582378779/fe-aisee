"use client";

import Image from "next/image";

export default function BgTxt() {
    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
            {/* 无缝滚动动画背景 */}
            <div className="flex h-full animate-scroll-left items-center" style={{ animation: "scroll-left 20s linear infinite" }}>
                <div className="flex-shrink-0 h-[90%]">
                    <Image src="/images/bg-txt.svg" alt="bg-txt" width={1920} height={1080} className="h-full w-auto object-contain" />
                </div>
                <div className="flex-shrink-0 h-[90%]">
                    <Image src="/images/bg-txt.svg" alt="bg-txt" width={1920} height={1080} className="h-full w-auto object-contain" />
                </div>
                <div className="flex-shrink-0 h-[90%]">
                    <Image src="/images/bg-txt.svg" alt="bg-txt" width={1920} height={1080} className="h-full w-auto object-contain" />
                </div>
                <div className="flex-shrink-0 h-[90%]">
                    <Image src="/images/bg-txt.svg" alt="bg-txt" width={1920} height={1080} className="h-full w-auto object-contain" />
                </div>
            </div>
        </div>
    );
}
