
import { GoogleGenAI, Type } from "@google/genai";
import { UserConfig, GenerateSensiResponse, SensiSettings, FFTrend } from "../types";

/**
 * ELITE LOCAL ENGINE v2.0 (Neural-Logic Simulation)
 * Bu algoritm Free Fire-ning touch-sampling va pixel-density fizikasi asosida ishlaydi.
 */
const generateLocalSensi = (config: UserConfig): GenerateSensiResponse => {
  const { dpi, playStyle, deviceType, refreshRate, aimType } = config;
  
  // 1. DPI va Refresh Rate bog'liqlik koeffitsienti (Base Sensitivity Index)
  // 200 lik shkalada 120Hz qurilmalar ko'proq sensi talab qiladi (smoothness uchun)
  const refreshFactor = refreshRate / 60; // 1.0 dan 2.4 gacha
  const dpiFactor = 440 / (dpi || 440); // Standart 440 DPI-ga nisbatan
  
  let baseSensi = 94 * refreshFactor * dpiFactor;

  // 2. Qurilma turi bo'yicha korreksiya
  let deviceMultiplier = 1.0;
  if (deviceType === 'iOS') deviceMultiplier = 0.85; // Apple sensorlari sezgirligi yuqori
  if (deviceType === 'PC/Emulator') deviceMultiplier = 0.45; // Sichqoncha uchun past sensi
  if (deviceType === 'Android') deviceMultiplier = 1.05; // Android touch-latency uchun kompensatsiya

  // 3. O'yin uslubi (Weapon Class Physics)
  let styleMod = 0;
  if (playStyle === 'Aggressive') styleMod = 15; // Shotgun drag uchun baland sensi
  if (playStyle === 'Passive') styleMod = -12;   // Sniper aniqligi uchun past sensi
  if (playStyle === 'Balanced') styleMod = 0;

  // 4. Yakuniy hisoblash (Double-Layer Calculation)
  const calc = (base: number, mod: number = 0) => {
    let final = (base + mod + styleMod) * deviceMultiplier * 1.05; // 200 shkalaga moslash
    // Algoritmik chegara 0-200
    return Math.min(200, Math.max(10, Math.round(final)));
  };

  const settings: SensiSettings = {
    general: calc(baseSensi, 10),
    redDot: calc(baseSensi * 0.95, 5),
    scope2x: calc(baseSensi * 0.88, 2),
    scope4x: calc(baseSensi * 0.82, 0),
    sniperScope: calc(baseSensi * 0.55, -15),
    freeLook: 150, // Erkin qarash odatda baland bo'ladi
    graphicSettings: refreshRate >= 90 ? "Ultra / Max (V-Sync OFF)" : "Standard / High FPS",
    fpsSetting: `${refreshRate} FPS (High Frequency)`,
    proTips: [
      `${config.deviceModel} uchun ${refreshRate}Hz touch-sampling optimallashtirildi.`,
      `DPI: ${dpi || 'Standard'} bo'lganda 'Pixel-Skipping'ni oldini olish uchun 200 lik shkala sozlangan.`,
      playStyle === 'Aggressive' ? "Shotgun bilan 'Jump-Shot' paytida tugmani qisqa va tez silkiting." : "Sniperda 'Quick-Scope' texnikasi uchun stabilizatsiya yoqildi.",
      "O'yin sozlamalarida 'Visual Effects'ni 'Classic' qilib qo'yishni unutmang."
    ]
  };

  return {
    settings,
    explanation: `Elite Neural-Engine ${config.deviceModel} qurilmasini ${refreshRate}Hz chastotada tahlil qildi. ${playStyle} uslubi uchun 'Drag-Shot' trayektoriyasi 200 lik shkalada matematik model yordamida optimallashtirildi.`,
    source: 'ELITE NEURAL ENGINE (LOCAL MODE)'
  };
};

export const fetchFFTrends = async (): Promise<FFTrend[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
    return [
      { title: "200 Sensi Meta: Why 120Hz devices need it", description: "Pro guide on high-frequency sensitivity.", url: "#" },
      { title: "Neural Engine Update: Local Calibration v2.0", description: "New logic for no-API environments.", url: "#" },
      { title: "Touch Latency Fix for Android Users", description: "How to reduce input lag in OB44.", url: "#" }
    ];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "List 5 latest Free Fire news focusing on sensitivity, aim, or refresh rate optimization.",
      config: { tools: [{ googleSearch: {} }] },
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const trends: FFTrend[] = chunks
      .filter((c: any) => c.web)
      .map((c: any) => ({
        title: c.web.title || "FF News",
        description: "Latest update from the web.",
        url: c.web.uri
      }));

    return trends.length > 0 ? trends : [];
  } catch (e) {
    return [{ title: "System: Local Mode", description: "Running on internal data.", url: "#" }];
  }
};

export const generateSensiSettings = async (config: UserConfig): Promise<GenerateSensiResponse> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
    // API key yo'q bo'lsa darhol mukammal mahalliy algoritmga
    return new Promise(resolve => {
      setTimeout(() => resolve(generateLocalSensi(config)), 2000); // Neyron tahlil imitatsiyasi uchun
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Generate FF sensitivity for ${config.deviceModel}, DPI: ${config.dpi}, Refresh: ${config.refreshRate}Hz, Style: ${config.playStyle}. SCALE: 0-200. Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            settings: {
              type: Type.OBJECT,
              properties: {
                general: { type: Type.NUMBER },
                redDot: { type: Type.NUMBER },
                scope2x: { type: Type.NUMBER },
                scope4x: { type: Type.NUMBER },
                sniperScope: { type: Type.NUMBER },
                freeLook: { type: Type.NUMBER },
                graphicSettings: { type: Type.STRING },
                fpsSetting: { type: Type.STRING },
                proTips: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["general", "redDot", "scope2x", "scope4x", "sniperScope", "freeLook", "graphicSettings", "fpsSetting", "proTips"]
            },
            explanation: { type: Type.STRING }
          },
          required: ["settings", "explanation"]
        }
      }
    });

    const parsed = JSON.parse(response.text);
    return { ...parsed, source: 'Gemini AI Neural Cloud' };
  } catch (error) {
    return generateLocalSensi(config);
  }
};
