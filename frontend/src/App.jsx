import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import CanvasDesigner from './components/CanvasDesigner';
import PropertiesPanel from './components/PropertiesPanel';

export default function App() {
  const [objects, setObjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [shirtColor, setShirtColor] = useState('#ffffff');

  return (
    <div className="w-full h-full min-h-screen bg-[#f0f4fa] flex items-center justify-center p-6 relative overflow-hidden box-border">
      
      {/* Background decoration blur elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-blue-400 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-400 opacity-25 blur-3xl pointer-events-none" />

      {/* FIXED SIZE CONTAINER GLASS FRAME */}
      <div className="relative w-full max-w-[1100px] h-[85vh] max-h-[750px] rounded-[24px] bg-white/80 backdrop-blur-md border border-white/40 shadow-2xl flex flex-col overflow-hidden z-10 box-border">
        
        {/* HEADER BAR */}
        <header className="h-16 w-full px-6 flex items-center justify-between border-b border-gray-200/50 bg-white/40 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-lg">👕</span>
            <span className="font-bold text-gray-800 text-sm tracking-tight">T-Shirt Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-rose-400 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">M</div>
              <div className="w-6 h-6 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">A</div>
            </div>
            <span className="text-[10px] font-bold text-gray-400 bg-slate-100 px-2 py-0.5 rounded">Live</span>
          </div>
        </header>

        {/* THREE PANEL GRID LAYOUT */}
        <main className="flex-1 w-full flex p-5 gap-5 overflow-hidden bg-white/20 box-border">
          
          {/* Left panel */}
          <div className="w-[260px] h-full shrink-0 overflow-y-auto">
            <Toolbar 
              objects={objects} 
              setObjects={setObjects} 
              selected={selected} 
              setSelected={setSelected} 
            />
          </div>

          {/* Center design panel */}
          <div className="flex-1 h-full bg-slate-50/60 rounded-2xl border border-slate-200/60 relative overflow-hidden flex items-center justify-center">
            <CanvasDesigner 
              objects={objects} 
              setObjects={setObjects} 
              selected={selected} 
              setSelected={setSelected} 
              shirtColor={shirtColor} 
            />
          </div>

          {/* Right panel */}
          <div className="w-[260px] h-full shrink-0 overflow-y-auto">
            <PropertiesPanel
              shirtColor={shirtColor}
              setShirtColor={setShirtColor}
              selected={selected}
              objects={objects}
              setObjects={setObjects}
            />
          </div>

        </main>
      </div>
    </div>
  );
}
