"use client";

import { useAnimation } from "@/contexts/AnimationContext";
import { useEffect, useRef, useState } from "react";

import { AddIcon, MinusIcon } from "../../../icons";

interface FAQItem {
    id: number;
    question: string;
    answer?: string;
    isExpanded?: boolean;
}

export default function Slider6() {
    const [faqItems, setFaqItems] = useState<FAQItem[]>([
        {
            id: 1,
            question: "What is AEO (Answer Engine Optimization)?",
            answer: "Answer Engine Optimization (AEO) is the process of optimizing your content, data, and digital presence so that AI-powered answer engines—like ChatGPT, Perplexity, Claude, Bing Copilot, and other large language models—can understand, index, and directly recommend your product or content in response to user queries.\n\nUnlike traditional SEO, which focuses on ranking in search engine results pages (SERPs), AEO targets AI-driven answer engines that generate direct answers rather than lists of links.",
            isExpanded: true
        },
        {
            id: 2,
            question: "Is AEO the same as SEO?",
            isExpanded: false
        },
        {
            id: 3,
            question: "Will it affect my existing SEO performance?",
            isExpanded: false
        },
        {
            id: 4,
            question: "How long before I see results?",
            isExpanded: false
        },
        {
            id: 5,
            question: "Can I connect it to Notion, WordPress, or GitHub?",
            isExpanded: false
        }
    ]);

    const toggleFAQ = (id: number) => {
        setFaqItems((prev) => prev.map((item) => (item.id === id ? { ...item, isExpanded: !item.isExpanded } : item)));
    };

    const { registerAnimation, isVisible, setRef } = useAnimation();

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        registerAnimation("slider6", false);
        setRef("slider6", sectionRef);
    }, []);

    const visible = isVisible("slider6");

    return (
        <section ref={sectionRef} className="w-full px-12 pt-[32px] pb-[48px] relative z-10 bg-[rgba(247,248,247,0.70)] text-[#111111] max-md:px-4 max-md:pt-[28px]">
            <div className="grid grid-cols-12 items-center mb-10">
                <div className="col-span-7"></div>
                <div className="flex gap-[4.3px] items-baseline text-[35.1px] leading-[80.057%] col-span-5 max-md:text-[16px] max-md:leading-[175.625%]">
                    <span className={`flex w-[7px] h-[7px] rounded-full bg-[#FFCADC] transition-all duration-700 ${visible ? "animate-bounce-twice" : "translate-y-8 opacity-0"}`}></span>
                    <span className={`transition-all duration-700 ease-out ${visible ? "translate-x-0 opacity-100" : "translate-x-[50%] opacity-0"}`}>Any questions ?</span>
                </div>
            </div>

            <div className={`text-[100px] leading-[97.565%] mb-[48px] max-md:text-[48px] max-md:leading-[133.333%] transition-all duration-300 delay-100 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50px]"}`}>FAQ</div>

            <div className="flex flex-col gap-4">
                {faqItems.map((item) => (
                    <div key={item.id} style={{ transitionDelay: `${item.id * 100}ms` }} className={`group bg-[#f7f8f7] border-2 border-[#111111] rounded-2xl w-full transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"}`}>
                        <div className="flex flex-row items-center justify-between px-10 py-[18px] w-full cursor-pointer max-md:px-[24px] max-md:py-[24px]" onClick={() => toggleFAQ(item.id)}>
                            <div className="text-[24px] leading-[32px] max-w-[75%]">{item.question}</div>

                            <div className={`relative flex items-center justify-center w-10 h-10 rounded-[40px] border-2 border-[#111111] transition-all duration-300 overflow-hidden`}>
                                <div className="absolute inset-0 bg-[#111111] rounded-[40px] scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center"></div>
                                <div className="relative z-10 group-hover:text-white transition-all duration-300">{item.isExpanded ? <MinusIcon /> : <AddIcon />}</div>
                            </div>
                        </div>

                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${item.isExpanded && item.answer ? "max-h-[500px] opacity-100 max-md:max-h-[1000px]" : "max-h-0 opacity-0"}`}>
                            {item.answer && (
                                <div className="flex flex-row gap-[413.78px] items-center justify-start pb-11 pt-3 px-10 w-full max-md:px-[24px] max-md:pt-[0px] max-md:pb-[24px]">
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
                    </div>
                ))}
            </div>
        </section>
    );
}
