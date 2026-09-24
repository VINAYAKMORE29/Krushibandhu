"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function FarmerBanner() {

    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "/Soil Study.png",
            title: "SMART FARMING",
            quote: "Better decisions begin with better knowledge.",
            button: "Explore Soil Study",
            link: "/SoilStudy",
        },
        {
            image: "/Farming Expenses.png",
            title: "MANAGE YOUR FARM EXPENSES",
            quote: "Every rupee invested wisely brings you one step closer to a more sustainable and profitable farm.",
            button: "Track Expenses",
            link: "/Expenses",
        },
        {
            image: "/Crop Marketplace.png",
            title: "GROW, CONNECT, AND TRADE",
            quote: "From the farm to the marketplace, connect with opportunities that help your hard work reach further.",
            button: "Explore Marketplace",
            link: "/Marketplace",
        },
        {
            image: "/Farmer Schemes.png",
            title: "KNOW YOUR FARMER SCHEMES",
            quote: "Discover government schemes, explore available benefits, and take informed steps toward a stronger farming future.",
            button: "Explore Schemes",
            link: "/Schemes",
        },
    ];


    /* =========================================
       AUTO SLIDER
    ========================================= */

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentSlide((previousSlide) =>
                (previousSlide + 1) % slides.length
            );

        }, 5000);

        return () => clearInterval(timer);

    }, [slides.length]);


    return (

        <section
            className="
                w-full
                px-4
            "
        >

            {/* =========================================
                BANNER
            ========================================= */}

            <div
                className="
                    relative

                    w-full
                    h-[420px]

                    rounded-3xl

                    overflow-hidden

                    bg-green-900

                    shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                "
            >

                {/* =====================================
                    SLIDE IMAGE
                ===================================== */}

                <AnimatePresence mode="wait">

                    <motion.img
                        key={currentSlide}

                        src={slides[currentSlide].image}

                        alt={slides[currentSlide].title}

                        initial={{
                            opacity: 0,
                            scale: 1.05,
                        }}

                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}

                        exit={{
                            opacity: 0,
                        }}

                        transition={{
                            duration: 0.7,
                        }}

                        className="
                            absolute
                            inset-0

                            w-full
                            h-full

                            object-cover
                        "
                    />

                </AnimatePresence>


                {/* =====================================
                    DARK OVERLAY
                ===================================== */}

                <div
                    className="
                        absolute
                        inset-0

                        bg-black/45
                    "
                />


                {/* =====================================
                    CONTENT
                ===================================== */}

                <div
                    className="
                        absolute
                        inset-0

                        flex
                        flex-col

                        items-center
                        justify-center

                        text-center

                        px-8

                        -translate-y-6
                    "
                >

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={currentSlide}

                            initial={{
                                opacity: 0,
                                y: 30,
                            }}

                            animate={{
                                opacity: 1,
                                y: 0,
                            }}

                            exit={{
                                opacity: 0,
                                y: -20,
                            }}

                            transition={{
                                duration: 0.6,
                            }}

                            className="
                                flex
                                flex-col
                                items-center
                            "
                        >

                            {/* =================================
                                TITLE
                            ================================= */}

                            <motion.h2
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                transition={{
                                    duration: 0.5,
                                    delay: 0.1,
                                }}

                                className="
                                    text-green-200

                                    text-lg
                                    md:text-xl

                                    font-bold

                                    tracking-widest

                                    mb-4
                                "
                            >
                                {slides[currentSlide].title}
                            </motion.h2>


                            {/* =================================
                                QUOTE
                            ================================= */}

                            <motion.h1
                                initial={{
                                    opacity: 0,
                                    y: 25,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                transition={{
                                    duration: 0.6,
                                    delay: 0.2,
                                }}

                                className="
                                    max-w-3xl

                                    text-white

                                    text-3xl
                                    md:text-5xl

                                    font-bold

                                    leading-tight
                                "
                            >
                                "{slides[currentSlide].quote}"
                            </motion.h1>


                            {/* =================================
                                BUTTON
                            ================================= */}

                            <motion.a
                                href={slides[currentSlide].link}

                                initial={{
                                    opacity: 0,
                                    y: 25,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                whileHover={{
                                    scale: 1.05,
                                }}

                                whileTap={{
                                    scale: 0.95,
                                }}

                                transition={{
                                    duration: 0.5,
                                    delay: 0.3,
                                }}

                                className="
                                    mt-8

                                    px-6
                                    py-3

                                    rounded-xl

                                    bg-green-600

                                    text-white

                                    font-semibold

                                    hover:bg-green-700

                                    transition-colors
                                "
                            >
                                {slides[currentSlide].button}
                            </motion.a>

                        </motion.div>

                    </AnimatePresence>

                </div>


                {/* =====================================
                    SLIDE INDICATORS
                ===================================== */}

                <div
                    className="
                        absolute

                        bottom-6

                        left-0
                        right-0

                        flex
                        justify-center

                        gap-3
                    "
                >

                    {slides.map((_, index) => (

                        <motion.button
                            key={index}

                            onClick={() =>
                                setCurrentSlide(index)
                            }

                            animate={{
                                width:
                                    currentSlide === index
                                        ? 32
                                        : 12,

                                opacity:
                                    currentSlide === index
                                        ? 1
                                        : 0.5,
                            }}

                            transition={{
                                duration: 0.3,
                            }}

                            className="
                                h-3

                                rounded-full

                                bg-white
                            "

                            aria-label={`Go to slide ${index + 1}`}
                        />

                    ))}

                </div>

            </div>

        </section>
    );
}