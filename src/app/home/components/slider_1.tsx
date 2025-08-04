"use client";

import Image from "next/image";

export default function Slider1() {
    return (
        <div className="w-full min-h-screen relative pt-[70px] flex flex-col justify-end pb-[27px] px-12 z-10">
            <div className="flex flex-col gap-2 absolute top-[100px] right-0 px-12">
                <Image src="/images/bg1.svg" alt="slider_1" width={383.98} height={254} />
                <p className="text-[#111111] text-[16px] leading-[150%]">Product Demo • Live Analytics</p>
            </div>

            <div className="flex flex-col gap-6 text-[#111111] w-[925px] max-w-full">
                <p className="text-[48px] leading-[125%]">Make Your Web3 Project Visible to AI.</p>
                <p className="text-[68px] leading-[117.647%]">All-in-One AEO Toolkit built for the AI-first internet.</p>
            </div>
        </div>
    );
}
