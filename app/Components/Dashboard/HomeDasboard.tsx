"use client";

import { useMemo, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/translations/LanguageContext";
import { soilData } from "@/app/soil/soilData";

import {
  Volume2,
  Square,
  AlertTriangle,
  Activity,
  Droplets,
  Thermometer,
  FlaskConical,
  Sprout,
  Wifi,
  WifiOff,
  Sun,
  Leaf,
  Gauge,
  Beaker,
  RefreshCw,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

/* =========================================================
   GLASS CARD
========================================================= */

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      className={`
        rounded-3xl
        border border-white/65
        bg-white/[0.30]
        backdrop-blur-2xl
        backdrop-saturate-150
        shadow-[0_12px_35px_rgba(60,70,80,0.12)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  type,
  children,
}: {
  type: "good" | "warning" | "danger" | "info";
  children: ReactNode;
}) {
  const styles = {
    good: "bg-emerald-100/80 text-emerald-700",
    warning: "bg-amber-100/80 text-amber-700",
    danger: "bg-red-100/80 text-red-700",
    info: "bg-blue-100/80 text-blue-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[type]}`}
    >
      {children}
    </span>
  );
}

/* =========================================================
   FARMER READING CARD
========================================================= */

function ReadingCard({
  title,
  farmerLabel,
  value,
  unit,
  description,
  icon: Icon,
  iconClass,
  warning = false,
}: {
  title: string;
  farmerLabel: string;
  value: string | number;
  unit?: string;
  description: string;
  icon: React.ElementType;
  iconClass: string;
  warning?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-slate-800">
            {farmerLabel}
          </h3>
        </div>

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          className={`rounded-2xl p-3 ${iconClass}`}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </span>

        {unit && (
          <span className="mb-1 text-sm text-slate-500">
            {unit}
          </span>
        )}
      </div>

      <div className="mt-4">
        <StatusBadge type={warning ? "warning" : "good"}>
          {warning ? t.needsAttention : t.good}
        </StatusBadge>
      </div>

      <div className="mt-4 flex items-start gap-2">
        {warning ? (
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        ) : (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        )}

        <p className="text-xs leading-5 text-slate-600">
          {description}
        </p>
      </div>
    </GlassCard>
  );
}

/* =========================================================
   NPK CARD
========================================================= */

function NPKCard() {
  const { t } = useLanguage();

  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {t.soilNutrients}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-slate-800">
            {t.cropNutrition}
          </h3>
        </div>

        <div className="rounded-2xl bg-emerald-100/70 p-3">
          <Sprout className="h-6 w-6 text-emerald-700" />
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {t.nutrientLevels}
      </p>

      <div className="mt-6 space-y-4">
        {/* Nitrogen */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              {t.nitrogen}
            </span>

            <span className="text-sm font-bold text-slate-800">
              {soilData.nitrogen}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200/70">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${soilData.nitrogen}%`,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
              }}
              className="h-full rounded-full bg-emerald-500"
            />
          </div>
        </div>

        {/* Phosphorus */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              {t.phosphorus}
            </span>

            <span className="text-sm font-bold text-slate-800">
              {soilData.phosphorus}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200/70">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${soilData.phosphorus}%`,
              }}
              transition={{
                duration: 1,
                delay: 0.3,
              }}
              className="h-full rounded-full bg-blue-500"
            />
          </div>
        </div>

        {/* Potassium */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              {t.potassium}
            </span>

            <span className="text-sm font-bold text-slate-800">
              {soilData.potassium}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200/70">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${soilData.potassium}%`,
              }}
              transition={{
                duration: 1,
                delay: 0.4,
              }}
              className="h-full rounded-full bg-green-600"
            />
          </div>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-slate-500">
        {t.sensorReadings}
      </p>
    </GlassCard>
  );
}

/* =========================================================
   SOIL HEALTH CARD
========================================================= */

function SoilHealthCard({
  score,
}: {
  score: number;
}) {
  const { t } = useLanguage();

  const circumference = 2 * Math.PI * 52;

  const offset =
    circumference -
    (score / 100) * circumference;

  return (
    <GlassCard className="p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {t.overallCondition}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-800">
            {t.howIsYourSoil}
          </h2>
        </div>

        <div className="rounded-2xl bg-emerald-100/70 p-3">
          <Leaf className="h-6 w-6 text-emerald-700" />
        </div>
      </div>

      <div className="mt-7 flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-36 w-36 shrink-0">
          <svg
            viewBox="0 0 120 120"
            className="h-full w-full -rotate-90"
          >
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              className="text-slate-300/60"
            />

            <motion.circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              className="text-emerald-500"
              strokeDasharray={circumference}
              initial={{
                strokeDashoffset: circumference,
              }}
              animate={{
                strokeDashoffset: offset,
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-800">
              {score}%
            </span>

            <span className="text-[10px] font-medium text-slate-500">
              {t.soilHealth}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <StatusBadge
            type={
              score >= 80
                ? "good"
                : score >= 60
                  ? "warning"
                  : "danger"
            }
          >
            {score >= 80
              ? t.goodCondition
              : score >= 60
                ? t.needsAttention
                : t.needsCare}
          </StatusBadge>

          <h3 className="mt-3 text-lg font-semibold text-slate-800">
            {score >= 80
              ? t.soilDoingWell
              : score >= 60
                ? t.fewThingsAttention
                : t.soilNeedsAttention}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {t.soilScoreDescription}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700">
            <Activity className="h-4 w-4" />
            {t.liveSoilAnalysis}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

/* =========================================================
   SENSOR STATUS
========================================================= */

function SensorStatus() {
  const { t } = useLanguage();

  return (
    <GlassCard className="p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {t.fieldMonitor}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-800">
            {t.deviceStatus}
          </h2>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="rounded-2xl bg-cyan-100/70 p-3"
        >
          {soilData.connected ? (
            <Wifi className="h-6 w-6 text-cyan-700" />
          ) : (
            <WifiOff className="h-6 w-6 text-red-500" />
          )}
        </motion.div>
      </div>

      <div className="mt-7 rounded-2xl border border-white/60 bg-white/[0.30] p-5 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <span
              className={`block h-4 w-4 rounded-full ${
                soilData.connected
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
            />

            {soilData.connected && (
              <motion.span
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full bg-emerald-500"
              />
            )}
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              {soilData.connected
                ? t.deviceConnected
                : t.deviceOffline}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {t.esp32SoilUnit}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/60 bg-white/[0.30] p-4 backdrop-blur-xl">
          <p className="text-xs text-slate-500">
            {t.connection}
          </p>

          <p className="mt-1 text-sm font-medium text-emerald-700">
            {t.stable}
          </p>
        </div>

        <div className="rounded-2xl border border-white/60 bg-white/[0.30] p-4 backdrop-blur-xl">
          <p className="text-xs text-slate-500">
            {t.monitoring}
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700">
            ESP32
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function HomeDashboard() {
  const [username, setUsername] =
    useState("User");

  const { t, language } =
    useLanguage();

  const [aiLoading, setAiLoading] =
    useState(false);

  const [aiSolution, setAiSolution] =
    useState("");

  const [aiError, setAiError] =
    useState("");

  const [isReading, setIsReading] =
    useState(false);

  /* =======================================================
     USERNAME
  ======================================================= */

  useEffect(() => {
    const storedUsername =
      localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  /* =======================================================
     REFRESH
  ======================================================= */

  const handleRefresh = () => {
    window.location.reload();
  };

  /* =======================================================
     WARNINGS
  ======================================================= */

  const warnings = useMemo(() => {
    const result: string[] = [];

    if (soilData.moisture < 40) {
      result.push(
        `${t.soilMoistureLow} ${soilData.moisture}%. ${t.irrigationMayBeRequired}`
      );
    }

    if (soilData.moisture > 80) {
      result.push(
        `${t.soilMoistureHigh} ${soilData.moisture}%. ${t.checkOverwatering}`
      );
    }

    if (soilData.ph < 6) {
      result.push(
        `${t.soilPhAcidic} ${soilData.ph}. ${t.checkSoilPh}`
      );
    }

    if (soilData.ph > 7.5) {
      result.push(
        `${t.soilPhAlkaline} ${soilData.ph}. ${t.soilTreatment}`
      );
    }

    if (soilData.temperature > 35) {
      result.push(
        `${t.soilTemperatureHigh} ${soilData.temperature}°C.`
      );
    }

    if (soilData.ec > 2.5) {
      result.push(
        `${t.ecHigh} ${soilData.ec} mS/cm. ${t.saltAttention}`
      );
    }

    return result;
  }, [t]);

  /* =======================================================
     READ ONLY NEEDS ATTENTION
  ======================================================= */

  const handleReadAloud = () => {
    if (typeof window === "undefined") {
      return;
    }

    /* Stop reading */
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    /* Nothing to read */
    if (warnings.length === 0) {
      return;
    }

    /*
      Read ONLY the warnings from the
      "Needs Attention" box.
    */
    const textToRead = warnings.join(". ");

    const utterance =
      new SpeechSynthesisUtterance(
        textToRead
      );

    /* Language */
    utterance.lang =
      language === "hi"
        ? "hi-IN"
        : language === "mr"
          ? "mr-IN"
          : "en-IN";

    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsReading(true);
    };

    utterance.onend = () => {
      setIsReading(false);
    };

    utterance.onerror = () => {
      setIsReading(false);
    };

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
      utterance
    );
  };

  /* =======================================================
     CLEAN GEMINI RESPONSE
  ======================================================= */

  const cleanAIResponse = (
    text: string
  ) => {
    return text
      /* Remove bold markdown **text** */
      .replace(/\*\*/g, "")
      /* Remove markdown bullet at beginning */
      .replace(/^\s*\*\s?/gm, "")
      /* Remove markdown heading symbols */
      .replace(/^#+\s?/gm, "")
      .trim();
  };

  /* =======================================================
     ASK AI
  ======================================================= */

  const askAI = async () => {
    if (aiLoading) {
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiSolution("");

    try {
      const response =
        await fetch(
          "/api/soil-chat",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              source: "home",

              message: `
Analyze the current soil sensor readings and give the farmer a COMPLETE solution.

Do NOT only introduce yourself.
Do NOT stop after saying "Based on your current sensor data".

Current detected issues:
${warnings.join("\n")}

IMPORTANT LANGUAGE RULE:
Translate EVERYTHING into the selected language.

The section headings must ALSO be translated.
Do NOT keep English headings such as:
Problem
Why it matters
What you can do
What to check
Important

Selected language:
${language === "hi"
  ? "Hindi"
  : language === "mr"
    ? "Marathi"
    : "English"}

Use this structure:

${language === "hi"
  ? `
समस्या:
वर्तमान सेंसर रीडिंग के आधार पर मुख्य मिट्टी की समस्या समझाएं।

यह क्यों महत्वपूर्ण है:
बताएं कि इन रीडिंग पर ध्यान देना क्यों जरूरी हो सकता है।

आप क्या कर सकते हैं:
2 से 4 व्यावहारिक और सामान्य कदम बताएं।

क्या जांचना चाहिए:
आगे किसान को किन चीजों की निगरानी करनी चाहिए बताएं।

महत्वपूर्ण:
सेंसर रीडिंग का उपयोग करें और कोई रीडिंग न बनाएं।
सार्वभौमिक उर्वरक की मात्रा न बताएं।
`
  : language === "mr"
    ? `
समस्या:
सध्याच्या सेन्सर रीडिंगनुसार मातीच्या मुख्य समस्या समजावून सांगा.

हे का महत्त्वाचे आहे:
या रीडिंगकडे लक्ष देणे का आवश्यक असू शकते ते समजावून सांगा.

तुम्ही काय करू शकता:
2 ते 4 व्यावहारिक आणि सामान्य उपाय सांगा.

काय तपासावे:
पुढे शेतकऱ्याने कोणत्या गोष्टींची नियमित तपासणी करावी ते सांगा.

महत्त्वाचे:
सेन्सर रीडिंगचा वापर करा आणि कोणतीही रीडिंग तयार करू नका.
सार्वत्रिक खताचे प्रमाण सांगू नका.
`
    : `
Problem:
Explain the main soil problems using the actual sensor values.

Why it matters:
Briefly explain why these readings may need attention.

What you can do:
Give 2 to 4 practical and general actions.

What to check:
Mention what the farmer should monitor next.

Important:
Use the actual sensor readings.
Do not invent readings.
Do not give a universal fertilizer dose.
`}

VERY IMPORTANT:
- Translate ALL headings.
- Translate ALL explanations.
- Translate ALL recommendations.
- Do not mix English headings into Hindi or Marathi.
- Do not use Markdown bold using **.
- Do not use * symbols.
- Keep the answer simple and farmer-friendly.
- Use the actual sensor readings.
- Do not invent readings.
- Give a complete answer.
`,
              /*
                IMPORTANT:
                This is the SAME shared soilData
                used everywhere in the dashboard.
              */
              soilData,

              language,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to get AI solution."
        );
      }

      const cleanedAnswer =
        cleanAIResponse(
          data.answer || ""
        );

      setAiSolution(
        cleanedAnswer
      );
    } catch (error) {
      console.error(
        "Home AI Error:",
        error
      );

      setAiError(
        language === "hi"
          ? "AI से समाधान प्राप्त नहीं हो सका। कृपया फिर से प्रयास करें।"
          : language === "mr"
            ? "AI कडून समाधान मिळू शकले नाही. कृपया पुन्हा प्रयत्न करा."
            : "Could not get the AI solution. Please try again."
      );
    } finally {
      setAiLoading(false);
    }
  };

  /* =======================================================
     SOIL HEALTH SCORE
  ======================================================= */

  const soilHealth = useMemo(() => {
    let score = 100;

    if (
      soilData.moisture < 40 ||
      soilData.moisture > 80
    ) {
      score -= 15;
    }

    if (
      soilData.ph < 6 ||
      soilData.ph > 7.5
    ) {
      score -= 20;
    }

    if (
      soilData.temperature > 35
    ) {
      score -= 10;
    }

    if (soilData.ec > 2.5) {
      score -= 10;
    }

    return Math.max(score, 0);
  }, []);

  /* =======================================================
     RECOMMENDATION
  ======================================================= */

  const recommendation =
    useMemo(() => {
      if (soilData.ph < 6) {
        return {
          title:
            t.checkYourSoilPh,
          text:
            t.acidicSoilRecommendation,
        };
      }

      if (
        soilData.moisture < 40
      ) {
        return {
          title:
            t.soilMayNeedWater,
          text:
            t.lowMoistureRecommendation,
        };
      }

      if (
        soilData.moisture > 80
      ) {
        return {
          title:
            t.checkYourIrrigation,
          text:
            t.highMoistureRecommendation,
        };
      }

      return {
        title:
          t.soilLooksStable,
        text:
          t.stableSoilRecommendation,
      };
    }, [t]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-transparent
        text-slate-800
      "
    >
      {/* SOFT BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-blue-200/25
            blur-3xl
          "
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -bottom-32
            -right-32
            h-96
            w-96
            rounded-full
            bg-orange-200/20
            blur-3xl
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">

        {/* =================================================
            TOP GREETING
        ================================================= */}

        <motion.header
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
          }}
          className="mb-8"
        >
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-xl bg-emerald-100/80 p-2">
                  <Sprout className="h-5 w-5 text-emerald-700" />
                </div>

                <span className="text-sm font-semibold text-emerald-700">
                  {t.krushiBandhu} •{" "}
                  {t.soilMonitor}
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {t.welcomeBack},{" "}
                {username}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                {t.homeDashboardSubtitle}
              </p>
            </div>

            {/* =================================================
                REFRESH + READ ALOUD
            ================================================= */}

            <div className="flex flex-wrap items-center gap-3">

              {/* Refresh */}
              <button
                type="button"
                onClick={
                  handleRefresh
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-white/80
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                  transition
                  hover:bg-white
                "
              >
                <RefreshCw className="h-4 w-4" />

                {t.refreshReadings}
              </button>

              {/* Read Aloud */}
              <button
                type="button"
                onClick={
                  handleReadAloud
                }
                disabled={
                  warnings.length === 0
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-white/80
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                  transition
                  hover:bg-white
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                title={
                  warnings.length === 0
                    ? "No issues to read"
                    : "Read Needs Attention"
                }
              >
                {isReading ? (
                  <Square className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}

                {isReading
                  ? t.stopReading
                  : t.readAloud}
              </button>
            </div>
          </div>
        </motion.header>

        {/* =================================================
            NEEDS ATTENTION
        ================================================= */}

        <AnimatePresence>
          {warnings.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: -30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -30,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                mb-6
                rounded-3xl
                border
                border-amber-300/70
                bg-amber-50/60
                p-5
                backdrop-blur-2xl
                shadow-[0_8px_35px_rgba(80,80,60,0.10)]
                sm:p-6
              "
            >
              <div className="flex items-start gap-4">

                <motion.div
                  animate={{
                    rotate: [
                      0,
                      -5,
                      5,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="rounded-2xl bg-amber-100/80 p-3"
                >
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </motion.div>

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h3 className="text-lg font-semibold text-amber-800">
                      {t.needsAttention}
                    </h3>

                    <StatusBadge type="warning">
                      {warnings.length}{" "}
                      {warnings.length ===
                      1
                        ? t.issue
                        : t.issues}
                    </StatusBadge>
                  </div>

                  {/* ONLY THESE WARNINGS ARE READ ALOUD */}
                  <div className="mt-3 space-y-2">
                    {warnings.map(
                      (
                        warning,
                        index
                      ) => (
                        <motion.p
                          key={
                            warning
                          }
                          initial={{
                            opacity: 0,
                            x: -10,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay:
                              index *
                              0.1,
                          }}
                          className="text-sm leading-6 text-slate-600"
                        >
                          •{" "}
                          {
                            warning
                          }
                        </motion.p>
                      )
                    )}
                  </div>

                  {/* =================================================
                      ASK AI BUTTON
                  ================================================= */}

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <motion.button
                      type="button"
                      onClick={
                        askAI
                      }
                      disabled={
                        aiLoading
                      }
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-2xl
                        bg-emerald-600
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-lg
                        transition
                        hover:bg-emerald-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {aiLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />

                          {language ===
                          "hi"
                            ? "AI समाधान तैयार कर रहा है..."
                            : language ===
                                "mr"
                              ? "AI समाधान तयार करत आहे..."
                              : "AI is analyzing..."}
                        </>
                      ) : (
                        <>
                          <Sprout className="h-4 w-4" />

                          {language ===
                          "hi"
                            ? "AI से समाधान पूछें"
                            : language ===
                                "mr"
                              ? "AI कडून समाधान विचारा"
                              : "Ask AI for Solution"}
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* AI ERROR */}

                  {aiError && (
                    <div
                      className="
                        mt-4
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50/70
                        px-4
                        py-3
                        text-sm
                        text-red-700
                      "
                    >
                      {aiError}
                    </div>
                  )}

                  {/* =================================================
                      AI SOLUTION
                  ================================================= */}

                  {aiSolution && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        mt-5
                        rounded-2xl
                        border
                        border-emerald-200/70
                        bg-white/60
                        p-5
                        backdrop-blur-xl
                        shadow-[0_8px_25px_rgba(60,70,80,0.08)]
                      "
                    >
                      <div className="flex items-start gap-3">

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-emerald-100
                            text-emerald-700
                          "
                        >
                          <Sprout className="h-5 w-5" />
                        </div>

                        <div className="flex-1">

                          <h4
                            className="
                              text-base
                              font-bold
                              text-slate-800
                            "
                          >
                            {language ===
                            "hi"
                              ? "KrushiBandhu AI समाधान"
                              : language ===
                                  "mr"
                                ? "KrushiBandhu AI समाधान"
                                : "KrushiBandhu AI Solution"}
                          </h4>

                          <p
                            className="
                              mt-3
                              whitespace-pre-wrap
                              text-sm
                              leading-6
                              text-slate-600
                            "
                          >
                            {
                              aiSolution
                            }
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            MAIN STATUS
        ================================================= */}

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
            duration: 0.6,
          }}
          className="mb-6"
        >
          <GlassCard className="overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="flex items-center gap-3">

                  <div className="rounded-2xl bg-emerald-100/80 p-3">
                    <Leaf className="h-7 w-7 text-emerald-700" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {
                        t.todaySoilCondition
                      }
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                      {soilHealth >=
                      80
                        ? t.soilDoingWell
                        : soilHealth >=
                            60
                          ? t.soilNeedsSomeAttention
                          : t.soilNeedsCare}
                    </h2>
                  </div>
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                  {
                    t.soilHealthDescription
                  }
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-4">

                <div className="text-right">
                  <p className="text-xs text-slate-500">
                    {t.soilHealth}
                  </p>

                  <p className="text-4xl font-bold text-emerald-700">
                    {soilHealth}%
                  </p>
                </div>

                <StatusBadge
                  type={
                    soilHealth >=
                    80
                      ? "good"
                      : soilHealth >=
                          60
                        ? "warning"
                        : "danger"
                  }
                >
                  {soilHealth >=
                  80
                    ? t.good
                    : soilHealth >=
                        60
                      ? t.needsAttention
                      : t.needsCare}
                </StatusBadge>
              </div>
            </div>
          </GlassCard>
        </motion.section>

        {/* =================================================
            TODAY'S READINGS
        ================================================= */}

        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t.todaysReadings}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {
              t.todaysReadingsSubtitle
            }
          </p>
        </div>

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
            duration: 0.6,
          }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >

          {/* Moisture */}

          <ReadingCard
            title={t.moisture}
            farmerLabel={
              soilData.moisture <
              40
                ? t.soilDry
                : soilData.moisture >
                    80
                  ? t.soilWet
                  : t.moistureGood
            }
            value={
              soilData.moisture
            }
            unit="%"
            description={
              soilData.moisture <
              40
                ? t.yourIrrigationMayBeRequired
                : soilData.moisture >
                    80
                  ? t.moistureHighDescription
                  : t.moisturePreferredRange
            }
            icon={Droplets}
            iconClass="bg-cyan-100/70 text-cyan-700"
            warning={
              soilData.moisture <
                40 ||
              soilData.moisture >
                80
            }
          />

          {/* Temperature */}

          <ReadingCard
            title={t.temperature}
            farmerLabel={
              soilData.temperature >
              35
                ? t.soilHot
                : t.temperatureGood
            }
            value={
              soilData.temperature
            }
            unit="°C"
            description={
              soilData.temperature >
              35
                ? t.temperatureHigh
                : t.temperatureNormal
            }
            icon={Thermometer}
            iconClass="bg-orange-100/70 text-orange-700"
            warning={
              soilData.temperature >
              35
            }
          />

          {/* pH */}

          <ReadingCard
            title={t.soilPh}
            farmerLabel={
              soilData.ph < 6
                ? t.soilAcidic
                : soilData.ph >
                    7.5
                  ? t.soilAlkaline
                  : t.phGood
            }
            value={soilData.ph}
            description={
              soilData.ph < 6
                ? t.checkSoilPh
                : soilData.ph >
                    7.5
                  ? t.soilTreatment
                  : t.phNormal
            }
            icon={FlaskConical}
            iconClass="bg-violet-100/70 text-violet-700"
            warning={
              soilData.ph < 6 ||
              soilData.ph > 7.5
            }
          />

          {/* NPK */}

          <NPKCard />
        </motion.section>

        {/* =================================================
            SOIL HEALTH + DEVICE
        ================================================= */}

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
            duration: 0.6,
          }}
          className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          <SoilHealthCard
            score={soilHealth}
          />

          <SensorStatus />
        </motion.section>

        {/* =================================================
            QUICK DETAILS
        ================================================= */}

        <div className="mt-8 mb-4">
          <h2 className="text-xl font-bold text-slate-800">
            {t.moreAboutSoil}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {
              t.additionalSoilInformation
            }
          </p>
        </div>

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
            duration: 0.6,
          }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >

          {/* EC */}

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {
                    t.soilSaltLevel
                  }
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {soilData.ec}

                  <span className="ml-1 text-sm font-normal text-slate-500">
                    mS/cm
                  </span>
                </p>
              </div>

              <div className="rounded-2xl bg-blue-100/70 p-3">
                <Gauge className="h-6 w-6 text-blue-700" />
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-600">
              {t.ecDescription}
            </p>
          </GlassCard>

          {/* Average nutrients */}

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {
                    t.nutrientHealth
                  }
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {Math.round(
                    (soilData.nitrogen +
                      soilData.phosphorus +
                      soilData.potassium) /
                      3
                  )}

                  <span className="ml-1 text-sm font-normal text-slate-500">
                    {t.average}
                  </span>
                </p>
              </div>

              <div className="rounded-2xl bg-green-100/70 p-3">
                <Leaf className="h-6 w-6 text-green-700" />
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-600">
              {
                t.averageNutrientReading
              }
            </p>
          </GlassCard>

          {/* Monitoring */}

          <GlassCard className="p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {
                    t.fieldMonitoring
                  }
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  24/7
                </p>
              </div>

              <div className="rounded-2xl bg-yellow-100/70 p-3">
                <Sun className="h-6 w-6 text-yellow-700" />
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-600">
              {
                t.continuousMonitoring
              }
            </p>
          </GlassCard>
        </motion.section>

        {/* =================================================
            WHAT YOU CAN DO
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.6,
          }}
          className="
            mt-6
            overflow-hidden
            rounded-3xl
            border border-white/65
            bg-white/[0.28]
            p-6
            backdrop-blur-2xl
            shadow-[0_12px_35px_rgba(60,70,80,0.12)]
            sm:p-7
          "
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-emerald-100/80
              "
            >
              <Beaker className="h-7 w-7 text-emerald-700" />
            </motion.div>

            <div className="flex-1">

              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                {t.whatYouCanDo}
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-800">
                {
                  recommendation.title
                }
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {
                  recommendation.text
                }
              </p>
            </div>

            <motion.div
              whileHover={{
                x: 4,
              }}
              className="flex items-center gap-2 text-sm font-medium text-emerald-700"
            >
              {t.viewDetails}

              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.section>

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
          transition={{
            delay: 0.8,
          }}
          className="
            mt-8
            flex
            flex-col
            items-center
            justify-between
            gap-3
            border-t
            border-white/50
            pt-5
            text-xs
            text-slate-500
            sm:flex-row
          "
        >
          <p>
            {t.krushiBandhu} •{" "}
            {t.soilMonitoringSystem}
          </p>

          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                soilData.connected
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
            />

            {soilData.connected
              ? t.fieldDeviceOperational
              : t.connectionUnavailable}
          </div>
        </motion.div>
      </div>
    </main>
  );
}