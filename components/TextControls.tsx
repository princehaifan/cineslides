import React, { useState, useCallback } from 'react';
import { TextStyle } from '../types';
import { FONT_OPTIONS } from '../constants';
import { Accordion } from './Accordion';
import { Slider } from './Slider';
import { suggestQuote } from '../services/geminiService';
import { WandIcon } from './Icons';

interface TextControlsProps {
  title: string;
  style: TextStyle;
  setStyle: (newStyle: Partial<TextStyle>) => void;
  onReset: () => void;
}

const ControlRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="grid grid-cols-2 items-center gap-4">
    <label className="text-sm font-medium text-gray-400 whitespace-nowrap">{label}</label>
    {children}
  </div>
);

export const TextControls: React.FC<TextControlsProps> = ({ title, style, setStyle, onReset }) => {
  const [isSuggesting, setIsSuggesting] = useState(false);
  
  const handleSuggest = useCallback(async () => {
    setIsSuggesting(true);
    const quote = await suggestQuote();
    setStyle({ text: quote });
    setIsSuggesting(false);
  }, [setStyle]);

  return (
    <Accordion title={title} onReset={onReset}>
      <div className="p-4 space-y-4">
        <div className="relative">
          <textarea
            rows={3}
            value={style.text}
            onChange={(e) => setStyle({ text: e.target.value })}
            className="block w-full bg-gray-700 border-none rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-white pr-10"
            placeholder="Type or generate text..."
          />
          <button
            onClick={handleSuggest}
            disabled={isSuggesting}
            className="absolute top-2 right-2 p-1.5 bg-gray-600 hover:bg-indigo-500 rounded-md disabled:bg-gray-600 disabled:cursor-wait transition-colors"
            title="Suggest a quote with AI"
          >
            <WandIcon />
          </button>
        </div>
        
        <ControlRow label="Font">
          <select
            value={style.font}
            onChange={(e) => setStyle({ font: e.target.value })}
            className="block w-full bg-gray-700 border-none rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-white"
          >
            {FONT_OPTIONS.map(font => <option key={font.name} value={font.name}>{font.name}</option>)}
          </select>
        </ControlRow>
        
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">Color</label>
                <input
                    type="color"
                    value={style.color}
                    onChange={(e) => setStyle({ color: e.target.value })}
                    className="w-full h-9 p-0 bg-gray-700 border-none rounded cursor-pointer"
                />
            </div>
             <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">Stroke</label>
                <input
                    type="color"
                    value={style.strokeColor}
                    onChange={(e) => setStyle({ strokeColor: e.target.value })}
                    className="w-full h-9 p-0 bg-gray-700 border-none rounded cursor-pointer"
                />
            </div>
        </div>

        <ControlRow label="Stroke Width"><Slider min={0} max={10} step={0.5} value={style.strokeWidth} onChange={(v) => setStyle({ strokeWidth: v })} /></ControlRow>
        <ControlRow label="Size"><Slider min={1} max={20} step={0.5} value={style.size} onChange={(v) => setStyle({ size: v })} /></ControlRow>
        <div className="text-xs text-center text-gray-500 pt-2">Drag text on canvas to position</div>
      </div>
    </Accordion>
  );
}