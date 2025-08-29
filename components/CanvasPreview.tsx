import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { SlideState, Setters, TextStyle } from '../types';
import { FONT_OPTIONS, ASPECT_RATIOS } from '../constants';

interface CanvasPreviewProps {
  state: SlideState;
  setters: Setters;
}

const DraggableText: React.FC<{
  id: 'primary' | 'secondary';
  textStyle: TextStyle;
  fontStyle: React.CSSProperties;
  canvasRef: React.RefObject<HTMLDivElement>;
  setTextStyle: (id: 'primary' | 'secondary', newStyle: Partial<TextStyle>) => void;
}> = ({ id, textStyle, fontStyle, canvasRef, setTextStyle }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, elemX: 0, elemY: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!textRef.current || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const elemRect = textRef.current.getBoundingClientRect();
    
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      elemX: (elemRect.left + elemRect.width / 2) - canvasRect.left,
      elemY: (elemRect.top + elemRect.height / 2) - canvasRect.top,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !canvasRef.current) return;
      
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      
      const newX = dragStart.current.elemX + dx;
      const newY = dragStart.current.elemY + dy;
      
      const newXPercent = (newX / canvasRect.width) * 100;
      const newYPercent = (newY / canvasRect.height) * 100;

      setTextStyle(id, {
        x: Math.max(0, Math.min(100, newXPercent)),
        y: Math.max(0, Math.min(100, newYPercent)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, canvasRef, setTextStyle, id]);

  const cssProperties: React.CSSProperties = {
    top: `${textStyle.y}%`,
    left: `${textStyle.x}%`,
    fontSize: `${textStyle.size}vw`,
    color: textStyle.color,
    ...fontStyle,
    cursor: isDragging ? 'grabbing' : 'grab',
    WebkitTextStroke: `${textStyle.strokeWidth}px ${textStyle.strokeColor}`,
    paintOrder: 'stroke fill',
    lineHeight: 1.1,
    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
  };

  return (
    <div
      ref={textRef}
      onMouseDown={handleMouseDown}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center whitespace-pre-wrap w-[90%] p-2 transition-all duration-150 hover:outline-dashed hover:outline-1 hover:outline-gray-400"
      style={cssProperties}
    >
      {textStyle.text}
    </div>
  );
};


export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(({ state, setters }, ref) => {
  const { backgroundImage, aspectRatio, textStyles, effects, watermark } = state;

  const primaryFont = FONT_OPTIONS.find(f => f.name === textStyles.primary.font);
  const secondaryFont = FONT_OPTIONS.find(f => f.name === textStyles.secondary.font);
  
  const aspectRatioClass = ASPECT_RATIOS[aspectRatio as keyof typeof ASPECT_RATIOS] || 'aspect-[3/4]';

  return (
    <div className={`w-full max-w-lg shadow-2xl rounded-lg overflow-hidden ${aspectRatioClass} bg-gray-700`}>
      <div ref={ref} className="w-full h-full relative overflow-hidden bg-black select-none">
        {/* Background Image */}
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="User-provided background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: `blur(${effects.backgroundBlur}px)` }}
            crossOrigin="anonymous"
          />
        )}
        
        {/* Color Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: effects.overlayColor,
            opacity: effects.overlayOpacity,
            mixBlendMode: effects.overlayBlendMode as any,
          }}
        ></div>

        {/* Grain Effect */}
        <div
          className="absolute inset-0 w-full h-full bg-repeat pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: effects.grainOpacity,
            mixBlendMode: 'overlay',
          }}
        ></div>
        
        <DraggableText
          id="primary"
          textStyle={textStyles.primary}
          fontStyle={primaryFont?.style || {}}
          canvasRef={ref as React.RefObject<HTMLDivElement>}
          setTextStyle={setters.setTextStyle}
        />
        
        <DraggableText
          id="secondary"
          textStyle={textStyles.secondary}
          fontStyle={secondaryFont?.style || {}}
          canvasRef={ref as React.RefObject<HTMLDivElement>}
          setTextStyle={setters.setTextStyle}
        />
        
        {/* Watermark */}
        {watermark.image && (
          <img
            src={watermark.image}
            alt="Watermark"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              top: `${watermark.y}%`,
              left: `${watermark.x}%`,
              width: `${watermark.size}%`,
              opacity: watermark.opacity,
            }}
            crossOrigin="anonymous"
          />
        )}
      </div>
    </div>
  );
});