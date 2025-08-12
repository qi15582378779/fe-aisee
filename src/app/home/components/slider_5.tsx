"use client";

import { useAnimation } from "@/contexts/AnimationContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ArrowRight from "@/icons/arrowRight";
import CountUp from "@/components/ui/CountUp";

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
    prices,
    description,
    features,
    tag,
    index,
    visible,
    isTab
}: {
    name: string;
    icon: string;
    type: string;
    prices: { [key: string]: string };
    description: string;
    features: { content: React.ReactNode; isActive: boolean }[];
    tag?: string;
    index?: number;
    visible?: boolean;
    isTab?: string;
}) {
    const [previousPrice, setPreviousPrice] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(parseInt(prices[isTab || "Y"]));

    // 当标签切换时，更新价格
    useEffect(() => {
        const newPrice = parseInt(prices[isTab || "Y"]);
        if (newPrice !== currentPrice) {
            setPreviousPrice(currentPrice);
            setCurrentPrice(newPrice);
        }
    }, [isTab, prices, currentPrice]);

    return (
        <div
            className={`border border-[#ECEFEC] rounded-[24px] p-[30px] text-[#111111] relative ${tag ? "bg-[#ECEFEC]" : "bg-white"} transition-all duration-300 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[50px] scale-90"}`}
            style={{ transitionDelay: `${index ? (index + 2) * 100 : 0}ms` }}
        >
            {tag && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#cfff29] text-[14px] leading-[21px] px-3 py-[6px] rounded-lg w-max max-w-[90%] text-center">{tag}</div>}

            <div className="flex flex-col gap-[20px]">
                <div className="flex flex-row items-center justify-between">
                    <Image src={icon} alt="black" width={50} height={50} className="w-[50px] h-[50px]" />

                    <div className="flex flex-row gap-0.5 items-center text-[#111111]">
                        <div className="text-[26px] leading-[39px]">
                            $
                            <CountUp to={currentPrice} from={previousPrice} duration={1.5} delay={0} className="inline-block" />
                        </div>

                        <div className="text-[14px] leading-[21px]">/ Per {isTab === "M" ? "Month" : "Year"}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 items-start justify-start">
                    <div className="flex flex-row gap-1.5 items-center justify-start text-[18px] leading-[27px]">
                        {name}
                        <div className="bg-[#cfff29] px-2 py-1 rounded-lg text-[13px] leading-[18px]">{type}</div>
                    </div>

                    <div className="text-[16px] leading-[24px] min-h-[48px]">{description}</div>
                </div>
            </div>

            <div className={`h-[1px] w-full border border-dashed my-[24px] ${tag ? "border-[#D1D6E0]" : "border-[#ECEFEC]"}`} />

            <button
                className={`btn-30 w-full h-[52px] flex items-center justify-center cursor-pointer text-[16px] leading-[24px] rounded-[10px] mb-[24px] transition-all duration-300 ${
                    tag ? "bg-[#111111] text-white before:bg-[#CFFF29] hover:text-[#111111]" : "bg-[#ecefec] text-[#111111] before:bg-[#111111] hover:text-white"
                }`}
            >
                <span className="text-container flex items-center justify-center">
                    <span className="text flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRight />
                    </span>
                </span>
            </button>

            <div className="flex flex-col gap-4 items-start justify-start">
                <div className="text-[16px] leading-[24px]">Features Included:</div>

                <div className="flex flex-col items-start justify-start w-full gap-[18px]">
                    {features.map((feature, index) => (
                        <div className="w-full" key={index}>
                            <div className="w-full flex items-center justify-between">
                                <div className="flex gap-1.5 items-center justify-start">
                                    {feature.isActive ? (
                                        <div className="bg-[#cfff29] flex flex-row items-center justify-center p-[6px] rounded-md shrink-0">
                                            <Image src="/images/slider_5/icon1.svg" alt="icon" width={12} height={12} className="w-[12px] h-[12px]" />
                                        </div>
                                    ) : (
                                        <div className={`flex flex-row items-center justify-center p-[6px] rounded-md shrink-0 ${tag ? "bg-[#D1D6E0]" : "bg-[#ecefec]"}`}>
                                            <Image src="/images/slider_5/icon2.svg" alt="icon" width={12} height={12} className="w-[12px] h-[12px]" />
                                        </div>
                                    )}
                                    <div className="text-[16px] leading-[24px] flex items-center justify-start gap-[6px] flex-wrap">{feature.content}</div>
                                </div>

                                {/* <div className="flex items-center justify-center">
                                    <Image src="/images/slider_5/icon3.svg" alt="icon" width={18} height={18} className="w-[18px] h-[18px]" />
                                </div> */}
                            </div>

                            {/* {index !== features.length - 1 && <div className={`h-px shrink-0 w-full my-3 ${tag ? "bg-[#D1D6E0]" : "bg-[#ecefec]"}`} />} */}
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
        prices: {
            M: "9",
            Y: "99"
        },
        description: "Get the basics of AEO Checker, at a limited rate.",
        features: [
            {
                content: <>10 AI Visibility Checks / month</>,
                isActive: true
            },
            {
                content: (
                    <>
                        Access to Core AI Models
                        <Image src="/images/slider_5/001.svg" alt="icon" width={36} height={20} className="w-[36px] h-[20px]" />
                    </>
                ),
                isActive: true
            },
            {
                content: <>AI Presence Report (Basic)</>,
                isActive: true
            },
            {
                content: <>Competitor Mentions Summary (Basic)</>,
                isActive: true
            },
            {
                content: <>PDF Report Download (Basic)</>,
                isActive: true
            }
        ]
    },
    {
        name: "Developer",
        icon: "/images/slider_5/icon6.svg",
        type: "For Startups",
        prices: {
            M: "25",
            Y: "270"
        },
        description: "Run unlimited monthly checks with limited models.",
        features: [
            { content: <>Unlimited Al Visibility Checks</>, isActive: true },
            {
                content: (
                    <>
                        Access to All Al Models
                        <Image src="/images/slider_5/002.svg" alt="icon" width={116} height={20} className="w-[116px] h-[20px]" />
                    </>
                ),
                isActive: true
            },
            { content: <>Full Al Presence, Competitor Landscape & Strategy Review Reports</>, isActive: true },
            { content: <>PDF Report Download & Share Link (Full)</>, isActive: true },
            { content: <>Priority Scan Queue</>, isActive: true }
        ],
        tag: "Save ~15%"
    },
    {
        name: "Pro",
        icon: "/images/slider_5/icon7.svg",
        type: "For Organizations",
        prices: {
            M: "55",
            Y: "594"
        },
        description: "Optimize for long term AEO presence and track progress.",
        features: [
            { content: <>Unlimited AI Visibility Checks</>, isActive: true },
            {
                content: (
                    <>
                        Access to All Al Models
                        <Image src="/images/slider_5/002.svg" alt="icon" width={116} height={20} className="w-[116px] h-[20px]" />
                    </>
                ),
                isActive: true
            },
            { content: <>Full Reports + Historical Data Tracking</>, isActive: true },
            { content: <>Automated Action Plan Execution</>, isActive: true },
            {
                content: (
                    <>
                        API Access
                        <Image src="/images/slider_5/003.svg" alt="icon" width={52} height={20} className="w-[52px] h-[20px]" />
                    </>
                ),
                isActive: true
            },
            { content: <>PDF Download, Share Link & Scheduled Reports</>, isActive: true },
            { content: <>Dedicated Account Manager</>, isActive: true },
            { content: <>Priority Support (24/7)</>, isActive: true },
            {
                content: (
                    <>
                        Advanced Analytics Dashboard
                        <span className="flex items-center justify-center text-[14px] h-[24px] px-[6px] rounded-[4px] bg-[rgba(17,17,17,0.05)]">Soon</span>
                    </>
                ),
                isActive: true
            }
        ]
    }
];

export default function Slider5() {
    const [isTab, setIsTab] = useState("Y");

    const { registerAnimation, isVisible, setRef } = useAnimation();

    const titleRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        registerAnimation("slider5-title", false);
        registerAnimation("slider5-card", false);

        setRef("slider5-title", titleRef);
        setRef("slider5-card", cardRef);
    }, []);

    const visibleTitle = isVisible("slider5-title");
    const visibleCard = isVisible("slider5-card");

    return (
        <section className="w-full px-12 pt-[32px] pb-[48px] relative z-10 max-md:px-4 max-md:pt-[12px]">
            <div ref={titleRef} className="grid grid-cols-2 items-center mb-10">
                <div></div>
                <div className="flex gap-[4.3px] items-baseline text-[#111111] text-[35.1px] leading-[80.057%] max-md:text-[16px] max-md:leading-[175.625%] max-md:justify-end max-md:px-[16px]">
                    <span className={`flex w-[7px] h-[7px] rounded-full bg-[#05C92F] transition-all duration-700 ${visibleTitle ? "animate-bounce-twice" : "translate-y-10 opacity-0"}`}></span>
                    <span className={`transition-all duration-700 ease-out ${visibleTitle ? "translate-x-0 opacity-100" : "translate-x-[70%] opacity-0"}`}>Pricing Page</span>
                </div>
            </div>

            <div ref={titleRef} className={`text-[#111111] text-[124px] leading-[122.038%] mb-[48px] flex flex-col max-md:text-[48px] max-md:leading-[150%] transition-all duration-300 delay-100 ${visibleTitle ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50px]"}`}>
                <span>Offer tiered pricing</span>
                <span className="flex items-center gap-8 max-md:gap-3">
                    based on
                    <div className="flex items-center justify-center border-[2.75px] border-[#111111] rounded-[100%] bg-[#5DD562] w-[98px] h-[76px] max-md:w-[64px] max-md:h-[48px]">
                        <Image src="/images/slider_5/1.gif" alt="arrow" width={48} height={48} className="max-w-[80%] max-md:w-[32px] max-md:h-[32px]" />
                    </div>
                </span>
                <span>functionality</span>
            </div>

            <div className="flex justify-center">
                <div className={`flex border border-[#ECEFEC] rounded-[10px] bg-[#ECEFEC] p-[6px] mb-[40px] max-md:mb-[24px] transition-all duration-300 delay-200 ${visibleTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"}`}>
                    {tabs.map((tab) => (
                        <span key={tab.name} className={`px-[16px] py-[10px] text-[#111111] text-[16px] leading-[150%] rounded-[10px] cursor-pointer transition-all duration-300 ${isTab === tab.name ? "bg-[#CFFF29]" : "bg-[#ECEFEC]"}`} onClick={() => setIsTab(tab.name)}>
                            {tab.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* 定价卡片 */}
            <div ref={cardRef} className="grid grid-cols-3 gap-5 mb-8 max-md:grid-cols-1 max-md:gap-8">
                {pricingCards.map((card, index) => (
                    <PricingCard key={card.name} {...card} index={index} visible={visibleCard} isTab={isTab} />
                ))}
            </div>
        </section>
    );
}
