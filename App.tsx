import React, { useRef, useCallback, useState } from 'react';
import { toPng } from 'html-to-image';
import { useCineSlidesState } from './hooks/useCineSlidesState';
import { ControlsPanel } from './components/ControlsPanel';
import { CanvasPreview } from './components/CanvasPreview';
import { DownloadIcon, Logo } from './components/Icons';

const App: React.FC = () => {
  const { state, setters } = useCineSlidesState();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(() => {
    if (canvasRef.current === null) {
      return;
    }
    setIsExporting(true);
    toPng(canvasRef.current, { cacheBust: true, pixelRatio: 2 }) // Higher resolution export
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'cineslide.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
        alert('Could not export image. Please try again.');
      })
      .finally(() => {
        setIsExporting(false);
      });
  }, [canvasRef]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col font-sans">
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 p-3 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-bold text-white tracking-wider">CineSlides</h1>
        </div>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          <DownloadIcon />
          {isExporting ? 'Exporting...' : 'Export'}
        </button>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        <aside className="w-full lg:w-[350px] lg:max-h-[calc(100vh-65px)] lg:overflow-y-auto bg-gray-800/50 p-4 border-r border-gray-700/50">
           <ControlsPanel state={state} setters={setters} />
        </aside>

        <section className="flex-grow flex items-center justify-center p-6 md:p-10 bg-gray-900">
           <CanvasPreview ref={canvasRef} state={state} setters={setters} />
        </section>
      </main>
    </div>
  );
};

export default App;