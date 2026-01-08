
export type DeviceType = 'Android' | 'iOS' | 'PC/Emulator';
export type PlayStyle = 'Aggressive' | 'Passive' | 'Balanced';
export type AimType = 'Default' | 'Precision' | 'Full Control';
export type RefreshRate = 60 | 90 | 120 | 144;

export interface UserConfig {
  deviceModel: string;
  deviceType: DeviceType;
  dpi: number;
  playStyle: PlayStyle;
  aimType: AimType;
  refreshRate: RefreshRate;
}

export interface SensiSettings {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniperScope: number;
  freeLook: number;
  graphicSettings: string;
  fpsSetting: string;
  proTips: string[];
}

export interface GenerateSensiResponse {
  settings: SensiSettings;
  explanation: string;
  source?: string;
  groundingUrls?: { title: string; uri: string }[];
}

export interface FFTrend {
  title: string;
  description: string;
  url: string;
}

export interface ProPreset {
  name: string;
  device: string;
  specialty: string;
  image: string;
  settings: {
    general: number;
    redDot: number;
    scope2x: number;
    scope4x: number;
    sniperScope: number;
  };
}
