import React, { useState, ReactNode } from 'react';
import { ResetIcon } from './Icons';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  onReset?: () => void;
}

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6"/>
    </svg>
);

export const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false, onReset }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the accordion from toggling
    onReset?.();
  }

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-2 font-semibold text-left text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors"
      >
        <span className="text-base">{title}</span>
        <div className="flex items-center gap-2">
            {onReset && (
                <button 
                    onClick={handleReset} 
                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded-md transition-colors"
                    title="Reset section to default"
                >
                    <ResetIcon />
                </button>
            )}
            <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDownIcon />
            </span>
        </div>
      </button>
      {isOpen && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};
