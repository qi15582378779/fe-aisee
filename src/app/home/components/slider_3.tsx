"use client";

const data = [
    {
        title: "AI Visibility Audit",
        des: "Scan your entire content stack — website, docs, Mirror, and social — to check how AI sees your project."
    },
    {
        title: "End-to-end AEO lifecycle",
        des: "From analysis to feedback to optimization, streamline every step to improve AI discoverability."
    },
    {
        title: "Auto-Optimization",
        des: "Let AIsee’s agent rewrite and deploy content automatically — no manual editing needed."
    },
    {
        title: "Performance Analytics",
        des: "Track your project's AI search visibility before and after optimization with measurable results."
    }
];

export default function Slider3() {
    return (
        <div className="w-full px-12 py-[72px] relative z-10">
            <div className="grid grid-cols-4 gap-8">
                {data.map((item, index) => (
                    <div key={index} className="text-[#111111]">
                        <p className="text-[24px] leading-[133.333%] mb-2">{item.title}</p>
                        <p className="text-[16px] leading-[150%]">{item.des}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
