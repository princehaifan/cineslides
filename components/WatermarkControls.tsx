import React from 'react';
import { WatermarkState } from '../types';
import { Accordion } from './Accordion';
import { ImageUploader } from './ImageUploader';
import { Slider } from './Slider';

interface WatermarkControlsProps {
    watermark: WatermarkState;
    setWatermark: (newMark: Partial<WatermarkState>) => void;
    onReset: () => void;
}

const ControlRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="grid grid-cols-2 items-center gap-4">
    <label className="text-sm font-medium text-gray-400 whitespace-nowrap">{label}</label>
    {children}
  </div>
);

export const WatermarkControls: React.FC<WatermarkControlsProps> = ({ watermark, setWatermark, onReset }) => {

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setWatermark({ image: e.target?.result as string });
      reader.readAsDataURL(file);
    } else {
      setWatermark({ image: null });
    }
  };

  return (
    <Accordion title="Watermark" onReset={onReset}>
        <div className="p-4 space-y-3">
        <ImageUploader label="Watermark" onFileSelect={handleFileSelect} />
        {watermark.image && (
            <>
            <ControlRow label="Size"><Slider min={1} max={50} step={1} value={watermark.size} onChange={(v) => setWatermark({ size: v })} /></ControlRow>
            <ControlRow label="Opacity"><Slider min={0} max={1} step={0.05} value={watermark.opacity} onChange={(v) => setWatermark({ opacity: v })} /></ControlRow>
            <ControlRow label="Position X"><Slider min={0} max={100} step={1} value={watermark.x} onChange={(v) => setWatermark({ x: v })} /></ControlRow>
            <ControlRow label="Position Y"><Slider min={0} max={100} step={1} value={watermark.y} onChange={(v) => setWatermark({ y: v })} /></ControlRow>
            </>
        )}
        </div>
    </Accordion>
  );
};
