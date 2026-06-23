import React from 'react';

export default function PropertiesPanel({ shirtColor, setShirtColor, selected, objects, setObjects }) {
  
  // Find the currently selected object data block to display properties
  const activeObject = objects?.find((obj) => obj.id === selected);

  // General Update Handler helper
  const updateActiveProperty = (key, value) => {
    if (!selected || !objects) return;
    const updated = objects.map((obj) => {
      if (obj.id !== selected) return obj;
      return { ...obj, [key]: value };
    });
    setObjects(updated);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      
      {/* SECTION 1: GLOBAL SHIRT STYLING CONFIG */}
      <div className="w-full bg-white/90 rounded-2xl border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <span className="text-xs bg-slate-100 text-slate-700 w-5 h-5 flex items-center justify-center rounded font-bold">👕</span>
          <h4 className="text-xs font-bold text-gray-800 tracking-wide uppercase">Garment Properties</h4>
        </div>
        
        <div>
          <label className="text-[10px] font-bold text-gray-400 block uppercase mb-1.5">Shirt Base Color</label>
          <div className="flex gap-2.5 items-center">
            {[
              { name: 'White', hex: '#ffffff' },
              { name: 'Slate', hex: '#64748b' },
              { name: 'Crimson', hex: '#ef4444' },
              { name: 'Navy', hex: '#1e3a8a' },
              { name: 'Charcoal', hex: '#1e293b' }
            ].map((color) => (
              <button
                key={color.hex}
                onClick={() => setShirtColor(color.hex)}
                className={`w-6 h-6 rounded-full border border-gray-200 shadow-xs transition-transform ${
                  shirtColor === color.hex ? 'scale-110 ring-2 ring-blue-500/50' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: TEXT CONFIGURATION (Only shown if a text layer is selected) */}
      {activeObject && activeObject.type === 'text' && (
        <div className="w-full bg-white/90 rounded-2xl border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-slate-100 text-slate-700 w-5 h-5 flex items-center justify-center rounded font-bold">T</span>
              <h4 className="text-xs font-bold text-gray-800 tracking-wide uppercase">Text Customizer</h4>
            </div>
          </div>

          {/* Edit Live Text String Input */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 block uppercase mb-1">Edit Text Content</label>
            <input
              type="text"
              value={activeObject.text || ''}
              onChange={(e) => updateActiveProperty('text', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Dynamic Font Styling Choice Dropdown */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 block uppercase mb-1">Font Family</label>
            <select
              value={activeObject.fontFamily || 'Inter'}
              onChange={(e) => updateActiveProperty('fontFamily', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="Inter">Sans-Serif (Inter)</option>
              <option value="Impact">Bold Impact</option>
              <option value="Courier New">Monospace Courier</option>
              <option value="Georgia">Serif Georgia</option>
            </select>
          </div>

          {/* Asset Text Color Picker Grid */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 block uppercase mb-1.5">Text Fill Color</label>
            <div className="flex gap-2 items-center">
              {['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#000000'].map((colorHex) => (
                <button
                  key={colorHex}
                  onClick={() => updateActiveProperty('color', colorHex)}
                  className={`w-5 h-5 rounded-full border border-white transition-transform ${
                    activeObject.color === colorHex ? 'scale-110 ring-2 ring-slate-400' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: colorHex }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: IMAGE FILTER SLIDERS (Only shown if a custom photo is selected) */}
      {activeObject && activeObject.type === 'image' && (
        <div className="w-full bg-white/90 rounded-2xl border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-slate-100 text-slate-700 w-5 h-5 flex items-center justify-center rounded font-bold">🖼️</span>
              <h4 className="text-xs font-bold text-gray-800 tracking-wide uppercase">Image Shaders</h4>
            </div>
          </div>

          {/* Live Adjustment Brightness Filter */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-medium text-gray-500">
              <span>Brightness</span>
              <span className="font-mono text-gray-700">{activeObject.exposure ?? 100}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={activeObject.exposure ?? 100}
              onChange={(e) => updateActiveProperty('exposure', Number(e.target.value))}
              className="w-full accent-blue-600 h-1 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          {/* Live Adjustment Contrast Filter */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex justify-between text-[11px] font-medium text-gray-500">
              <span>Contrast</span>
              <span className="font-mono text-gray-700">{activeObject.contrast ?? 100}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={activeObject.contrast ?? 100}
              onChange={(e) => updateActiveProperty('contrast', Number(e.target.value))}
              className="w-full accent-blue-600 h-1 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* FALLBACK INFO BUBBLE: If nothing is selected */}
      {!activeObject && (
        <div className="w-full bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 p-4 text-center">
          <p className="text-xs text-slate-400 font-medium">Select an item inside the printable shirt canvas area to reveal customizable layer styles.</p>
        </div>
      )}

    </div>
  );
}
