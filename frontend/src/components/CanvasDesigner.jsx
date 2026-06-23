import React from 'react';

export default function CanvasDesigner({ objects = [], setObjects, selected, setSelected, shirtColor }) {
  
  // Safe execution guard clauses
  const handleMoveObject = (id, direction) => {
    if (!setObjects || !objects) return;
    const updated = objects.map((obj) => {
      if (obj.id !== id) return obj;
      
      let moveX = 0;
      let moveY = 0;
      const step = 8; // Step size in pixels
      
      if (direction === 'up') moveY = -step;
      if (direction === 'down') moveY = step;
      if (direction === 'left') moveX = -step;
      if (direction === 'right') moveX = step;

      return { ...obj, x: (obj.x || 0) + moveX, y: (obj.y || 0) + moveY };
    });
    setObjects(updated);
  };

  const handleScaleObject = (id, scaleFactor) => {
    if (!setObjects || !objects) return;
    const updated = objects.map((obj) => {
      if (obj.id !== id) return obj;
      const newScaleX = Math.max(0.2, (obj.scaleX || 1) * scaleFactor);
      const newScaleY = Math.max(0.2, (obj.scaleY || 1) * scaleFactor);
      return { ...obj, scaleX: newScaleX, scaleY: newScaleY };
    });
    setObjects(updated);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 select-none box-border z-10">
      
      {/* Explicit structural bounds mapping */}
      <div className="relative w-[280px] h-[360px] flex items-center justify-center mx-auto my-auto">
        
        {/* T-Shirt Vector Graphic */}
        <svg 
          className="absolute inset-0 w-full h-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-colors duration-300"
          viewBox="0 0 24 24" 
          fill={shirtColor || "#ffffff"} 
          stroke="#cbd5e1" 
          strokeWidth="0.15"
        >
          <path d="M18 2h-3.5l-2.5 2.5L9.5 2H6L2 6v3h3v13h14V9h3V6l-4-4z" />
        </svg>

        {/* PRINTABLE AREA CANVAS BOX BOUNDARY */}
        <div className="absolute top-[22%] left-[22%] w-[56%] h-[54%] border border-dashed border-blue-400/40 rounded bg-white/10 overflow-hidden shadow-inner">
          
          {Array.isArray(objects) && objects.map((layer) => {
            const isSelected = selected === layer.id;
            return (
              <div
                key={layer.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (setSelected) setSelected(layer.id);
                }}
                className={`absolute cursor-move select-none group ${
                  isSelected ? 'ring-2 ring-blue-500 rounded-xs z-30' : 'hover:ring-1 hover:ring-slate-300 z-20'
                }`}
                style={{
                  left: `${layer.x || 0}px`,
                  top: `${layer.y || 0}px`,
                  transform: `scale(${layer.scaleX || 1}, ${layer.scaleY || 1}) rotate(${layer.rotation || 0}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                {/* Text render node template */}
                {layer.type === 'text' && (
                  <span 
                    className="font-bold tracking-tight inline-block whitespace-nowrap text-sm" 
                    style={{ color: layer.color || '#000', fontFamily: layer.fontFamily || 'Inter' }}
                  >
                    {layer.text || 'TEXT'}
                  </span>
                )}

                {/* Shape render node template */}
                {layer.type === 'shape' && layer.shapeType === 'star' && (
                  <span className="text-2xl inline-block" style={{ color: layer.color || '#eab308' }}>★</span>
                )}

                {/* Local photo render node template */}
                {layer.type === 'image' && (
                  <img 
                    src={layer.src} 
                    alt="Asset upload" 
                    className="w-16 h-auto rounded object-cover" 
                    style={{ filter: `brightness(${layer.exposure || 100}%) contrast(${layer.contrast || 100}%)` }} 
                  />
                )}

                {/* FLOATING CONTROL HUD ELEMENT */}
                {isSelected && (
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded px-2 py-0.5 shadow-lg text-[9px] flex items-center gap-1.5 z-50">
                    <button onClick={(e) => { e.stopPropagation(); handleMoveObject(layer.id, 'up'); }} className="hover:text-blue-400">▲</button>
                    <button onClick={(e) => { e.stopPropagation(); handleMoveObject(layer.id, 'down'); }} className="hover:text-blue-400">▼</button>
                    <button onClick={(e) => { e.stopPropagation(); handleMoveObject(layer.id, 'left'); }} className="hover:text-blue-400">◀</button>
                    <button onClick={(e) => { e.stopPropagation(); handleMoveObject(layer.id, 'right'); }} className="hover:text-blue-400">▶</button>
                    <div className="h-2.5 w-[1px] bg-slate-700 mx-0.5" />
                    <button onClick={(e) => { e.stopPropagation(); handleScaleObject(layer.id, 1.1); }} className="hover:text-emerald-400 font-bold">＋</button>
                    <button onClick={(e) => { e.stopPropagation(); handleScaleObject(layer.id, 0.9); }} className="hover:text-rose-400 font-bold">－</button>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>

      {/* Clear selection on background area click */}
      <div className="absolute inset-0 z-0" onClick={() => setSelected && setSelected(null)} />
    </div>
  );
}
