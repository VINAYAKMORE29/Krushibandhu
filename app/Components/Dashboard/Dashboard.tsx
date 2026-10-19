"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {soilData} from "../../soil/soilData";

import {
    Droplets,
    Thermometer,
    FlaskConical,
    Leaf,
    Sprout,
    Zap,
    Activity,
    Wifi,
    Cpu,
    RefreshCw,
    Volume2,
    Scale,
    Sun,
    Waves,
} from "lucide-react";

import { useLanguage } from "../../translations/LanguageContext";

/* =========================================================
   TYPES
========================================================= */

type ViewMode = "farmer" | "technical";

/* =========================================================
   FARMER DATA
========================================================= */

const farmerData = [
    {
        key: "waterInSoil",
        icon: Droplets,
        rating:
            soilData.moisture < 40 || soilData.moisture > 80
                ? 1
                : 3,
    },
    {
        key: "soilWarmth",
        icon: Thermometer,
        rating:
            soilData.temperature < 18 || soilData.temperature > 30
                ? 1
                : 3,
    },
    {
        key: "soilBalance",
        icon: Scale,
        rating:
            soilData.ph < 6 || soilData.ph > 7.5
                ? 1
                : 3,
    },
    {
        key: "saltLevel",
        icon: Waves,
        rating:
            soilData.ec < 0.2 || soilData.ec > 1.2
                ? 1
                : 3,
    },
    {
        key: "nitrogenFarmer",
        icon: Leaf,
        rating:
            soilData.nitrogen < 20 || soilData.nitrogen > 50
                ? 1
                : 3,
    },
    {
        key: "phosphorusFarmer",
        icon: Sprout,
        rating:
            soilData.phosphorus < 10 || soilData.phosphorus > 30
                ? 1
                : 3,
    },
    {
        key: "potassiumFarmer",
        icon: Zap,
        rating:
            soilData.potassium < 100 || soilData.potassium > 250
                ? 1
                : 3,
    },
    {
        key: "sunlight",
        icon: Sun,
        rating:
            soilData.lightIntensity < 5000 ||
            soilData.lightIntensity > 30000
                ? 1
                : 3,
    },
];

/* =========================================================
   TECHNICAL DATA
========================================================= */

const technicalData = [
    {
        key: "soilMoisture",
        value: soilData.moisture.toString(),
        unit: "%",
        status:
            soilData.moisture < 40
                ? "belowRange"
                : soilData.moisture > 80
                    ? "aboveRange"
                    : "optimal",
        icon: Droplets,
        progress: Math.min(soilData.moisture, 100),
        probe: `${soilData.moisture}%`,
    },

    {
        key: "soilTemperature",
        value: soilData.temperature.toFixed(1),
        unit: "°C",
        status:
            soilData.temperature < 18
                ? "belowRange"
                : soilData.temperature > 30
                    ? "aboveRange"
                    : "optimal",
        icon: Thermometer,
        progress: Math.min(
            (soilData.temperature / 40) * 100,
            100
        ),
        probe: `${soilData.temperature.toFixed(1)} °C`,
    },

    {
        key: "ph",
        value: soilData.ph.toFixed(1),
        unit: "",
        status:
            soilData.ph < 6
                ? "belowRange"
                : soilData.ph > 7.5
                    ? "aboveRange"
                    : "optimal",
        icon: FlaskConical,
        progress: Math.min(
            (soilData.ph / 14) * 100,
            100
        ),
        probe: soilData.ph.toFixed(1),
    },

    {
        key: "electricalConductivity",
        value: soilData.ec.toFixed(2),
        unit: "mS/cm",
        status:
            soilData.ec < 0.2
                ? "belowRange"
                : soilData.ec > 1.2
                    ? "aboveRange"
                    : "optimal",
        icon: Activity,
        progress: Math.min(
            (soilData.ec / 4) * 100,
            100
        ),
        probe: `${soilData.ec.toFixed(2)} mS/cm`,
    },

    {
        key: "nitrogen",
        value: soilData.nitrogen.toString(),
        unit: "kg/ha",
        status: soilData.nitrogen < 20
            ? "belowRange"
            : soilData.nitrogen > 50
                ? "aboveRange"
                : "optimal",
        icon: Leaf,
        progress: Math.min(
            (soilData.nitrogen / 300) * 100,
            100
        ),
        probe: `${soilData.nitrogen}`,
    },

    {
        key: "phosphorus",
        value: soilData.phosphorus.toString(),
        unit: "kg/ha",
        status:
            soilData.phosphorus < 10
                ? "belowRange"
                : soilData.phosphorus > 30
                    ? "aboveRange"
                    : "optimal",
        icon: Sprout,
        progress: Math.min(
            (soilData.phosphorus / 50) * 100,
            100
        ),
        probe: `${soilData.phosphorus}`,
    },
{
    key: "potassium",
    value: soilData.potassium.toString(),
    unit: "kg/ha",
    status:
        soilData.potassium < 100
            ? "belowRange"
            : soilData.potassium > 250
                ? "aboveRange"
                : "optimal",
    icon: Zap,
    progress: Math.min(
        (soilData.potassium / 300) * 100,
        100
    ),
    probe: `${soilData.potassium}`,
},

{
    key: "lightIntensity",
    value: soilData.lightIntensity.toString(),
    unit: "lux",
    status:
        soilData.lightIntensity < 5000
            ? "belowRange"
            : soilData.lightIntensity > 30000
                ? "aboveRange"
                : "optimal",
    icon: Sun,
    progress: Math.min(
        (soilData.lightIntensity / 30000) * 100,
        100
    ),
    probe: `${soilData.lightIntensity} lux`,
},
];

function RecommendedRanges({
    soilData,
}: {
    soilData: {
        moisture: number;
        temperature: number;
        ph: number;
        ec: number;
        nitrogen: number;
        phosphorus: number;
        potassium: number;
        lightIntensity: number;
    };
}) {
    const { t } = useLanguage();

    const ranges = [
        {
            name: t.soilMoisture,
            current: soilData.moisture,
            min: 40,
            max: 80,
            unit: "%",
            icon: Droplets,
        },
        {
            name: t.soilTemperature,
            current: soilData.temperature,
            min: 18,
            max: 30,
            unit: "°C",
            icon: Thermometer,
        },
        {
            name: t.ph,
            current: soilData.ph,
            min: 6,
            max: 7.5,
            unit: "",
            icon: FlaskConical,
        },
        {
            name: t.electricalConductivity,
            current: soilData.ec,
            min: 0.2,
            max: 1.2,
            unit: "mS/cm",
            icon: Activity,
        },
        {
            name: t.nitrogen,
            current: soilData.nitrogen,
            min: 20,
            max: 50,
            unit: "kg/ha",
            icon: Leaf,
        },
        {
            name: t.phosphorus,
            current: soilData.phosphorus,
            min: 10,
            max: 30,
            unit: "kg/ha",
            icon: Sprout,
        },
        {
            name: t.potassium,
            current: soilData.potassium,
            min: 100,
            max: 250,
            unit: "kg/ha",
            icon: Zap,
        },
        {
            name: t.lightIntensity,
            current: soilData.lightIntensity,
            min: 5000,
            max: 30000,
            unit: "lux",
            icon: Sun,
        },
    ];


    const getStatus = (
        current: number,
        min: number,
        max: number
    ) => {
        if (current < min) {
            return {
                text: t.belowRange,
                className:
                    "bg-orange-100 text-orange-700",
            };
        }

        if (current > max) {
            return {
                text: t.aboveRange,
                className:
                    "bg-red-100 text-red-700",
            };
        }

        return {
            text: t.optimal,
            className:
                "bg-green-100 text-green-700",
        };
    };

    return (
        <motion.section
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
            }}
            className="
                mt-8
                rounded-3xl
                p-6
                bg-white/30
                backdrop-blur-xl
                border
                border-white/60
                shadow-[0_8px_25px_rgba(0,0,0,0.08)]
            "
        >
            <div className="mb-6">
                <h2
                    className="
                        text-2xl
                        font-bold
                        text-black
                    "
                >
                    {t.recommendedSoilRanges}
                </h2>

                <p
                    className="
                        text-sm
                        text-gray-500
                        mt-1
                    "
                >
                    {t.recommendedSoilRangesDescription}
                </p>
            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    gap-4
                "
            >
                {ranges.map((item) => {
                    const Icon = item.icon;

                    const status = getStatus(
                        item.current,
                        item.min,
                        item.max
                    );

                    return (
                        <div
                            key={item.name}
                            className="
                                rounded-2xl
                                p-4
                                bg-white/35
                                border
                                border-white/50
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    mb-4
                                "
                            >
                                <div
                                    className="
                                        w-10
                                        h-10
                                        rounded-xl
                                        flex
                                        items-center
                                        justify-center
                                        bg-green-100/70
                                    "
                                >
                                    <Icon
                                        size={20}
                                        className="
                                            text-green-700
                                        "
                                    />
                                </div>

                                <p
                                    className="
                                        font-semibold
                                        text-black
                                    "
                                >
                                    {item.name}
                                </p>
                            </div>

                            <p
                                className="
                                    text-xs
                                    text-gray-500
                                "
                            >
                                {t.currentValue}
                            </p>

                            <p
                                className="
                                    text-2xl
                                    font-bold
                                    text-black
                                    mt-1
                                "
                            >
                                {item.current}{" "}
                                {item.unit}
                            </p>

                            <div className="mt-3">
                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                    "
                                >
                                    {t.requiredRange}
                                </p>

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                        mt-1
                                    "
                                >
                                    {item.min} – {item.max}{" "}
                                    {item.unit}
                                </p>
                            </div>

                            <span
                                className={`
                                    inline-block
                                    mt-3
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-semibold
                                    ${status.className}
                                `}
                            >
                                {status.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </motion.section>
    );
}
/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Dashboard() {

    /* =====================================================
       LANGUAGE CONTEXT
    ===================================================== */

    const {
        language,
        t,
    } = useLanguage();

    /* =====================================================
       VIEW
    ===================================================== */

    const [view, setView] =
        useState<ViewMode>("farmer");

        const [aiSolution, setAiSolution] = useState("");
const [aiLoading, setAiLoading] = useState(false);

const [fertilizerRecommendation, setFertilizerRecommendation] = useState("");
const [fertilizerLoading, setFertilizerLoading] = useState(false);

    /* =====================================================
       ACCESSIBILITY
    ===================================================== */

    const [iconsOnly, setIconsOnly] =
        useState(false);

    const [isReading, setIsReading] =
        useState(false);

    /* =====================================================
       LAST UPDATED
    ===================================================== */

    const [lastUpdated, setLastUpdated] =
        useState("");

    /* =====================================================
       REFRESH
    ===================================================== */

    const refreshData = () => {

        const now = new Date();

        const time =
            now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

        setLastUpdated(time);
    };

    const generateFertilizerRecommendation = async () => {
    try {
        setFertilizerLoading(true);

        const response = await fetch("/api/soil-chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: `
Analyze the current soil data only for pH, Nitrogen, Phosphorus and Potassium.

Generate a SHORT fertilizer recommendation.

Rules:
- Check the values against these ranges:
  pH: 6.0 to 7.5
  Nitrogen: 20 to 50 kg/ha
  Phosphorus: 10 to 30 kg/ha
  Potassium: 100 to 250 kg/ha
- If pH is below 6, recommend agricultural lime.
- If pH is above 7.5, recommend a suitable general approach for reducing excessive alkalinity.
- If Nitrogen is below 20, recommend a nitrogen fertilizer.
- If Phosphorus is below 10, recommend a phosphorus fertilizer.
- If Potassium is below 100, recommend a potassium fertilizer.
- Do not recommend fertilizer for parameters that are already within range.
- Do not mention normal parameters.
- Do not give fertilizer dosage or quantity.
- Do not give sensor analysis.
- Do not use bullet points.
- Do not use headings.
- Give only one or two short sentences.
- Respond in the selected language.
- If all pH, N, P and K values are within range, say that no fertilizer recommendation is currently needed.

Return only the recommendation text.
`,
                    soilData,
                    language,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Fertilizer AI error:", data);
                setFertilizerRecommendation(
                    "Fertilizer recommendation मिळू शकली नाही."
                );
                return;
            }

            setFertilizerRecommendation(
                data.answer || "No fertilizer recommendation needed."
            );

        } catch (error) {
            console.error(
                "Fertilizer recommendation error:",
                error
            );

            setFertilizerRecommendation(
                "Fertilizer recommendation मिळू शकली नाही."
            );

        } finally {
            setFertilizerLoading(false);
        }
    };

    const generateAISolution = async () => {
    try {
        setAiLoading(true);

        const response = await fetch("/api/soil-chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message:
                    `Look only at the soil parameters that are outside their recommended range.

Give ONE short practical solution for the farmer.

Rules:
- Mention only the abnormal parameter.
- Do not list normal parameters.
- Do not provide sensor readings analysis.
- Do not use headings.
- Do not use bullet points.
- Do not ask questions.
- Do not give a long explanation.
- Give only 1 or 2 simple sentences.
- Respond in the selected language. `,
               soilData: soilData,
                language: language,
            }),
        });

         const data = await response.json();

        if (!response.ok) {
            console.error("AI API error:", data);
            setAiSolution("AI उपाय मिळू शकला नाही.");
            return;
        }

        setAiSolution(data.answer || "AI उपाय मिळू शकला नाही.");
    } catch (error) {
        console.error("AI recommendation error:", error);
        setAiSolution("AI उपाय मिळू शकला नाही.");
    } finally {
        setAiLoading(false);
    }
};

useEffect(() => {
    const abnormal =
        soilData.moisture < 40 ||
        soilData.moisture > 80 ||
        soilData.temperature < 18 ||
        soilData.temperature > 30 ||
        soilData.ph < 6 ||
        soilData.ph > 7.5 ||
        soilData.ec < 0.2 ||
        soilData.ec > 1.2 ||
        soilData.nitrogen < 20 ||
        soilData.nitrogen > 50 ||
        soilData.phosphorus < 10 ||
        soilData.phosphorus > 30 ||
        soilData.potassium < 100 ||
        soilData.potassium > 250 ||
        soilData.lightIntensity < 5000 ||
        soilData.lightIntensity > 30000;

    if (abnormal) {
        generateAISolution();
    } else {
        setAiSolution("");
    }
}, [soilData, language]);

useEffect(() => {
    generateFertilizerRecommendation();
}, [
    soilData.ph,
    soilData.nitrogen,
    soilData.phosphorus,
    soilData.potassium,
    language,
]);
    /* =====================================================
       READ ALOUD
    ===================================================== */

    const speakDashboard = () => {

        if (
            typeof window === "undefined"
        ) {
            return;
        }

        window.speechSynthesis.cancel();

        const text =
            view === "farmer"
                ? t.farmerSummary
                : t.technicalSummary;

        const speech =
            new SpeechSynthesisUtterance(
                text
            );

        if (language === "hi") {

            speech.lang = "hi-IN";

        } else if (
            language === "mr"
        ) {

            speech.lang = "mr-IN";

        } else {

            speech.lang = "en-IN";

        }

        speech.rate = 0.85;
        speech.pitch = 1;

        speech.onstart = () => {
            setIsReading(true);
        };

        speech.onend = () => {
            setIsReading(false);
        };

        speech.onerror = () => {
            setIsReading(false);
        };

        window.speechSynthesis.speak(
            speech
        );
    };

    /* =====================================================
       STOP READING
    ===================================================== */

    const stopReading = () => {

        if (
            typeof window !== "undefined"
        ) {
            window.speechSynthesis.cancel();
        }

        setIsReading(false);
    };

    

    /* =====================================================
       UI
    ===================================================== */

    return (

        <main
            className="
                min-h-screen
                px-4
                md:px-8
                pt-28
                pb-32
                bg-cover
                bg-center
                bg-fixed
            "
            style={{
                backgroundImage:
                    "url('/background.png')",
            }}
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                    rounded-[2.5rem]
                    p-5
                    md:p-8
                    bg-white/25
                    backdrop-blur-3xl
                    backdrop-saturate-150
                    border
                    border-white/50
                    shadow-[0_20px_60px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]
                "
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 15,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-5
                        mb-8
                    "
                >

                    <div>

                        <p
                            className="
                                text-sm
                                text-gray-600
                                mb-1
                            "
                        >
                            {t.soilMonitoring}
                        </p>

                        <h1
                            className="
                                text-3xl
                                md:text-4xl
                                font-bold
                                text-black
                            "
                        >
                            {t.soilDashboard}
                        </h1>

                        <p
                            className="
                                text-gray-600
                                mt-2
                            "
                        >
                            {t.dashboardSubtitle}
                        </p>

                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        {/* Hardware */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                px-5
                                py-3
                                rounded-2xl
                                bg-white/35
                                backdrop-blur-xl
                                border
                                border-white/60
                                shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                            "
                        >

                            <div
                                className="
                                    relative
                                "
                            >

                                <span
                                    className="
                                        absolute
                                        w-3
                                        h-3
                                        rounded-full
                                        bg-green-500
                                        animate-ping
                                        opacity-50
                                    "
                                />

                                <span
                                    className="
                                        relative
                                        block
                                        w-3
                                        h-3
                                        rounded-full
                                        bg-green-500
                                    "
                                />

                            </div>

                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-black
                                    "
                                >
                                    {t.hardwareConnected}
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                    "
                                >
                                    {t.soilSensor}
                                </p>

                            </div>

                        </div>

                        {/* Refresh */}

                        <button
                            onClick={refreshData}
                            className="
                                hidden
                                sm:flex
                                items-center
                                gap-2
                                px-5
                                py-3
                                rounded-2xl
                                bg-white
                                hover:bg-gray-100
                                text-black
                                font-semibold
                                transition
                            "
                        >

                            <RefreshCw
                                size={18}
                            />

                            {t.refreshReadings}

                        </button>

                    </div>

                </motion.div>

                {/* =================================================
                    VIEW + LANGUAGE CONTROLS
                ================================================= */}

                <div
                    className="
                        flex
                        flex-col
                        xl:flex-row
                        xl:items-center
                        xl:justify-between
                        gap-5
                        mb-5
                    "
                >

                    {/* View */}

                    <div
                        className="
                            flex
                            w-fit
                            rounded-2xl
                            bg-black/5
                            p-1
                            border
                            border-white/40
                        "
                    >

                        <button
                            onClick={() =>
                                setView("farmer")
                            }
                            className={`
                                px-5
                                py-3
                                rounded-xl
                                font-semibold
                                transition
                                ${
                                    view ===
                                    "farmer"
                                        ? "bg-white text-black shadow"
                                        : "text-gray-600 hover:text-black"
                                }
                            `}
                        >
                            {t.farmerView}
                        </button>

                        <button
                            onClick={() =>
                                setView("technical")
                            }
                            className={`
                                px-5
                                py-3
                                rounded-xl
                                font-semibold
                                transition
                                ${
                                    view ===
                                    "technical"
                                        ? "bg-white text-black shadow"
                                        : "text-gray-600 hover:text-black"
                                }
                            `}
                        >
                            {t.technicalView}
                        </button>

                    </div>

                 

                    
                </div>

                {/* =================================================
                    ACCESSIBILITY CONTROLS
                ================================================= */}

                <div
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-4
                        mb-8
                    "
                >

                    <label
                        className="
                            flex
                            items-center
                            gap-3
                            cursor-pointer
                            text-gray-700
                        "
                    >

                        <input
                            type="checkbox"
                            checked={
                                iconsOnly
                            }
                            onChange={(e) =>
                                setIconsOnly(
                                    e.target.checked
                                )
                            }
                            className="
                                w-5
                                h-5
                                accent-green-600
                            "
                        />

                        {t.iconsOnly}

                    </label>

                    <button
                        onClick={
                            isReading
                                ? stopReading
                                : speakDashboard
                        }
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            px-5
                            py-3
                            rounded-xl
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            font-semibold
                            transition
                        "
                    >

                        <Volume2
                            size={20}
                        />

                        {isReading
                            ? t.stopReading
                            : t.readAloud}

                    </button>

                </div>

                {/* =================================================
                    FARMER VIEW
                ================================================= */}

                {view === "farmer" && (

                    <motion.div
                        key="farmer"
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                    >

                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-4
                                gap-5
                                mb-8
                            "
                        >

                            {farmerData.map(
                                (
                                    item,
                                    index
                                ) => {

                                    const Icon =
                                        item.icon;

                                    return (

                                        <motion.div
                                            key={
                                                item.key
                                            }
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                delay:
                                                    index *
                                                    0.05,
                                            }}
                                            whileHover={{
                                                y: -5,
                                                scale: 1.01,
                                            }}
                                            className="
                                                relative
                                                overflow-hidden
                                                rounded-3xl
                                                p-6
                                                bg-white/30
                                                backdrop-blur-xl
                                                border
                                                border-white/60
                                                shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    flex-col
                                                    items-center
                                                    text-center
                                                "
                                            >

                                                <div
                                                    className="
                                                        w-16
                                                        h-16
                                                        rounded-2xl
                                                        flex
                                                        items-center
                                                        justify-center
                                                        bg-green-100/60
                                                        border
                                                        border-white/60
                                                        mb-4
                                                    "
                                                >

                                                    <Icon
                                                        size={
                                                            38
                                                        }
                                                        className="
                                                            text-green-700
                                                        "
                                                    />

                                                </div>

                                                {!iconsOnly && (

                                                    <>

                                                        <p
                                                            className="
                                                                text-gray-600
                                                                text-sm
                                                                font-medium
                                                                min-h-[40px]
                                                            "
                                                        >
                                                            {
                                                                t[
                                                                    item.key as keyof typeof t
                                                                ]
                                                            }
                                                        </p>

                                                        <p
    className={`text-2xl font-bold mt-3 ${
        item.rating <= 1
            ? "text-orange-600"
            : item.rating <= 2
            ? "text-yellow-600"
            : "text-green-700"
    }`}
>
    {item.rating <= 1
        ? t.needsAttention
        : item.rating <= 2
        ? t.moderate
        : t.good}
</p>

                                                        <div
                                                            className="
                                                                flex
                                                                gap-2
                                                                mt-4
                                                            "
                                                        >

                                                            {[
                                                                1,
                                                                2,
                                                                3,
                                                                4,
                                                                5,
                                                            ].map(
                                                                (
                                                                    dot
                                                                ) => (

                                                                    <span
                                                                        key={
                                                                            dot
                                                                        }
                                                                        className={`
                                                                            w-3
                                                                            h-3
                                                                            rounded-full
                                                                            ${
                                                                                dot <=
                                                                                item.rating
                                                                                    ? "bg-green-600"
                                                                                    : "bg-black/5"
                                                                            }
                                                                        `}
                                                                    />

                                                                )
                                                            )}

                                                        </div>

                                                    </>

                                                )}

                                            </div>

                                        </motion.div>

                                    );
                                }
                            )}

                        </div>

                        {/* What to do */}

                        <section>

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    text-black
                                    mb-4
                                "
                            >
                                {t.whatToDo}
                            </h2>

                            <div
                                className="
                                    rounded-2xl
                                    bg-white/25
                                    backdrop-blur-xl
                                    border
                                    border-green-500/40
                                    border-l-4
                                    border-l-green-600
                                    p-5
                                    flex
                                    items-center
                                    gap-4
                                "
                            >

                                <div
                                    className="
                                        w-12
                                        h-12
                                        rounded-xl
                                        bg-green-500
                                        flex
                                        items-center
                                        justify-center
                                        text-white
                                        text-2xl
                                    "
                                >
                                    ✓
                                </div>

                                {!iconsOnly && (

                                    <p
                                        className="
                                            text-gray-800
                                            font-medium
                                        "
                                    >
                                        {aiLoading 
                                        ? t.loadingRecommendation 
                                        :aiSolution || t.everythingGood}
                                    </p>

                                )}

                            </div>

                        </section>

                    </motion.div>

                )}

                {/* =================================================
                    TECHNICAL VIEW
                ================================================= */}

                {view === "technical" && (

                    <motion.div
                        key="technical"
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                    >

                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-4
                                gap-5
                            "
                        >

                            {technicalData.map(
                                (
                                    sensor,
                                    index
                                ) => {

                                    const Icon =
                                        sensor.icon;

                                    const title =
                                        t[
                                            sensor.key as keyof typeof t
                                        ];

                                    const status =
                                        t[
                                            sensor.status as keyof typeof t
                                        ];

                                    return (

                                        <motion.div
                                            key={
                                                sensor.key
                                            }
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                delay:
                                                    index *
                                                    0.05,
                                            }}
                                            className="
                                                relative
                                                overflow-hidden
                                                rounded-3xl
                                                p-6
                                                bg-white/30
                                                backdrop-blur-xl
                                                border
                                                border-white/60
                                                shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    justify-between
                                                    gap-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        w-12
                                                        h-12
                                                        rounded-2xl
                                                        flex
                                                        items-center
                                                        justify-center
                                                        bg-green-100/60
                                                        border
                                                        border-white/60
                                                    "
                                                >

                                                    <Icon
                                                        size={
                                                            24
                                                        }
                                                        className="
                                                            text-green-700
                                                        "
                                                    />

                                                </div>

                                                <span
                                                    className={`
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-xs
                                                        font-semibold
                                                        ${
                                                            sensor.status ===
                                                            "optimal"
                                                                ? "text-green-700 bg-green-100"
                                                                : "text-orange-700 bg-orange-100"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        status
                                                    }
                                                </span>

                                            </div>

                                            {!iconsOnly && (

                                                <>

                                                    <p
                                                        className="
                                                            text-gray-600
                                                            text-sm
                                                            font-medium
                                                            mt-5
                                                        "
                                                    >
                                                        {
                                                            title
                                                        }
                                                    </p>

                                                    <div
                                                        className="
                                                            flex
                                                            items-end
                                                            gap-2
                                                            mt-2
                                                        "
                                                    >

                                                        <span
                                                            className="
                                                                text-4xl
                                                                font-bold
                                                                text-black
                                                            "
                                                        >
                                                            {
                                                                sensor.value
                                                            }
                                                        </span>

                                                        <span
                                                            className="
                                                                text-gray-500
                                                                mb-1
                                                            "
                                                        >
                                                            {
                                                                sensor.unit
                                                            }
                                                        </span>

                                                    </div>

                                                    <div
                                                        className="
                                                            mt-5
                                                            h-2
                                                            rounded-full
                                                            bg-black/5
                                                            overflow-hidden
                                                        "
                                                    >

                                                        <motion.div
                                                            initial={{
                                                                width: 0,
                                                            }}
                                                            animate={{
                                                                width: `${sensor.progress}%`,
                                                            }}
                                                            transition={{
                                                                duration: 0.8,
                                                            }}
                                                            className="
                                                                h-full
                                                                rounded-full
                                                                bg-green-600
                                                            "
                                                        />

                                                    </div>

                                                    <p
                                                        className="
                                                            text-sm
                                                            text-gray-500
                                                            mt-4
                                                        "
                                                    >

                                                        {
                                                            t.probeReading
                                                        }

                                                        {": "}

                                                        {
                                                            sensor.probe
                                                        }

                                                    </p>

                                                </>

                                            )}

                                        </motion.div>

                                    );
                                }
                            )}

                        </div>

                        {/* =================================================
                            FERTILIZER RECOMMENDATION
                        ================================================= */}

                        <section
                            className="
                                mt-8
                            "
                        >

                            <div
                                className="
                                    flex
                                    flex-col
                                    md:flex-row
                                    md:items-end
                                    md:justify-between
                                    gap-2
                                    mb-4
                                "
                            >

                                <h2
                                    className="
                                        text-2xl
                                        font-bold
                                        text-black
                                    "
                                >
                                    {
                                        t.fertilizerRecommendation
                                    }
                                </h2>

                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    {t.basedOn}
                                </p>

                            </div>

                            <div
                                className="
                                    rounded-2xl
                                    bg-white/25
                                    backdrop-blur-xl
                                    border
                                    border-orange-500/40
                                    border-l-4
                                    border-l-orange-500
                                    p-5
                                "
                            >

                                <div
    className="
        flex
        flex-col
        gap-2
    "
>
    {fertilizerLoading ? (
        <p className="text-gray-600 font-medium">
            {t.loadingRecommendation}
        </p>
    ) : (
        <p className="text-gray-700 font-medium">
            {fertilizerRecommendation ||
                "No fertilizer recommendation needed."}
        </p>
    )}
</div>

                            </div>

                        </section>

                    </motion.div>

                )}

                {/* =================================================
                    SOIL HEALTH + DEVICE
                ================================================= */}

                <div
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-3
                        gap-5
                        mt-8
                    "
                >

                    {/* =================================================
                        SOIL HEALTH
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="
                            lg:col-span-2
                            relative
                            overflow-hidden
                            rounded-3xl
                            p-6
                            bg-white/30
                            backdrop-blur-xl
                            border
                            border-white/60
                            shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                mb-6
                            "
                        >

                            <div>

                                <h2
                                    className="
                                        text-xl
                                        font-bold
                                        text-black
                                    "
                                >
                                    {t.soilHealth}
                                </h2>

                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    {
                                        t.overallCondition
                                    }
                                </p>

                            </div>

                            <Activity
                                size={24}
                                className="text-green-700"
                            />

                        </div>

                        <div
                            className="
                                flex
                                flex-col
                                md:flex-row
                                items-center
                                gap-8
                            "
                        >

                            <div
                                className="
                                    relative
                                    w-40
                                    h-40
                                    shrink-0
                                "
                            >

                                <div
                                    className="
                                        w-full
                                        h-full
                                        rounded-full
                                        border-[14px]
                                        border-green-100/80
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <div
                                        className="
                                            text-center
                                        "
                                    >

                                        <p
                                            className="
                                                text-4xl
                                                font-bold
                                                text-green-700
                                            "
                                        >
                                            82
                                        </p>

                                        <p
                                            className="
                                                text-sm
                                                text-gray-500
                                            "
                                        >
                                            / 100
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {!iconsOnly && (

                                <div
                                    className="
                                        flex-1
                                        w-full
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            justify-between
                                            mb-2
                                        "
                                    >

                                        <span
                                            className="
                                                text-sm
                                                text-gray-600
                                            "
                                        >
                                            {
                                                t.soilCondition
                                            }
                                        </span>

                                        <span
                                            className="
                                                text-sm
                                                font-semibold
                                                text-green-700
                                            "
                                        >
                                            {
                                                t.excellent
                                            }
                                        </span>

                                    </div>

                                    <div
                                        className="
                                            h-3
                                            bg-black/5
                                            rounded-full
                                            overflow-hidden
                                        "
                                    >

                                        <motion.div
                                            initial={{
                                                width: 0,
                                            }}
                                            animate={{
                                                width: "82%",
                                            }}
                                            transition={{
                                                duration: 1.2,
                                            }}
                                            className="
                                                h-full
                                                bg-green-600
                                                rounded-full
                                            "
                                        />

                                    </div>

                                    <p
                                        className="
                                            text-sm
                                            text-gray-500
                                            mt-5
                                            leading-6
                                        "
                                    >
                                        {
                                            t.soilHealthDescription
                                        }
                                    </p>

                                </div>

                            )}

                        </div>

                    </motion.div>

                    {/* =================================================
                        DEVICE
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="
                            relative
                            overflow-hidden
                            rounded-3xl
                            p-6
                            bg-white/30
                            backdrop-blur-xl
                            border
                            border-white/60
                            shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                mb-6
                            "
                        >

                            <div
                                className="
                                    w-11
                                    h-11
                                    rounded-2xl
                                    flex
                                    items-center
                                    justify-center
                                    bg-green-100/60
                                    border
                                    border-white/60
                                "
                            >

                                <Cpu
                                    size={22}
                                    className="
                                        text-green-700
                                    "
                                />

                            </div>

                            <div>

                                <h2
                                    className="
                                        font-bold
                                        text-black
                                    "
                                >
                                    {t.device}
                                </h2>

                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                    "
                                >
                                    {
                                        t.soilSensorUnit
                                    }
                                </p>

                            </div>

                        </div>

                        {!iconsOnly && (

                            <div
                                className="
                                    space-y-4
                                "
                            >

                                {/* Connection */}

                                <div
                                    className="
                                        flex
                                        justify-between
                                        items-center
                                    "
                                >

                                    <span
                                        className="
                                            text-sm
                                            text-gray-600
                                        "
                                    >
                                        {
                                            t.connection
                                        }
                                    </span>

                                    <span
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            text-sm
                                            font-semibold
                                            text-green-700
                                        "
                                    >

                                        <span
                                            className="
                                                w-2
                                                h-2
                                                rounded-full
                                                bg-green-500
                                            "
                                        />

                                        {
                                            t.connected
                                        }

                                    </span>

                                </div>

                                <div
                                    className="
                                        h-px
                                        bg-white/50
                                    "
                                />

                                {/* Device Name */}

                                <div
                                    className="
                                        flex
                                        justify-between
                                        items-center
                                    "
                                >

                                    <span
                                        className="
                                            text-sm
                                            text-gray-600
                                        "
                                    >
                                        {
                                            t.deviceName
                                        }
                                    </span>

                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                            text-black
                                        "
                                    >
                                        KB-SENSOR-01
                                    </span>

                                </div>

                                {/* Protocol */}

                                <div
                                    className="
                                        flex
                                        justify-between
                                        items-center
                                    "
                                >

                                    <span
                                        className="
                                            text-sm
                                            text-gray-600
                                        "
                                    >
                                        {
                                            t.protocol
                                        }
                                    </span>

                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                            text-black
                                        "
                                    >
                                        Modbus
                                    </span>

                                </div>

                                {/* Last Update */}

                                <div
                                    className="
                                        flex
                                        justify-between
                                        items-center
                                    "
                                >

                                    <span
                                        className="
                                            text-sm
                                            text-gray-600
                                        "
                                    >
                                        {
                                            t.lastUpdate
                                        }
                                    </span>

                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                            text-black
                                        "
                                    >
                                        {
                                            lastUpdated ||
                                            t.justNow
                                        }
                                    </span>

                                </div>

                                {/* Refresh */}

                                <button
                                    onClick={
                                        refreshData
                                    }
                                    className="
                                        w-full
                                        mt-3
                                        py-3
                                        rounded-2xl
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        bg-green-600/90
                                        hover:bg-green-700
                                        text-white
                                        font-semibold
                                        transition
                                    "
                                >

                                    <RefreshCw
                                        size={18}
                                    />

                                    {
                                        t.refreshReadings
                                    }

                                </button>

                            </div>

                        )}

                    </motion.div>

                </div>

                    <RecommendedRanges soilData={soilData} />
                {/* =================================================
                    FOOTER
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    className="
                        mt-5
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-3
                        px-5
                        py-4
                        rounded-2xl
                        bg-white/20
                        backdrop-blur-xl
                        border
                        border-white/40
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <Wifi
                            size={18}
                            className="
                                text-green-700
                            "
                        />

                        <span
                            className="
                                text-sm
                                text-gray-600
                            "
                        >
                            {t.demoData}
                        </span>

                    </div>

                    <span
                        className="
                            text-xs
                            text-gray-500
                        "
                    >
                        {t.liveData}
                    </span>

                </motion.div>

            </div>

        </main>
    );
}