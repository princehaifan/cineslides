import React from 'react';
import { EffectsState } from '../types';
import { BLEND_MODES } from '../constants';
import { Accordion } from './Accordion';
import { Slider } from './Slider';

interface EffectsControlsProps {
    effects: EffectsState;
    setEffects: (newEffects: Partial<EffectsState>) => void;
    onReset: () => void;
}

const ControlRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="grid grid-cols-2 items-center gap-4">
    <label className="text-sm font-medium text-gray-400 whitespace-nowrap">{label}</label>
    {children}
  </div>
);

export const EffectsControls: React.FC<EffectsControlsProps> = ({ effects, setEffects, onReset }) => {
  return (
    <Accordion title="Effects" onReset={onReset}>
        <div className="p-4 space-y-3">
        <ControlRow label="Blur"><Slider min={0} max={20} step={0.5} value={effects.backgroundBlur} onChange={(v) => setEffects({ backgroundBlur: v })} /></ControlRow>
        <ControlRow label="Grain"><Slider min={0} max={1} step={0.05} value={effects.grainOpacity} onChange={(v) => setEffects({ grainOpacity: v })} /></ControlRow>
        <ControlRow label="Overlay Color">
            <input
            type="color"
            value={effects.overlayColor}
            onChange={(e) => setEffects({ overlayColor: e.target.value })}
            className="w-full h-9 p-0 bg-gray-700 border-none rounded cursor-pointer"
            />
        </ControlRow>
        <ControlRow label="Overlay Opacity"><Slider min={0} max={1} step={0.05} value={effects.overlayOpacity} onChange={(v) => setEffects({ overlayOpacity: v })} /></ControlRow>
        <ControlRow label="Blend Mode">
            <select
            value={effects.overlayBlendMode}
            onChange={(e) => setEffects({ overlayBlendMode: e.target.value })}
            className="block w-full bg-gray-700 border-none rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-white"
            >
            {BLEND_MODES.map(mode => <option key={mode} value={mode}>{mode}</option>)}
            </select>
        </ControlRow>
        </div>
    </Accordion>
  );
};
