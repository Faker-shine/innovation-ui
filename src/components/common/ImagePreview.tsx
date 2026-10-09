import React, { useState } from 'react';
import { Image, ZoomIn, ZoomOut, RotateCw, FileCode, Shield } from 'lucide-react';

export interface ImagePreviewProps {
  src?: string;
  alt?: string;
  title?: string;
  revisionStamp?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt = '零部件工程图纸装配图',
  title = '2804H 电机结构装配剖面图 (DWG-PRT-001-A2)',
  revisionStamp = 'Rev B · 正式发布受控受印',
  aspectRatio = '16/9',
  className = ''
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(200, prev + 25));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(50, prev - 25));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const aspectStyle = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-4/3',
    '1/1': 'aspect-square',
    'auto': 'h-64'
  }[aspectRatio];

  return (
    <div
      style={{ borderRadius: 'var(--plm-radius, 6px)' }}
      className={`border border-[var(--plm-border)] bg-[var(--plm-surface)] overflow-hidden shadow-2xs flex flex-col ${className}`}
    >
      {/* Top Controls Toolbar */}
      <div className="px-3.5 py-2 border-b border-[var(--plm-border)] bg-[var(--plm-bg)] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 truncate pr-2">
          <FileCode className="w-3.5 h-3.5 text-[var(--plm-primary)] shrink-0" />
          <span className="font-semibold text-[var(--plm-text)] truncate">{title}</span>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleZoomOut}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xs text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)] cursor-pointer"
            title="缩小"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-[var(--plm-text-secondary)] min-w-[36px] text-center">
            {zoomLevel}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xs text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)] cursor-pointer"
            title="放大"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRotate}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xs text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)] cursor-pointer"
            title="旋转90°"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Image / Drawing Canvas */}
      <div className={`relative ${aspectStyle} w-full bg-slate-950 flex items-center justify-center overflow-hidden`}>
        {/* Engineering Drawing Schematic / Mock Blueprint */}
        <div
          style={{
            transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
            transition: 'transform 0.2s ease-out'
          }}
          className="w-full h-full p-6 flex flex-col items-center justify-center text-slate-300 relative select-none"
        >
          {/* Engineering grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Blueprint SVG Schematic Mock */}
          <svg className="w-48 h-36 stroke-blue-400 fill-none stroke-1" viewBox="0 0 200 150">
            <rect x="20" y="20" width="160" height="110" rx="4" strokeDasharray="4 2" />
            <circle cx="100" cy="75" r="40" stroke="currentColor" />
            <circle cx="100" cy="75" r="16" stroke="currentColor" fill="#1e293b" />
            <line x1="20" y1="75" x2="180" y2="75" stroke="#64748b" strokeDasharray="2 2" />
            <line x1="100" y1="20" x2="100" y2="130" stroke="#64748b" strokeDasharray="2 2" />
            <text x="105" y="65" fill="#93c5fd" fontSize="8" fontFamily="monospace">Ø 28.00 mm</text>
            <text x="30" y="35" fill="#94a3b8" fontSize="8" fontFamily="monospace">PART-001 CAD REV.B</text>
          </svg>

          {/* Drawing Metadata Watermark */}
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs border border-white/10 px-2.5 py-1 rounded-xs text-[10px] font-mono text-slate-300 flex items-center gap-1.5 pointer-events-none">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>{revisionStamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
