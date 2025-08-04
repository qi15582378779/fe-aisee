import Image from "next/image";

export default function Header() {
    return (
        <header className="flex flex-row items-center justify-between px-12 py-[13px] min-h-[44px] fixed top-0 left-0 right-0 z-20">
            <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0">
                <div className="h-[42px] relative shrink-0 w-[103.3969px]">
                    <Image alt="Logo" className="block max-w-none size-full" src="/images/logo.svg" width={103.3969} height={42} />
                </div>
            </div>
            <div className="bg-[#ffffff] box-border content-stretch flex flex-row items-center justify-start px-4 py-2.5 relative rounded-[9999px] shrink-0">
                <div aria-hidden="true" className="absolute border border-[#111111] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
                    <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[16px] text-center text-nowrap uppercase">
                        <p className="block leading-[24px] whitespace-pre">Get Started</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
