
export interface TextStyle {
  id: 'primary' | 'secondary';
  text: string;
  font: string;
  size: number;
  color: string;
  y: number;
  x: number;
  strokeWidth: number;
  strokeColor: string;
}

export interface EffectsState {
  backgroundBlur: number;
  grainOpacity: number;
  overlayColor: string;
  overlayOpacity: number;
  overlayBlendMode: string;
}

export interface WatermarkState {
  image: string | null;
  size: number;
  opacity: number;
  x: number;
  y: number;
}

export interface SlideState {
  backgroundImage: string | null;
  aspectRatio: string;
  textStyles: {
    primary: TextStyle;
    secondary: TextStyle;
  };
  effects: EffectsState;
  watermark: WatermarkState;
}

export interface Setters {
  setBackgroundImage: (image: string | null) => void;
  setAspectRatio: (ratio: string) => void;
  setTextStyle: (id: 'primary' | 'secondary', newStyle: Partial<TextStyle>) => void;
  setEffects: (newEffects: Partial<EffectsState>) => void;
  setWatermark: (newMark: Partial<WatermarkState>) => void;
}
