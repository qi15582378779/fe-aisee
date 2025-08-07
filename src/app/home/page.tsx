"use client";

import { AnimationProvider } from "@/contexts/AnimationContext";

import BgTxt from "./components/bg-txt";
import Header from "@/components/Header";
import Slider1 from "./components/slider_1";
import Slider2 from "./components/slider_2";
import Slider3 from "./components/slider_3";
import Slider4 from "./components/slider_4";
import Slider5 from "./components/slider_5";
import Slider6 from "./components/slider_6";
import Footer from "@/components/Footer";
import Tips from "./components/tips";

export default function Home() {
    return (
        <AnimationProvider>
            <main className="min-h-screen relative">
                <Tips />
                <BgTxt />
                <Header />
                <Slider1 />
                <Slider2 />
                <Slider3 />
                <Slider4 />
                <Slider5 />
                <Slider6 />
                <Footer />
            </main>
        </AnimationProvider>
    );
}
