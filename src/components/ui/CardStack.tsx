"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: NodeJS.Timeout | undefined;

type Card = {
    id: number;
    content: React.ReactNode;
};

export const CardStack = ({ items, offset, scaleFactor }: { items: Card[]; offset?: number; scaleFactor?: number }) => {
    const CARD_OFFSET = offset || 30;
    const SCALE_FACTOR = scaleFactor || 0.1;
    const [cards, setCards] = useState<Card[]>(items);

    useEffect(() => {
        startFlipping();

        return () => clearInterval(interval);
    }, []);

    const startFlipping = () => {
        interval = setInterval(() => {
            setCards((prevCards: Card[]) => {
                const newArray = [...prevCards];
                newArray.unshift(newArray.pop()!);
                return newArray;
            });
        }, 5000);
    };

    return (
        <div className="relative h-14 w-60 md:h-14 md:w-96">
            {cards.map((card, index) => {
                return (
                    <motion.div
                        key={card.id}
                        className="absolute flex items-center justify-center h-full w-full"
                        style={{
                            transformOrigin: "top center"
                        }}
                        animate={{
                            top: index * -CARD_OFFSET,
                            scale: 1 - index * SCALE_FACTOR,
                            zIndex: cards.length - index
                        }}
                    >
                        {card.content}
                    </motion.div>
                );
            })}
        </div>
    );
};
