import React, { useRef } from 'react';

export default function Toolbar({ objects, setObjects, selected, setSelected }) {
  const fileInputRef = useRef(null);

  // Helper 1: Inject Custom Dynamic Text into the State Array
  const handleAddText = () => {
    const newTextItem = {
      id: `text-${Date.now()}`,
      type: 'text',
      text: 'ONLY U',
      fontSize: 32,
      fontFamily: 'Inter',
      color: '#ef4444', // Tailwind Red-500
      x: 100,
      y: 150,
      rotation: 0,
      scaleX: 1,
      scaleY: 1
    };
    
    const updated = [...objects, newTextItem];
    setObjects(updated);
    setSelected(newTextItem.id); // Automatically focus the newly created asset
  };

  // Helper 2: Inject Vector Shape Configurations
  const handleAddStar = () => {
    const newStarItem = {
      id: `shape-${Date.now()}`,
      type: 'shape',
      shapeType: 'star',
      color: '#eab308', // Tailwind Yellow-500
      x: 140,
      y: 100,
      rotation: 0,
      scaleX: 1,
      scaleY: 1
    };

    const updated = [...objects, newStarItem];
    setObjects(updated);
    setSelected(newStarItem.id);
  };

  // Helper 3: Convert Image Files into Local URLs for Rendering
  const handleImageUpload = (e) => {
    const targetedFile = e.target.files?.[0];
    if (!targetedFile) return;

    const localUrl = URL.createObjectURL(targetedFile);
    const newImageItem = {
      id: `image-${Date.now()}`,
      type: 'image',
      src: localUrl,
      x: 60,
      y: 120,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      exposure: 100,
      contrast: 100
    };

    const updated = [...objects, newImageItem];
    setObjects(updated);
    setSelected(newImageItem.id);
    e.target.value = ''; // Reset input to let users re-upload the same file if needed
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Hidden File Input Tag Triggered by UI Button Below */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* ========================================== */}
      {/* ACTION ACTIONS ACCORDION CONTROL BOX       */}
      {/* ========================================== */}
      <div className="w-full bg-white/90 rounded-2xl border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-4">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-gray-100">
          <span className="text-xs bg-slate-100 text-slate-700 w-5 h-5 flex items-center justify-center rounded font-bold">⚙️</span>
          <h4 className="text-xs font-bold text-gray-800 tracking-wide uppercase">Actions Toolbar</h4>
        </div>

        <div className="flex flex-col gap-2">
          <button 
            onClick={handleAddText}
            className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-xs font-medium text-gray-700 border border-slate-200/40 transition-all flex items-center gap-2"
          >
            <span>✨</span> Add New Text Layer
          </button>

          <button 
            onClick={handleAddStar}
            className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-amber-50 hover:text-amber-600 rounded-xl text-xs font-medium text-gray-700 border border-slate-200/40 transition-all flex items-center gap-2"
          >
            <span>⭐</span> Drop Golden Star Vector
          </button>

          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl text-xs font-medium text-gray-700 border border-slate-200/40 transition-all flex items-center gap-2"
          >
            <span>🖼️</span> Import Custom Photograph
          </button>
        </div>
      </div>
    </div>
  );
}
