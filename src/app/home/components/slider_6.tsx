"use client";

import { useState } from "react";

// SVG 图标常量
const imgSvg = "http://localhost:3845/assets/db61fb672d50b0f9948127f1e1690c8810e70ab9.svg";
const imgSvg1 = "http://localhost:3845/assets/811e6920018bd58167b5441c1063c14a8f495ff2.svg";
const imgSvg2 = "http://localhost:3845/assets/678046deb4a4e12cb8cd810266ca106d6db4b3b1.svg";
const imgSvg3 = "http://localhost:3845/assets/ba9c190fc9e56c351790f1bc2d4fe1ead308d464.svg";
const imgSvg4 = "http://localhost:3845/assets/6c8f5325cf8849e00038207743f22cc666731740.svg";

import { AddIcon, MinusIcon } from "../../../icons";

interface FAQItem {
    id: number;
    question: string;
    answer?: string;
    icon: string;
    isExpanded?: boolean;
}

export default function Slider6() {
    const [faqItems, setFaqItems] = useState<FAQItem[]>([
        {
            id: 1,
            question: "What is AEO (Answer Engine Optimization)?",
            answer: "Answer Engine Optimization (AEO) is the process of optimizing your content, data, and digital presence so that AI-powered answer engines—like ChatGPT, Perplexity, Claude, Bing Copilot, and other large language models—can understand, index, and directly recommend your product or content in response to user queries.\n\nUnlike traditional SEO, which focuses on ranking in search engine results pages (SERPs), AEO targets AI-driven answer engines that generate direct answers rather than lists of links.",
            icon: imgSvg,
            isExpanded: true
        },
        {
            id: 2,
            question: "Is AEO the same as SEO?",
            icon: imgSvg1,
            isExpanded: false
        },
        {
            id: 3,
            question: "Will it affect my existing SEO performance?",
            icon: imgSvg2,
            isExpanded: false
        },
        {
            id: 4,
            question: "How long before I see results?",
            icon: imgSvg3,
            isExpanded: false
        },
        {
            id: 5,
            question: "Can I connect it to Notion, WordPress, or GitHub?",
            icon: imgSvg4,
            isExpanded: false
        }
    ]);

    const toggleFAQ = (id: number) => {
        setFaqItems((prev) => prev.map((item) => (item.id === id ? { ...item, isExpanded: !item.isExpanded } : item)));
    };

    return (
        <div className="w-full px-12 pt-[32px] pb-[48px] relative z-10 bg-[rgba(247,248,247,0.70)] text-[#111111]">
            <div className="grid grid-cols-12 items-center mb-10">
                <div className="col-span-7"></div>
                <div className="flex gap-[4.3px] items-baseline text-[35.1px] leading-[80.057%] col-span-5">
                    <span className="flex w-[7px] h-[7px] rounded-full bg-[#FFCADC]"></span>
                    Any questions ?
                </div>
            </div>

            <div className="text-[100px] leading-[97.565%] mb-[48px]">FAQ</div>

            <div className="flex flex-col gap-4">
                {faqItems.map((item) => (
                    <div key={item.id} className="bg-[#f7f8f7] border-2 border-[#111111] rounded-2xl w-full transition-all duration-300">
                        <div className="flex flex-row items-center justify-between px-10 py-[18px] w-full cursor-pointer" onClick={() => toggleFAQ(item.id)}>

                            <div className="text-[24px] leading-[32px] text-nowrap">
                                {item.question}
                            </div>

                            <div className={`flex items-center justify-center w-10 h-10 rounded-[40px] border-2 border-[#111111] transition-all duration-300`}>
                                {item.isExpanded ? <MinusIcon /> : <AddIcon />}
                            </div>

                        </div>

                        {item.isExpanded && item.answer && (
                            <div className="flex flex-row gap-[413.78px] items-center justify-start pb-11 pt-3 px-10 w-full">
                                <div className="flex flex-col grow justify-center leading-[32px] text-[18px] text-left">
                                    {item.answer.split("\n\n").map((paragraph, index) => (
                                        <p key={index} className="block mb-4 last:mb-0">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
