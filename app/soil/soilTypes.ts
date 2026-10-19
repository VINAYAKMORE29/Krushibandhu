export type SoilData = {
  moisture: number;
  temperature: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ec: number;
  lightIntensity: number;
  connected: boolean;
};

export type SoilChatRequest = {
  message: string;
  soilData: SoilData;
  crop?: string;
  language?: "en" | "hi" | "mr";
};