"use client";

import SoilChatbot from "@/app/Components/SoilStudy/SoilChatbot";
import { soilData } from "@/app/soil/soilData";
import { useLanguage } from "@/app/translations/LanguageContext";

export default function SoilStudyPage() {
  const { t } = useLanguage();

  return (
    <main
      className="
        min-h-screen px-4 md:px-8 pt-28 pb-20
        bg-cover bg-center bg-fixed
      "
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1
            className="
              text-3xl md:text-4xl
              font-bold text-black
            "
          >
            {t.soilStudy}
          </h1>

          <p className="mt-2 text-gray-600">
            {t.soilStudySubtitle}
          </p>
        </div>

        <SoilChatbot soilData={soilData} />
      </div>
    </main>
  );
}