"use client";

import { useState } from "react";
import { motion } from "motion/react";

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

/* =========================================================
   TYPES
========================================================= */

type Language = "en" | "hi" | "mr";
type ViewMode = "farmer" | "technical";

/* =========================================================
   TRANSLATIONS
   Natural farmer-friendly Hindi and Marathi
========================================================= */

const translations = {
    en: {
        farmerView: "Farmer View",
        technicalView: "Technical View",

        english: "English",
        hindi: "हिंदी",
        marathi: "मराठी",

        iconsOnly: "Icons Only",
        readAloud: "Read Aloud",
        stopReading: "Stop Reading",

        soilMonitoring: "Soil Monitoring",
        soilDashboard: "Soil Dashboard",

        dashboardSubtitle:
            "Monitor your soil condition using connected hardware.",

        hardwareConnected: "Hardware Connected",
        soilSensor: "ESP32 • Soil Sensor",

        refreshReadings: "Refresh Readings",

        /* Farmer cards */

        waterInSoil: "Water in Soil",
        soilWarmth: "Soil Warmth",
        soilBalance: "Soil Balance",
        saltLevel: "Salt Level",

        nitrogenFarmer: "Nitrogen (for Leaves)",
        phosphorusFarmer: "Phosphorus (for Roots & Flowers)",
        potassiumFarmer: "Potassium (for Fruit & Strength)",
        sunlight: "Sunlight",

        good: "Good",

        /* Farmer recommendation */

        whatToDo: "What to Do",

        everythingGood:
            "Everything looks good right now. No fertilizer is needed.",

        /* Technical */

        soilMoisture: "Soil Moisture",
        soilTemperature: "Soil Temperature",
        ph: "pH",
        electricalConductivity: "Electrical Conductivity",

        nitrogen: "Nitrogen (N)",
        phosphorus: "Phosphorus (P)",
        potassium: "Potassium (K)",

        lightIntensity: "Light Intensity",

        optimal: "Optimal",
        aboveRange: "Above Range",
        belowRange: "Below Range",

        probeReading: "Probe Reading",

        fertilizerRecommendation: "Fertilizer Recommendation",

        basedOn:
            "Based on current N • P • K • pH readings",

        agriculturalLime: "Agricultural Lime",

        limeDescription:
            "The soil is more acidic than the recommended 6.0–7.5 range. Correcting the soil pH first can help plants absorb nutrients more effectively.",

        /* Soil health */

        soilHealth: "Soil Health",
        overallCondition: "Overall condition of your soil",

        soilCondition: "Soil Condition",
        excellent: "Excellent",

        soilHealthDescription:
            "Your soil currently has balanced moisture, temperature and nutrient levels. No immediate action is required.",

        /* Device */

        device: "Device",
        soilSensorUnit: "Soil Sensor Unit",

        connection: "Connection",
        connected: "Connected",

        deviceName: "Device",
        protocol: "Protocol",
        lastUpdate: "Last Update",

        justNow: "Just now",

        demoData: "Demo sensor data",
        liveData:
            "Live ESP32 / Modbus data can be connected later",

        /* Read aloud */

        farmerSummary:
            "The soil condition is currently good. Water level, soil warmth, soil balance, salt level, nitrogen, phosphorus, potassium and sunlight are all in a good condition.",

        technicalSummary:
            "Technical soil readings. Soil moisture is 57 percent and optimal. Soil temperature is 32.2 degrees Celsius and above the recommended range. Soil pH is 5.9 and below the recommended range. Electrical conductivity is 2.02 millisiemens per centimeter and above the recommended range. Nitrogen is 243 kilograms per hectare and optimal. Phosphorus is 25 kilograms per hectare and above the range. Potassium is 166 kilograms per hectare and optimal. Light intensity is 20412 lux.",
    },

    /* =====================================================
       HINDI
    ===================================================== */

    hi: {
        farmerView: "किसान दृश्य",
        technicalView: "तकनीकी जानकारी",

        english: "English",
        hindi: "हिंदी",
        marathi: "मराठी",

        iconsOnly: "केवल आइकॉन",
        readAloud: "आवाज़ में सुनें",
        stopReading: "पढ़ना बंद करें",

        soilMonitoring: "मिट्टी की निगरानी",
        soilDashboard: "मिट्टी डैशबोर्ड",

        dashboardSubtitle:
            "कनेक्टेड सेंसर की मदद से अपनी मिट्टी की स्थिति देखें।",

        hardwareConnected: "सेंसर जुड़ा हुआ है",
        soilSensor: "ESP32 • मिट्टी सेंसर",

        refreshReadings: "रीडिंग अपडेट करें",

        /* Farmer */

        waterInSoil: "मिट्टी में पानी",
        soilWarmth: "मिट्टी का तापमान",
        soilBalance: "मिट्टी का संतुलन",
        saltLevel: "मिट्टी में नमक",

        nitrogenFarmer: "नाइट्रोजन (पत्तियों के लिए)",
        phosphorusFarmer: "फॉस्फोरस (जड़ों और फूलों के लिए)",
        potassiumFarmer: "पोटैशियम (फलों और पौधे की मजबूती के लिए)",
        sunlight: "धूप",

        good: "अच्छी स्थिति",

        /* Recommendation */

        whatToDo: "क्या करें",

        everythingGood:
            "अभी मिट्टी की स्थिति अच्छी है। इस समय खाद डालने की जरूरत नहीं है।",

        /* Technical */

        soilMoisture: "मिट्टी की नमी",
        soilTemperature: "मिट्टी का तापमान",
        ph: "पीएच",
        electricalConductivity: "विद्युत चालकता",

        nitrogen: "नाइट्रोजन (N)",
        phosphorus: "फॉस्फोरस (P)",
        potassium: "पोटैशियम (K)",

        lightIntensity: "प्रकाश की तीव्रता",

        optimal: "उपयुक्त",
        aboveRange: "सामान्य सीमा से अधिक",
        belowRange: "सामान्य सीमा से कम",

        probeReading: "सेंसर रीडिंग",

        fertilizerRecommendation: "खाद की सलाह",

        basedOn:
            "वर्तमान N • P • K • pH रीडिंग के आधार पर",

        agriculturalLime: "कृषि चूना",

        limeDescription:
            "मिट्टी की अम्लता अधिक है और pH 6.0–7.5 की अनुशंसित सीमा से कम है। पहले मिट्टी का pH सही करने से पौधों को पोषक तत्व बेहतर तरीके से मिल सकते हैं।",

        /* Soil health */

        soilHealth: "मिट्टी की सेहत",
        overallCondition: "आपकी मिट्टी की कुल स्थिति",

        soilCondition: "मिट्टी की स्थिति",
        excellent: "बहुत अच्छी",

        soilHealthDescription:
            "अभी मिट्टी में नमी, तापमान और पोषक तत्व संतुलित हैं। फिलहाल किसी तुरंत कार्रवाई की जरूरत नहीं है।",

        /* Device */

        device: "डिवाइस",
        soilSensorUnit: "मिट्टी सेंसर यूनिट",

        connection: "कनेक्शन",
        connected: "जुड़ा हुआ",

        deviceName: "डिवाइस",
        protocol: "प्रोटोकॉल",
        lastUpdate: "आखिरी अपडेट",

        justNow: "अभी",

        demoData: "डेमो सेंसर डेटा",

        liveData:
            "बाद में लाइव ESP32 / Modbus डेटा जोड़ा जा सकता है",

        /* Read aloud */

        farmerSummary:
            "अभी मिट्टी की स्थिति अच्छी है। मिट्टी में पानी, तापमान, संतुलन, नमक, नाइट्रोजन, फॉस्फोरस, पोटैशियम और धूप की स्थिति अच्छी है।",

        technicalSummary:
            "तकनीकी मिट्टी की जानकारी। मिट्टी की नमी 57 प्रतिशत है और यह उपयुक्त है। मिट्टी का तापमान 32.2 डिग्री सेल्सियस है और सामान्य सीमा से अधिक है। मिट्टी का पीएच 5.9 है और सामान्य सीमा से कम है। विद्युत चालकता 2.02 मिलीसीमेंस प्रति सेंटीमीटर है और सामान्य सीमा से अधिक है। नाइट्रोजन 243 किलोग्राम प्रति हेक्टेयर है और उपयुक्त है। फॉस्फोरस 25 किलोग्राम प्रति हेक्टेयर है और सामान्य सीमा से अधिक है। पोटैशियम 166 किलोग्राम प्रति हेक्टेयर है और उपयुक्त है। प्रकाश की तीव्रता 20412 लक्स है।",
    },

    /* =====================================================
       MARATHI
    ===================================================== */

    mr: {
        farmerView: "शेतकरी दृश्य",
        technicalView: "तांत्रिक माहिती",

        english: "English",
        hindi: "हिंदी",
        marathi: "मराठी",

        iconsOnly: "फक्त आयकॉन",
        readAloud: "आवाजात वाचा",
        stopReading: "वाचन थांबवा",

        soilMonitoring: "मातीचे निरीक्षण",
        soilDashboard: "माती डॅशबोर्ड",

        dashboardSubtitle:
            "कनेक्टेड सेन्सरच्या मदतीने मातीची स्थिती तपासा.",

        hardwareConnected: "सेन्सर जोडलेला आहे",
        soilSensor: "ESP32 • माती सेन्सर",

        refreshReadings: "रीडिंग अपडेट करा",

        /* Farmer */

        waterInSoil: "मातीतील पाणी",
        soilWarmth: "मातीचे तापमान",
        soilBalance: "मातीचा समतोल",
        saltLevel: "मातीतील क्षार",

        nitrogenFarmer: "नायट्रोजन (पानांसाठी)",
        phosphorusFarmer: "फॉस्फरस (मुळे आणि फुलांसाठी)",
        potassiumFarmer: "पोटॅशियम (फळे आणि झाडाच्या मजबुतीसाठी)",
        sunlight: "सूर्यप्रकाश",

        good: "चांगली स्थिती",

        /* Recommendation */

        whatToDo: "काय करावे",

        everythingGood:
            "सध्या मातीची स्थिती चांगली आहे. आत्ता खत देण्याची गरज नाही.",

        /* Technical */

        soilMoisture: "मातीतील ओलावा",
        soilTemperature: "मातीचे तापमान",
        ph: "पीएच",
        electricalConductivity: "विद्युत चालकता",

        nitrogen: "नायट्रोजन (N)",
        phosphorus: "फॉस्फरस (P)",
        potassium: "पोटॅशियम (K)",

        lightIntensity: "प्रकाशाची तीव्रता",

        optimal: "योग्य पातळी",
        aboveRange: "सामान्य मर्यादेपेक्षा जास्त",
        belowRange: "सामान्य मर्यादेपेक्षा कमी",

        probeReading: "सेन्सर रीडिंग",

        fertilizerRecommendation: "खताची शिफारस",

        basedOn:
            "सध्याच्या N • P • K • pH रीडिंगच्या आधारावर",

        agriculturalLime: "कृषी चुना",

        limeDescription:
            "मातीची आम्लता जास्त आहे आणि pH 6.0–7.5 या योग्य मर्यादेपेक्षा कमी आहे. प्रथम मातीचा pH योग्य केल्यास पिकांना पोषक घटक अधिक चांगल्या प्रकारे मिळू शकतात.",

        /* Soil health */

        soilHealth: "मातीची गुणवत्ता",
        overallCondition: "तुमच्या मातीची एकूण स्थिती",

        soilCondition: "मातीची स्थिती",
        excellent: "उत्तम",

        soilHealthDescription:
            "सध्या मातीतील ओलावा, तापमान आणि पोषक घटक संतुलित आहेत. आत्ता कोणतीही तातडीची कारवाई करण्याची गरज नाही.",

        /* Device */

        device: "डिव्हाइस",
        soilSensorUnit: "माती सेन्सर युनिट",

        connection: "कनेक्शन",
        connected: "जोडलेले",

        deviceName: "डिव्हाइस",
        protocol: "प्रोटोकॉल",
        lastUpdate: "शेवटचे अपडेट",

        justNow: "आत्ताच",

        demoData: "डेमो सेन्सर डेटा",

        liveData:
            "नंतर थेट ESP32 / Modbus डेटा जोडता येईल",

        /* Read aloud */

        farmerSummary:
            "सध्या मातीची स्थिती चांगली आहे. मातीतील पाणी, तापमान, समतोल, क्षार, नायट्रोजन, फॉस्फरस, पोटॅशियम आणि सूर्यप्रकाशाची स्थिती चांगली आहे.",

        technicalSummary:
            "मातीची तांत्रिक माहिती. मातीतील ओलावा 57 टक्के आहे आणि तो योग्य आहे. मातीचे तापमान 32.2 अंश सेल्सिअस आहे आणि ते सामान्य मर्यादेपेक्षा जास्त आहे. मातीचा पीएच 5.9 आहे आणि तो सामान्य मर्यादेपेक्षा कमी आहे. विद्युत चालकता 2.02 मिलीसीमेंस प्रति सेंटीमीटर आहे आणि ती सामान्य मर्यादेपेक्षा जास्त आहे. नायट्रोजन 243 किलोग्रॅम प्रति हेक्टर आहे आणि योग्य पातळीवर आहे. फॉस्फरस 25 किलोग्रॅम प्रति हेक्टर आहे आणि सामान्य मर्यादेपेक्षा जास्त आहे. पोटॅशियम 166 किलोग्रॅम प्रति हेक्टर आहे आणि योग्य पातळीवर आहे. प्रकाशाची तीव्रता 20412 लक्स आहे.",
    },
};

/* =========================================================
   FARMER DATA
========================================================= */

const farmerData = [
    {
        key: "waterInSoil",
        icon: Droplets,
        rating: 3,
    },
    {
        key: "soilWarmth",
        icon: Thermometer,
        rating: 3,
    },
    {
        key: "soilBalance",
        icon: Scale,
        rating: 2,
    },
    {
        key: "saltLevel",
        icon: Waves,
        rating: 2,
    },
    {
        key: "nitrogenFarmer",
        icon: Leaf,
        rating: 3,
    },
    {
        key: "phosphorusFarmer",
        icon: Sprout,
        rating: 1,
    },
    {
        key: "potassiumFarmer",
        icon: Zap,
        rating: 2,
    },
    {
        key: "sunlight",
        icon: Sun,
        rating: 3,
    },
];

/* =========================================================
   TECHNICAL DATA
========================================================= */

const technicalData = [
    {
        key: "soilMoisture",
        value: "57",
        unit: "%",
        status: "optimal",
        icon: Droplets,
        progress: 57,
        probe: "57%",
    },
    {
        key: "soilTemperature",
        value: "32.2",
        unit: "°C",
        status: "aboveRange",
        icon: Thermometer,
        progress: 68,
        probe: "32.2 °C",
    },
    {
        key: "ph",
        value: "5.9",
        unit: "",
        status: "belowRange",
        icon: FlaskConical,
        progress: 42,
        probe: "5.9",
    },
    {
        key: "electricalConductivity",
        value: "2.02",
        unit: "mS/cm",
        status: "aboveRange",
        icon: Activity,
        progress: 55,
        probe: "2.02 mS/cm",
    },
    {
        key: "nitrogen",
        value: "243",
        unit: "kg/ha",
        status: "optimal",
        icon: Leaf,
        progress: 65,
        probe: "222 mg/kg",
    },
    {
        key: "phosphorus",
        value: "25",
        unit: "kg/ha",
        status: "aboveRange",
        icon: Sprout,
        progress: 25,
        probe: "12.7 mg/kg",
    },
    {
        key: "potassium",
        value: "166",
        unit: "kg/ha",
        status: "optimal",
        icon: Zap,
        progress: 48,
        probe: "83 mg/kg",
    },
    {
        key: "lightIntensity",
        value: "20412",
        unit: "lux",
        status: "optimal",
        icon: Sun,
        progress: 68,
        probe: "20412 lux",
    },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Dashboard() {
    const [view, setView] = useState<ViewMode>("farmer");

    const [language, setLanguage] =
        useState<Language>("en");

    const [iconsOnly, setIconsOnly] =
        useState(false);

    const [isReading, setIsReading] =
        useState(false);

    const [lastUpdated, setLastUpdated] =
        useState("Just now");

    const t = translations[language];

    /* =====================================================
       REFRESH
    ===================================================== */

    const refreshData = () => {
        const now = new Date();

        const time = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        setLastUpdated(time);
    };

    /* =====================================================
       READ ALOUD
    ===================================================== */

    const speakDashboard = () => {
        if (typeof window === "undefined") return;

        window.speechSynthesis.cancel();

        const text =
            view === "farmer"
                ? t.farmerSummary
                : t.technicalSummary;

        const speech =
            new SpeechSynthesisUtterance(text);

        if (language === "hi") {
            speech.lang = "hi-IN";
        } else if (language === "mr") {
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

        window.speechSynthesis.speak(speech);
    };

    /* =====================================================
       STOP READING
    ===================================================== */

    const stopReading = () => {
        if (typeof window !== "undefined") {
            window.speechSynthesis.cancel();
        }

        setIsReading(false);
    };

    /* =====================================================
       CHANGE LANGUAGE
    ===================================================== */

    const changeLanguage = (newLanguage: Language) => {
        stopReading();
        setLanguage(newLanguage);
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

                    <div className="flex items-center gap-3">

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

                            <div className="relative">

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
                            <RefreshCw size={18} />

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
                            onClick={() => setView("farmer")}
                            className={`
                                px-5
                                py-3
                                rounded-xl
                                font-semibold
                                transition
                                ${
                                    view === "farmer"
                                        ? "bg-white text-black shadow"
                                        : "text-gray-600 hover:text-black"
                                }
                            `}
                        >
                            {t.farmerView}
                        </button>

                        <button
                            onClick={() => setView("technical")}
                            className={`
                                px-5
                                py-3
                                rounded-xl
                                font-semibold
                                transition
                                ${
                                    view === "technical"
                                        ? "bg-white text-black shadow"
                                        : "text-gray-600 hover:text-black"
                                }
                            `}
                        >
                            {t.technicalView}
                        </button>

                    </div>

                    {/* Language */}

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
                                changeLanguage("en")
                            }
                            className={`
                                px-4
                                py-2.5
                                rounded-xl
                                font-medium
                                transition
                                ${
                                    language === "en"
                                        ? "bg-white text-black shadow"
                                        : "text-gray-600"
                                }
                            `}
                        >
                            English
                        </button>

                        <button
                            onClick={() =>
                                changeLanguage("hi")
                            }
                            className={`
                                px-4
                                py-2.5
                                rounded-xl
                                font-medium
                                transition
                                ${
                                    language === "hi"
                                        ? "bg-white text-black shadow"
                                        : "text-gray-600"
                                }
                            `}
                        >
                            हिंदी
                        </button>

                        <button
                            onClick={() =>
                                changeLanguage("mr")
                            }
                            className={`
                                px-4
                                py-2.5
                                rounded-xl
                                font-medium
                                transition
                                ${
                                    language === "mr"
                                        ? "bg-white text-black shadow"
                                        : "text-gray-600"
                                }
                            `}
                        >
                            मराठी
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
                            checked={iconsOnly}
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

                        <Volume2 size={20} />

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
                                (item, index) => {

                                    const Icon =
                                        item.icon;

                                    return (

                                        <motion.div
                                            key={item.key}
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
                                                        size={38}
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
                                                            className="
                                                                text-2xl
                                                                font-bold
                                                                text-green-700
                                                                mt-3
                                                            "
                                                        >
                                                            {t.good}
                                                        </p>

                                                        <div
                                                            className="
                                                                flex
                                                                gap-2
                                                                mt-4
                                                            "
                                                        >

                                                            {[1, 2, 3, 4, 5].map(
                                                                (dot) => (

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
                                        {t.everythingGood}
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
                                (sensor, index) => {

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
                                            key={sensor.key}
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
                                                        size={24}
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
                                                    {status}
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
                                                        {title}
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
                                                        {t.probeReading}:{" "}
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

                        <section className="mt-8">

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
                                    {t.fertilizerRecommendation}
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
                                        md:flex-row
                                        gap-3
                                    "
                                >

                                    <span
                                        className="
                                            font-bold
                                            text-orange-700
                                            min-w-fit
                                        "
                                    >
                                        {t.agriculturalLime}
                                    </span>

                                    <span
                                        className="
                                            text-gray-700
                                        "
                                    >
                                        {t.limeDescription}
                                    </span>

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

                    {/* Soil health */}

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
                                    {t.overallCondition}
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
                                            {t.soilCondition}
                                        </span>

                                        <span
                                            className="
                                                text-sm
                                                font-semibold
                                                text-green-700
                                            "
                                        >
                                            {t.excellent}
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
                                        {t.soilHealthDescription}
                                    </p>

                                </div>

                            )}

                        </div>

                    </motion.div>

                    {/* Device */}

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
                                    {t.soilSensorUnit}
                                </p>

                            </div>

                        </div>

                        {!iconsOnly && (

                            <div className="space-y-4">

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
                                        {t.connection}
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

                                        {t.connected}

                                    </span>

                                </div>

                                <div
                                    className="
                                        h-px
                                        bg-white/50
                                    "
                                />

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
                                        {t.deviceName}
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
                                        {t.protocol}
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
                                        {t.lastUpdate}
                                    </span>

                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                            text-black
                                        "
                                    >
                                        {lastUpdated}
                                    </span>

                                </div>

                                <button
                                    onClick={refreshData}
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

                                    <RefreshCw size={18} />

                                    {t.refreshReadings}

                                </button>

                            </div>

                        )}

                    </motion.div>

                </div>

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