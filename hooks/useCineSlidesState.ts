import { useState, useCallback } from 'react';
import { SlideState, Setters } from '../types';

export const INITIAL_STATE: SlideState = {
  backgroundImage: 'https://images.unsplash.com/photo-1504221507732-5246c045949b?q=80&w=2874&auto=format&fit=crop',
  aspectRatio: '3:4',
  textStyles: {
    primary: {
      id: 'primary',
      text: 'CINEMATIC',
      font: 'Bebas Neue',
      size: 12,
      color: '#FFFFFF',
      y: 40,
      x: 50,
      strokeWidth: 0,
      strokeColor: '#000000',
    },
    secondary: {
      id: 'secondary',
      text: 'Create stunning visuals',
      font: 'Inter',
      size: 4,
      color: '#FFFFFF',
      y: 55,
      x: 50,
      strokeWidth: 0,
      strokeColor: '#000000',
    },
  },
  effects: {
    backgroundBlur: 0,
    grainOpacity: 0.1,
    overlayColor: '#000000',
    overlayOpacity: 0.1,
    overlayBlendMode: 'overlay',
  },
  watermark: {
    image: null,
    size: 10,
    opacity: 0.7,
    x: 95,
    y: 95,
  },
};

export const useCineSlidesState = (): { state: SlideState; setters: Setters } => {
  const [state, setState] = useState<SlideState>(INITIAL_STATE);

  const setBackgroundImage = useCallback((image: string | null) => {
    setState(s => ({ ...s, backgroundImage: image }));
  }, []);

  const setAspectRatio = useCallback((ratio: string) => {
    setState(s => ({ ...s, aspectRatio: ratio }));
  }, []);

  const setTextStyle = useCallback((id: 'primary' | 'secondary', newStyle: Partial<SlideState['textStyles']['primary']>) => {
    setState(s => ({
      ...s,
      textStyles: {
        ...s.textStyles,
        [id]: { ...s.textStyles[id], ...newStyle },
      },
    }));
  }, []);

  const setEffects = useCallback((newEffects: Partial<SlideState['effects']>) => {
    setState(s => ({
      ...s,
      effects: { ...s.effects, ...newEffects },
    }));
  }, []);

  const setWatermark = useCallback((newMark: Partial<SlideState['watermark']>) => {
    setState(s => ({
      ...s,
      watermark: { ...s.watermark, ...newMark },
    }));
  }, []);

  return {
    state,
    setters: {
      setBackgroundImage,
      setAspectRatio,
      setTextStyle,
      setEffects,
      setWatermark,
    },
  };
};