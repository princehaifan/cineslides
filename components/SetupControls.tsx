import React from 'react';
import { SlideState, Setters } from '../types';
import { ASPECT_RATIOS } from '../constants';
import { Accordion } from './Accordion';
import { ImageUploader } from './ImageUploader';

interface SetupControlsProps {
    state: SlideState;
    setters: Setters;
    onReset: () => void;
}

export const SetupControls: React.FC<SetupControlsProps> = ({ state, setters, onReset }) => {

  const handleFileSelect = (setter: (url: string | null) => void) => (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setter(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setter(null);
    }
  };

  return (
    <Accordion title="Setup" defaultOpen onReset={onReset}>
        <div className="p-4 space-y-4">
        <ImageUploader label="Background" onFileSelect={handleFileSelect(setters.setBackgroundImage)} />
        <div className="grid grid-cols-2 items-center gap-4">
            <label className="text-sm font-medium text-gray-400">Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
            {Object.keys(ASPECT_RATIOS).map(ratio => (
                <button 
                key={ratio} 
                onClick={() => setters.setAspectRatio(ratio)}
                className={`px-2 py-1.5 text-xs rounded-md transition-colors ${state.aspectRatio === ratio ? 'bg-indigo-600 text-white font-semibold' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                >
                {ratio}
                </button>
            ))}
            </div>
        </div>
        </div>
    </Accordion>
  );
};
