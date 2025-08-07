"use client";

import { useAnimation } from "@/contexts/AnimationContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ArrowRight from "@/icons/arrowRight";

const tabs = [
    {
        name: "M",
        label: "Monthly"
    },
    {
        name: "Y",
        label: "Yearly"
    }
];

// 定价卡片组件
function PricingCard({
    //
    name,
    icon,
    type,
    price,
    description,
    features,
    tag
}: {
    name: string;
    icon: string;
    type: string;
    price: string;
    description: string;
    features: { title: string; isActive: boolean }[];
    tag?: string;
}) {
    return (
        <div className={`border border-[#ECEFEC] rounded-[24px] p-[30px] text-[#111111] relative ${tag ? "bg-[#ECEFEC]" : "bg-white"}`}>
            {tag && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#cfff29] text-[14px] leading-[21px] px-3 py-[6px] rounded-lg w-max max-w-[80%] text-center">{tag}</div>}

            <div className="flex flex-col gap-[20px]">
                <div className="flex flex-row items-center justify-between">
                    <Image src={icon} alt="black" width={50} height={50} />

                    <div className="flex flex-row gap-0.5 items-center text-[#111111]">
                        <div className="text-[26px] leading-[39px]">{price}</div>

                        <div className="text-[14px] leading-[21px]">/ Per Yearly</div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 items-start justify-start">
                    <div className="flex flex-row gap-1.5 items-center justify-start text-[18px] leading-[27px]">
                        {name}
                        <div className="bg-[#cfff29] px-2 py-1 rounded-lg text-[13px] leading-[18px]">{type}</div>
                    </div>

                    <div className="text-[16px] leading-[24px]">{description}</div>
                </div>
            </div>

            <div className={`h-[1px] w-full border border-dashed my-[24px] ${tag ? "border-[#D1D6E0]" : "border-[#ECEFEC]"}`} />

            {/* <div className={`h-[52px] flex gap-[4.01px] items-center justify-center text-[16px] leading-[24px] rounded-[10px] mb-[24px] cursor-pointer transition-colors ${tag ? "bg-[#111111] text-white" : "bg-[#ecefec] text-[#111111]"} hover:bg-[#d8d8d8]`}>
                Get Started
                <Image src="/images/slider_5/icon5.svg" alt="arrow" width={18} height={18} />
            </div> */}

            <button className={`btn-30 w-full h-[52px] flex items-center justify-center cursor-pointer text-[16px] leading-[24px] rounded-[10px] mb-[24px] transition-all duration-300 ${tag ? "bg-[#111111] text-white before:bg-[#CFFF29] hover:text-[#111111]" : "bg-[#ecefec] text-[#111111] before:bg-[#111111] hover:text-white"}`}>
                <span className="text-container flex items-center justify-center">
                    <span className="text flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRight />
                    </span>
                </span>
            </button>

            <div className="flex flex-col gap-4 items-start justify-start">
                <div className="text-[16px] leading-[24px]">Features Included:</div>

                <div className="flex flex-col items-start justify-start w-full">
                    {features.map((feature, index) => (
                        <div className="w-full" key={feature.title}>
                            <div className="w-full flex items-center justify-between">
                                <div className="flex gap-1.5 items-center justify-start">
                                    {feature.isActive ? (
                                        <div className="bg-[#cfff29] flex flex-row items-center justify-center p-[6px] rounded-md shrink-0">
                                            <Image src="/images/slider_5/icon1.svg" alt="icon" width={12} height={12} />
                                        </div>
                                    ) : (
                                        <div className={`flex flex-row items-center justify-center p-[6px] rounded-md shrink-0 ${tag ? "bg-[#D1D6E0]" : "bg-[#ecefec]"}`}>
                                            <Image src="/images/slider_5/icon2.svg" alt="icon" width={12} height={12} />
                                        </div>
                                    )}
                                    <div className="text-[16px] leading-[24px]">{feature.title}</div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <Image src="/images/slider_5/icon3.svg" alt="icon" width={18} height={18} />
                                </div>
                            </div>

                            {index !== features.length - 1 && <div className={`h-px shrink-0 w-full my-3 ${tag ? "bg-[#D1D6E0]" : "bg-[#ecefec]"}`} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const pricingCards = [
    {
        name: "Starter",
        icon: "/images/slider_5/icon4.svg",
        type: "For Individuals",
        price: "$99",
        description: "Affordable option for small teams seeking essential project management.",
        features: [
            { title: "Task Management", isActive: true },
            { title: "Real-time Collaboration", isActive: true },
            { title: "Customizable Dashboards", isActive: true },
            { title: "Advanced Analytics", isActive: false },
            { title: "Resource Allocation", isActive: false },
            { title: "Mobile Accessibility", isActive: false }
        ]
    },
    {
        name: "Pro",
        icon: "/images/slider_5/icon6.svg",
        type: "For Startups",
        price: "$199",
        description: "Comprehensive package tailored for growing businesses.",
        features: [
            { title: "Task Management", isActive: true },
            { title: "Real-time Collaboration", isActive: true },
            { title: "Customizable Dashboards", isActive: true },
            { title: "Advanced Analytics", isActive: true },
            { title: "Resource Allocation", isActive: false },
            { title: "Mobile Accessibility", isActive: false }
        ],
        tag: "Use “FIRST100” code for 60% Discount"
    },
    {
        name: "Enterprise",
        icon: "/images/slider_5/icon7.svg",
        type: "For Organizations",
        price: "$399",
        description: "Customized solutions for large enterprises with robust features.",
        features: [
            { title: "Task Management", isActive: true },
            { title: "Real-time Collaboration", isActive: true },
            { title: "Customizable Dashboards", isActive: true },
            { title: "Advanced Analytics", isActive: true },
            { title: "Resource Allocation", isActive: true },
            { title: "Mobile Accessibility", isActive: true }
        ]
    }
];

export default function Slider5() {
    const [isTab, setIsTab] = useState("Y");

    const { registerAnimation, isVisible, setRef } = useAnimation();

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        registerAnimation("slider5", false);
        setRef("slider5", sectionRef);
    }, []);

    const visible = isVisible("slider5");

    return (
        <section ref={sectionRef} className="w-full px-12 pt-[32px] pb-[48px] relative z-10">
            <div className="grid grid-cols-2 items-center mb-10">
                <div></div>
                <div className="flex gap-[4.3px] items-baseline text-[#111111] text-[35.1px] leading-[80.057%]">
                    <span className={`flex w-[7px] h-[7px] rounded-full bg-[#05C92F] transition-all duration-700 ${visible ? "animate-bounce-twice" : "translate-y-10 opacity-0"}`}></span>
                    <span className={`transition-all duration-700 ease-out ${visible ? "translate-x-0 opacity-100" : "translate-x-[70%] opacity-0"}`}>Pricing Page</span>
                </div>
            </div>

            <div className="text-[#111111] text-[124px] leading-[122.038%] mb-[48px] flex flex-col">
                <span>Offer tiered pricing</span>
                <span className="flex items-center gap-8">
                    based on
                    <div className="flex items-center justify-center border-[2.75px] border-[#111111] rounded-[100%] bg-[#5DD562] w-[98px] h-[76px]">
                        <Image src="/images/slider_5/1.gif" alt="arrow" width={48} height={48} className="max-w-[80%]" />
                    </div>
                </span>
                <span>functionality</span>
            </div>

            <div className="flex justify-center">
                <div className="flex border border-[#ECEFEC] rounded-[10px] bg-[#ECEFEC] p-[6px] mb-[40px]">
                    {tabs.map((tab) => (
                        <span key={tab.name} className={`px-[16px] py-[10px] text-[#111111] text-[16px] leading-[150%] rounded-[10px] cursor-pointer transition-all duration-300 ${isTab === tab.name ? "bg-[#CFFF29]" : "bg-[#ECEFEC]"}`} onClick={() => setIsTab(tab.name)}>
                            {tab.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* 定价卡片 */}
            <div className="grid grid-cols-3 gap-5 mb-8">
                {pricingCards.map((card) => (
                    <PricingCard key={card.name} {...card} />
                ))}
            </div>
        </section>
    );
}
