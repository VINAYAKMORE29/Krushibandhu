"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Leaf,
  Thermometer,
  Wifi,
  Activity,
  Sprout,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { useMemo } from "react";

export default function HomePage() {
  // ============================================
  // SENSOR DATA
  // ============================================

  // Later replace this with your ESP32/API data
  const soilData = {
    moisture: 38,
    temperature: 27.4,
    ph: 5.7,

    nitrogen: 72,
    phosphorus: 64,
    potassium: 78,

    ec: 1.2,

    connected: true,
  };

  // ============================================
  // WARNING SYSTEM
  // ============================================

  const warnings = useMemo(() => {
    const result: {
      type: "warning" | "danger";
      message: string;
      recommendation: string;
    }[] = [];

    if (soilData.moisture < 40) {
      result.push({
        type: "warning",
        message: "Soil moisture is low.",
        recommendation:
          "Irrigation may be required.",
      });
    }

    if (soilData.moisture > 80) {
      result.push({
        type: "warning",
        message: "Soil moisture is high.",
        recommendation:
          "Avoid additional irrigation.",
      });
    }

    if (soilData.ph < 6) {
      result.push({
        type: "warning",
        message: "Soil pH is low.",
        recommendation:
          "The soil is acidic. Consider checking lime requirements.",
      });
    }

    if (soilData.ph > 7.5) {
      result.push({
        type: "warning",
        message: "Soil pH is high.",
        recommendation:
          "The soil is alkaline. Check nutrient availability.",
      });
    }

    if (soilData.temperature > 35) {
      result.push({
        type: "danger",
        message: "Soil temperature is high.",
        recommendation:
          "Monitor the field and maintain adequate moisture.",
      });
    }

    if (soilData.ec > 2.5) {
      result.push({
        type: "warning",
        message: "Soil salt level may be high.",
        recommendation:
          "Check electrical conductivity and irrigation conditions.",
      });
    }

    return result;
  }, [soilData]);

  // ============================================
  // SOIL HEALTH
  // ============================================

  const soilHealth = useMemo(() => {
    let score = 100;

    if (soilData.moisture < 40) score -= 10;
    if (soilData.moisture > 80) score -= 10;

    if (
      soilData.ph < 6 ||
      soilData.ph > 7.5
    ) {
      score -= 15;
    }

    if (soilData.temperature > 35) {
      score -= 15;
    }

    if (soilData.ec > 2.5) {
      score -= 15;
    }

    return Math.max(score, 0);
  }, [soilData]);

  // ============================================
  // STATUS
  // ============================================

  const soilStatus =
    warnings.length === 0
      ? "Good"
      : warnings.length === 1
      ? "Needs Attention"
      : "Needs Action";

  // ============================================
  // ANIMATION VARIANTS
  // ============================================

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 md:p-8">

      <div className="mx-auto max-w-7xl">

        {/* ======================================
            WARNING
        ====================================== */}

        <AnimatePresence mode="wait">
          {warnings.length > 0 && (
            <motion.div
              key="soil-warning"
              initial={{
                opacity: 0,
                y: -40,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -30,
                scale: 0.97,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="mb-6 rounded-3xl border border-yellow-200 bg-yellow-50 p-5 shadow-lg"
            >
              <div className="flex gap-4">

                {/* Animated warning icon */}

                <motion.div
                  animate={{
                    rotate: [0, -8, 8, -8, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                  }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700"
                >
                  <AlertTriangle size={24} />
                </motion.div>

                <div className="flex-1">

                  <h2 className="text-lg font-bold text-yellow-900">
                    Soil Warning
                  </h2>

                  <div className="mt-2 space-y-2">

                    {warnings.map(
                      (warning, index) => (
                        <motion.div
                          key={index}
                          initial={{
                            opacity: 0,
                            x: -15,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay:
                              0.15 +
                              index * 0.1,
                          }}
                        >
                          <p className="font-medium text-yellow-900">
                            {warning.message}
                          </p>

                          <p className="text-sm text-yellow-800">
                            {warning.recommendation}
                          </p>
                        </motion.div>
                      )
                    )}

                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================
            HEADER
        ====================================== */}

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
          className="mb-6"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm font-medium text-green-600">
                Welcome back
              </p>

              <h1 className="text-3xl font-bold text-gray-900">
                Soil Overview
              </h1>

              <p className="mt-1 text-gray-500">
                Here is the current condition of your soil.
              </p>
            </div>

            {/* Sensor connection */}

            <motion.div
              whileHover={{
                scale: 1.04,
              }}
              className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700"
            >
              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className="h-2.5 w-2.5 rounded-full bg-green-500"
              />

              <Wifi size={17} />

              {soilData.connected
                ? "Sensor Connected"
                : "Sensor Disconnected"}
            </motion.div>

          </div>
        </motion.section>

        {/* ======================================
            DATA CARDS
        ====================================== */}

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >

          <DataCard
            icon={<Droplets size={25} />}
            title="Soil Moisture"
            value={`${soilData.moisture}%`}
            status={
              soilData.moisture < 40
                ? "Low"
                : soilData.moisture > 80
                ? "High"
                : "Good"
            }
            warning={
              soilData.moisture < 40 ||
              soilData.moisture > 80
            }
          />

          <DataCard
            icon={
              <Thermometer size={25} />
            }
            title="Temperature"
            value={`${soilData.temperature}°C`}
            status={
              soilData.temperature > 35
                ? "High"
                : "Normal"
            }
            warning={
              soilData.temperature > 35
            }
          />

          <DataCard
            icon={
              <FlaskConical size={25} />
            }
            title="Soil pH"
            value={`${soilData.ph}`}
            status={
              soilData.ph < 6
                ? "Acidic"
                : soilData.ph > 7.5
                ? "Alkaline"
                : "Optimal"
            }
            warning={
              soilData.ph < 6 ||
              soilData.ph > 7.5
            }
          />

          <DataCard
            icon={<Leaf size={25} />}
            title="NPK"
            value={`${soilData.nitrogen}/${soilData.phosphorus}/${soilData.potassium}`}
            status="Good"
            warning={false}
          />

        </motion.section>

        {/* ======================================
            SOIL HEALTH + SENSOR
        ====================================== */}

        <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Soil Health */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.5,
            }}
            whileHover={{
              y: -4,
              boxShadow:
                "0 20px 35px rgba(0,0,0,0.08)",
            }}
            className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
          >

            <div className="flex items-center gap-3">

              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="rounded-2xl bg-green-100 p-3 text-green-700"
              >
                <Sprout size={26} />
              </motion.div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Soil Health
                </h2>

                <p className="text-sm text-gray-500">
                  Overall soil condition
                </p>
              </div>

            </div>

            <div className="mt-6 flex items-center gap-6">

              {/* Health circle */}

              <div className="relative flex h-28 w-28 items-center justify-center">

                <svg
                  className="absolute h-28 w-28 -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-green-100"
                  />

                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="text-green-500"
                    initial={{
                      strokeDasharray: "0 264",
                    }}
                    animate={{
                      strokeDasharray: `${
                        (soilHealth / 100) *
                        264
                      } 264`,
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.7,
                      ease: "easeOut",
                    }}
                  />
                </svg>

                <div className="text-center">

                  <motion.p
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.9,
                    }}
                    className="text-2xl font-bold text-green-700"
                  >
                    {soilHealth}%
                  </motion.p>

                  <p className="text-xs text-gray-500">
                    Health
                  </p>

                </div>

              </div>

              <div>

                <p className="text-lg font-semibold text-gray-900">
                  {soilStatus}
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {warnings.length === 0
                    ? "Your soil parameters are currently within the expected range."
                    : "Some soil parameters need your attention."}
                </p>

              </div>

            </div>

          </motion.div>

          {/* ==================================
              SENSOR STATUS
          ================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.6,
            }}
            whileHover={{
              y: -4,
              boxShadow:
                "0 20px 35px rgba(0,0,0,0.08)",
            }}
            className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
          >

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
                <Activity size={26} />
              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Sensor Status
                </h2>

                <p className="text-sm text-gray-500">
                  Current device connection
                </p>

              </div>

            </div>

            <div className="mt-6 space-y-4">

              <StatusRow
                title="Soil Sensor"
                value={
                  soilData.connected
                    ? "Connected"
                    : "Disconnected"
                }
                green={soilData.connected}
              />

              <StatusRow
                title="Electrical Conductivity"
                value={`${soilData.ec} mS/cm`}
                green
              />

              <StatusRow
                title="Sensor Activity"
                value="Active"
                green
              />

            </div>

          </motion.div>

        </section>

        {/* ======================================
            RECOMMENDATION
        ====================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.8,
          }}
          whileHover={{
            scale: 1.01,
          }}
          className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-lg"
        >

          <div className="flex gap-4">

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="h-fit rounded-2xl bg-blue-100 p-3 text-blue-700"
            >
              <CheckCircle2 size={25} />
            </motion.div>

            <div>

              <h2 className="text-lg font-bold text-blue-900">
                Recommendation
              </h2>

              <p className="mt-2 leading-6 text-blue-800">

                {soilData.moisture < 40
                  ? "Consider irrigating the field and monitor soil moisture after irrigation."
                  : soilData.ph < 6
                  ? "The soil is acidic. Consider a soil test before applying any pH correction."
                  : "Current soil conditions look good. Continue regular monitoring."}

              </p>

            </div>

          </div>

        </motion.section>

      </div>
    </main>
  );
}

// ======================================================
// DATA CARD
// ======================================================

function DataCard({
  icon,
  title,
  value,
  status,
  warning,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  status: string;
  warning: boolean;
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
          scale: 0.96,
        },

        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.45,
          },
        },
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: {
          duration: 0.2,
        },
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`rounded-3xl border bg-white/80 p-5 shadow-lg backdrop-blur-xl ${
        warning
          ? "border-yellow-200"
          : "border-white/70"
      }`}
    >

      <div className="flex items-start justify-between">

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.1,
          }}
          className={`rounded-2xl p-3 ${
            warning
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {icon}
        </motion.div>

        {warning ? (
          <motion.div
            animate={{
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <AlertTriangle
              size={20}
              className="text-yellow-600"
            />
          </motion.div>
        ) : (
          <CheckCircle2
            size={20}
            className="text-green-500"
          />
        )}

      </div>

      <p className="mt-5 text-sm font-medium text-gray-500">
        {title}
      </p>

      <div className="mt-1 flex items-end justify-between">

        <motion.p
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="text-2xl font-bold text-gray-900"
        >
          {value}
        </motion.p>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            warning
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {status}
        </span>

      </div>

    </motion.div>
  );
}

// ======================================================
// STATUS ROW
// ======================================================

function StatusRow({
  title,
  value,
  green,
}: {
  title: string;
  value: string;
  green: boolean;
}) {
  return (
    <motion.div
      whileHover={{
        x: 4,
      }}
      className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
    >
      <span className="text-sm text-gray-600">
        {title}
      </span>

      <span
        className={`flex items-center gap-2 font-semibold ${
          green
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        <motion.span
          animate={
            green
              ? {
                  scale: [1, 1.25, 1],
                }
              : undefined
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className={`h-2.5 w-2.5 rounded-full ${
            green
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />

        {value}
      </span>
    </motion.div>
  );
}