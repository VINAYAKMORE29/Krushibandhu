"use client";

import { useMemo, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {useState, useEffect} from "react";

import {
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
   TYPES
========================================================= */

type SoilData = {
  moisture: number;
  temperature: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ec: number;
  connected: boolean;
};

/* =========================================================
   DEMO SENSOR DATA
   Later you can replace this with ESP32/API data
========================================================= */


const soilData: SoilData = {
  moisture: 38,
  temperature: 27.4,
  ph: 5.7,
  nitrogen: 72,
  phosphorus: 64,
  potassium: 78,
  ec: 1.2,
  connected: true,
};

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
   DATA CARD
========================================================= */

function DataCard({
  title,
  value,
  unit,
  description,
  icon: Icon,
  iconClass,
  warning = false,
}: {
  title: string;
  value: string | number;
  unit?: string;
  description: string;
  icon: React.ElementType;
  iconClass: string;
  warning?: boolean;
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600">{title}</p>

          <div className="mt-3 flex items-end gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">
              {value}
            </h2>

            {unit && (
              <span className="mb-1 text-sm text-slate-500">
                {unit}
              </span>
            )}
          </div>
        </div>

        <motion.div
          whileHover={{ rotate: 8, scale: 1.08 }}
          className={`rounded-2xl p-3 ${iconClass}`}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        {warning ? (
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        )}

        <p className="text-xs text-slate-600">{description}</p>
      </div>
    </GlassCard>
  );
}

/* =========================================================
   NPK CARD
========================================================= */

function NPKCard() {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600">NPK Levels</p>

          <p className="mt-2 text-sm text-slate-500">
            Nutrient concentration
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-100/70 p-3">
          <Sprout className="h-6 w-6 text-emerald-700" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/60 bg-white/[0.30] p-3 text-center backdrop-blur-xl">
          <p className="text-xs text-slate-500">N</p>

          <p className="mt-1 text-xl font-bold text-slate-800">
            {soilData.nitrogen}
          </p>

          <p className="text-[10px] text-slate-500">mg/kg</p>
        </div>

        <div className="rounded-2xl border border-white/60 bg-white/[0.30] p-3 text-center backdrop-blur-xl">
          <p className="text-xs text-slate-500">P</p>

          <p className="mt-1 text-xl font-bold text-slate-800">
            {soilData.phosphorus}
          </p>

          <p className="text-[10px] text-slate-500">mg/kg</p>
        </div>

        <div className="rounded-2xl border border-white/60 bg-white/[0.30] p-3 text-center backdrop-blur-xl">
          <p className="text-xs text-slate-500">K</p>

          <p className="mt-1 text-xl font-bold text-slate-800">
            {soilData.potassium}
          </p>

          <p className="text-[10px] text-slate-500">mg/kg</p>
        </div>
      </div>
    </GlassCard>
  );
}

/* =========================================================
   HEALTH RING
========================================================= */

function SoilHealthCard({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <GlassCard className="p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">
            Overall Condition
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-800">
            Soil Health
          </h2>
        </div>

        <div className="rounded-2xl bg-emerald-100/70 p-3">
          <Leaf className="h-6 w-6 text-emerald-700" />
        </div>
      </div>

      <div className="mt-7 flex items-center gap-7">
        <div className="relative h-32 w-32 shrink-0">
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

            <span className="text-[10px] text-slate-500">
              HEALTH
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-slate-800">
              {score >= 80
                ? "Excellent condition"
                : score >= 60
                  ? "Good condition"
                  : "Needs attention"}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-600">
              Based on moisture, pH, temperature and nutrient readings.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-700">
            <Activity className="h-4 w-4" />
            Live soil analysis
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
  return (
    <GlassCard className="p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">Hardware</p>

          <h2 className="mt-1 text-2xl font-bold text-slate-800">
            Sensor Status
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

      <div className="mt-7 flex items-center gap-4">
        <div className="relative">
          <span
            className={`block h-3 w-3 rounded-full ${
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
          <p className="font-medium text-slate-800">
            {soilData.connected
              ? "Device Connected"
              : "Device Offline"}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            ESP32 soil monitoring unit
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/60 bg-white/[0.30] p-4 backdrop-blur-xl">
          <p className="text-xs text-slate-500">Connection</p>

          <p className="mt-1 text-sm text-emerald-700">
            Stable
          </p>
        </div>

        <div className="rounded-2xl border border-white/60 bg-white/[0.30] p-4 backdrop-blur-xl">
          <p className="text-xs text-slate-500">Data Source</p>

          <p className="mt-1 text-sm text-slate-700">
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
    const [username, setUsername] = useState("username");

useEffect(() => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    setUsername(storedUsername);
  }
}, []);
  /* =======================================================
     WARNINGS
  ======================================================= */

  const warnings = useMemo(() => {
    const result: string[] = [];

    if (soilData.moisture < 40) {
      result.push(
        `Soil moisture is low at ${soilData.moisture}%. Irrigation may be required.`
      );
    }

    if (soilData.moisture > 80) {
      result.push(
        `Soil moisture is high at ${soilData.moisture}%. Check for overwatering.`
      );
    }

    if (soilData.ph < 6) {
      result.push(
        `Soil pH is acidic at ${soilData.ph}. Consider soil pH correction.`
      );
    }

    if (soilData.ph > 7.5) {
      result.push(
        `Soil pH is alkaline at ${soilData.ph}. Consider appropriate soil treatment.`
      );
    }

    if (soilData.temperature > 35) {
      result.push(
        `Soil temperature is high at ${soilData.temperature}°C.`
      );
    }

    if (soilData.ec > 2.5) {
      result.push(
        `Electrical conductivity is high at ${soilData.ec} mS/cm. Salt concentration may require attention.`
      );
    }

    return result;
  }, []);

  /* =======================================================
     SOIL HEALTH SCORE
  ======================================================= */

  const soilHealth = useMemo(() => {
    let score = 100;

    if (soilData.moisture < 40 || soilData.moisture > 80) {
      score -= 15;
    }

    if (soilData.ph < 6 || soilData.ph > 7.5) {
      score -= 20;
    }

    if (soilData.temperature > 35) {
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

  const recommendation = useMemo(() => {
    if (soilData.ph < 6) {
      return {
        title: "Correct soil pH",
        text: "The soil is acidic. Consider suitable soil amendments based on your crop and soil test recommendations.",
      };
    }

    if (soilData.moisture < 40) {
      return {
        title: "Irrigation recommended",
        text: "Soil moisture is below the preferred range. Consider irrigation according to crop requirements.",
      };
    }

    if (soilData.moisture > 80) {
      return {
        title: "Check irrigation",
        text: "Soil moisture is relatively high. Check drainage and irrigation frequency.",
      };
    }

    return {
      title: "Soil condition looks stable",
      text: "Continue monitoring moisture, pH and nutrient levels regularly.",
    };
  }, []);

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
      {/* ===================================================
          SOFT GLASS BACKGROUND EFFECTS
      =================================================== */}

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

      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">

        {/* =================================================
            WARNING
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
                mb-8
                rounded-3xl
                border border-amber-300/70
                bg-amber-50/60
                p-5
                backdrop-blur-2xl
                shadow-[0_8px_35px_rgba(80,80,60,0.10)]
              "
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{
                    rotate: [0, -5, 5, 0],
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
                  <h3 className="font-semibold text-amber-800">
                    Soil Attention Required
                  </h3>

                  <div className="mt-2 space-y-1">
                    {warnings.map((warning, index) => (
                      <motion.p
                        key={warning}
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: index * 0.1,
                        }}
                        className="text-sm text-slate-600"
                      >
                        • {warning}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            HEADER
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
          className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-xl bg-emerald-100/80 p-2">
                <Sprout className="h-5 w-5 text-emerald-700" />
              </div>

              <span className="text-sm font-medium text-emerald-700">
                Soil Monitoring Dashboard
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Welcome back,{username} 👋
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Monitor your soil condition, nutrients and sensor status
              from one place.
            </p>
          </div>

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              flex
              items-center
              gap-2
              self-start
              rounded-2xl
              border border-white/70
              bg-white/55
              px-4
              py-3
              text-sm
              text-slate-700
              backdrop-blur-xl
              shadow-[0_8px_25px_rgba(60,70,80,0.10)]
              transition
              hover:bg-white/75
              sm:self-auto
            "
          >
            <RefreshCw className="h-4 w-4" />
            Refresh readings
          </motion.button>
        </motion.header>

        {/* =================================================
            DATA CARDS
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
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <DataCard
            title="Soil Moisture"
            value={soilData.moisture}
            unit="%"
            description={
              soilData.moisture < 40
                ? "Moisture is below preferred level"
                : "Moisture level is stable"
            }
            icon={Droplets}
            iconClass="bg-cyan-100/70 text-cyan-700"
            warning={soilData.moisture < 40}
          />

          <DataCard
            title="Temperature"
            value={soilData.temperature}
            unit="°C"
            description={
              soilData.temperature > 35
                ? "Temperature is high"
                : "Temperature is within range"
            }
            icon={Thermometer}
            iconClass="bg-orange-100/70 text-orange-700"
            warning={soilData.temperature > 35}
          />

          <DataCard
            title="Soil pH"
            value={soilData.ph}
            description={
              soilData.ph < 6
                ? "Soil is acidic"
                : soilData.ph > 7.5
                  ? "Soil is alkaline"
                  : "pH is within range"
            }
            icon={FlaskConical}
            iconClass="bg-violet-100/70 text-violet-700"
            warning={soilData.ph < 6 || soilData.ph > 7.5}
          />

          <NPKCard />
        </motion.section>

        {/* =================================================
            SECOND ROW
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
          className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          <SoilHealthCard score={soilHealth} />

          <SensorStatus />
        </motion.section>

        {/* =================================================
            EXTRA SENSOR INFORMATION
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
          className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  Electrical Conductivity
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

            <p className="mt-5 text-xs text-slate-600">
              Indicates dissolved salts and overall conductivity of the soil.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  Nutrients
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {Math.round(
                    (soilData.nitrogen +
                      soilData.phosphorus +
                      soilData.potassium) /
                      3
                  )}
                  <span className="ml-1 text-sm font-normal text-slate-500">
                    avg
                  </span>
                </p>
              </div>

              <div className="rounded-2xl bg-green-100/70 p-3">
                <Leaf className="h-6 w-6 text-green-700" />
              </div>
            </div>

            <p className="mt-5 text-xs text-slate-600">
              Average nutrient reading from nitrogen, phosphorus and
              potassium.
            </p>
          </GlassCard>

          <GlassCard className="p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  Monitoring
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  24/7
                </p>
              </div>

              <div className="rounded-2xl bg-yellow-100/70 p-3">
                <Sun className="h-6 w-6 text-yellow-700" />
              </div>
            </div>

            <p className="mt-5 text-xs text-slate-600">
              Continuous monitoring can help identify soil changes early.
            </p>
          </GlassCard>
        </motion.section>

        {/* =================================================
            RECOMMENDATION
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
            mt-5
            overflow-hidden
            rounded-3xl
            border border-white/65
            bg-white/[0.28]
            p-7
            backdrop-blur-2xl
            shadow-[0_12px_35px_rgba(60,70,80,0.12)]
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
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80"
            >
              <Beaker className="h-7 w-7 text-emerald-700" />
            </motion.div>

            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-700">
                Recommendation
              </p>

              <h2 className="mt-1 text-xl font-semibold text-slate-800">
                {recommendation.title}
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {recommendation.text}
              </p>
            </div>

            <motion.div
              whileHover={{
                x: 4,
              }}
              className="flex items-center gap-2 text-sm text-emerald-700"
            >
              View details
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.section>

        {/* =================================================
            FOOTER STATUS
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
          <p>Soil monitoring system • ESP32</p>

          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                soilData.connected
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
            />

            {soilData.connected
              ? "System operational"
              : "Connection unavailable"}
          </div>
        </motion.div>
      </div>
    </main>
  );
}