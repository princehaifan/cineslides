import React from 'react';
import { SlideState, Setters } from '../types';
import { INITIAL_STATE } from '../hooks/useCineSlidesState';
import { SetupControls } from './SetupControls';
import { TextControls } from './TextControls';
import { EffectsControls } from './EffectsControls';
import { WatermarkControls } from './WatermarkControls';

interface ControlsPanelProps {
  state: SlideState;
  setters: Setters;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ state, setters }) => {
  return (
    <div className="space-y-1">
      <SetupControls 
        state={state} 
        setters={setters}
        onReset={() => {
          setters.setAspectRatio(INITIAL_STATE.aspectRatio);
          setters.setBackgroundImage(INITIAL_STATE.backgroundImage);
        }}
      />

      <TextControls
        title="Primary Text"
        style={state.textStyles.primary}
        setStyle={(s) => setters.setTextStyle('primary', s)}
        onReset={() => setters.setTextStyle('primary', INITIAL_STATE.textStyles.primary)}
      />

      <TextControls
        title="Secondary Text"
        style={state.textStyles.secondary}
        setStyle={(s) => setters.setTextStyle('secondary', s)}
        onReset={() => setters.setTextStyle('secondary', INITIAL_STATE.textStyles.secondary)}
      />
      
      <EffectsControls 
        effects={state.effects} 
        setEffects={setters.setEffects} 
        onReset={() => setters.setEffects(INITIAL_STATE.effects)}
      />

      <WatermarkControls
        watermark={state.watermark}
        setWatermark={setters.setWatermark}
        onReset={() => setters.setWatermark(INITIAL_STATE.watermark)}
      />
    </div>
  );
};
