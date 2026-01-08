import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

// --- DEFINICIÓN DE TIPOS AUTÓNOMA ---
export type HotspotIcon = 'arrow-up' | 'arrow-down' | 'arrow-right' | 'arrow-left' | 'info' | 'camera' | 'pin' | 'floor';

export interface Hotspot {
  id: string;
  pitch: number;
  yaw: number;
  text: string;
  type: 'scene' | 'info' | 'link' | 'photo';
  icon?: HotspotIcon;
  sceneId?: string;       // Para navegación
  targetUrl?: string;     // Para enlaces externos
  targetImage?: string;   // Para modales de fotos
  description?: string;   // Para tooltips largos
}

export interface Scene {
  id: string;
  title: string;
  image: string;          // URL de la imagen 360 (equirectangular)
  preview?: string;       // URL de baja resolución para carga inmediata
  hotspots: Hotspot[];
}

interface ViewerProps {
  scene: Scene;
  allScenes?: Scene[]; // Added for preloading logic
  autoRotate?: boolean;
  onSceneChange?: (targetSceneId: string) => void;
  onHotspotClick?: (hotspot: Hotspot) => void;
}

declare global {
  interface Window {
    pannellum: any;
  }
}

export const Standalone360Viewer: React.FC<ViewerProps> = ({ 
  scene, 
  allScenes = [], 
  autoRotate = false,
  onSceneChange,
  onHotspotClick
}) => {
  const viewerRef = useRef<any>(null);
  const containerId = useRef(`pannellum-${Math.random().toString(36).substr(2, 9)}`);
  
  // OPTIMIZATION: If we have a preview image (thumbnail), we don't need to show 
  // the blocking "Loading" spinner. We just show the blurry preview provided by Pannellum.
  const [isLoading, setIsLoading] = useState(!scene.preview);

  // --- NEIGHBOR PRELOADING LOGIC ---
  useEffect(() => {
    if (!allScenes || allScenes.length === 0) return;

    // Identify neighbors: find hotspots in current scene that link to other scenes
    const neighbors = scene.hotspots
        .filter(hs => hs.type === 'scene' && hs.sceneId)
        .map(hs => hs.sceneId);

    // Preload neighbor images
    neighbors.forEach(neighborId => {
        const neighborScene = allScenes.find(s => s.id === neighborId);
        if (neighborScene && neighborScene.image) {
            // Check if already in cache (simplistic check, browsers handle deduping)
            const img = new Image();
            img.src = neighborScene.image;
        }
    });
  }, [scene, allScenes]);


  useEffect(() => {
    if (!window.pannellum || !scene.image) return;

    // Reset loading state. If preview exists, we don't block UI.
    setIsLoading(!scene.preview);

    // 1. Destruir instancia previa si existe para evitar fugas de memoria
    if (viewerRef.current) {
      viewerRef.current.destroy();
    }

    // 2. Configuración de Hotspots
    // Mapeamos tus hotspots JSON a la estructura de Pannellum
    const processedHotspots = scene.hotspots.map(hs => ({
      id: hs.id,
      pitch: hs.pitch,
      yaw: hs.yaw,
      text: hs.text,
      cssClass: 'custom-hotspot-wrapper',
      createTooltipFunc: (hotSpotDiv: HTMLElement, args: any) => {
        // A. Icono Visual
        const iconDiv = document.createElement('div');
        iconDiv.className = `hotspot-visual icon-${hs.icon || 'info'}`;
        hotSpotDiv.appendChild(iconDiv);

        // B. Tooltip de Texto (Hover)
        const tooltipSpan = document.createElement('span');
        tooltipSpan.className = 'hotspot-tooltip';
        tooltipSpan.innerText = hs.text;
        hotSpotDiv.appendChild(tooltipSpan);

        // C. Previsualización de Imagen (Opcional, si es tipo 'photo')
        if (hs.type === 'photo' && hs.targetImage) {
            const preview = document.createElement('div');
            preview.className = 'hotspot-img-preview';
            preview.innerHTML = `<img src="${hs.targetImage}" />`;
            hotSpotDiv.appendChild(preview);
        }

        // D. Manejo de Clics
        hotSpotDiv.onclick = () => {
          if (hs.type === 'scene' && hs.sceneId && onSceneChange) {
            // Do not set isLoading true here immediately to allow smooth transition 
            // if the next image is cached. Pannellum handles the transition.
            onSceneChange(hs.sceneId);
          } else if (hs.type === 'link' && hs.targetUrl) {
            window.open(hs.targetUrl, '_blank');
          } else if (onHotspotClick) {
            onHotspotClick(hs);
          }
        };
      }
    }));

    // 3. Inicializar Pannellum
    const viewer = window.pannellum.viewer(containerId.current, {
      type: 'equirectangular',
      panorama: scene.image,
      preview: scene.preview, // NEW: Uses thumbnail/low-res first
      autoLoad: true,
      autoRotate: autoRotate ? -2 : 0,
      compass: false,
      showControls: true,
      hotSpots: processedHotspots,
      crossOrigin: "anonymous", 
      strings: {
          loadButtonLabel: "Click to Load",
          loadingLabel: "" // Hide default text loader
      }
    });

    // 4. Hook into Pannellum events
    viewer.on('load', () => {
        setIsLoading(false);
    });

    // Fallback in case of error
    viewer.on('error', () => {
        setIsLoading(false);
    });

    viewerRef.current = viewer;

    // Cleanup al desmontar
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, [scene, autoRotate, onSceneChange, onHotspotClick]);

  return (
    <div className="relative w-full h-full bg-norfolk-sand overflow-hidden rounded-xl shadow-inner group">
      <div id={containerId.current} className="w-full h-full" />
      
      {/* CUSTOM LOADING OVERLAY */}
      {/* Only show loader if we have NO preview and it is loading. 
          If we have a preview, let Pannellum show it instead of this spinner. */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/20 pointer-events-none transition-opacity duration-300">
           <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-lg flex items-center gap-3">
              <Loader2 className="animate-spin text-norfolk-green h-6 w-6" />
              <span className="font-serif text-norfolk-green tracking-wide text-sm font-bold">Loading Scene...</span>
           </div>
        </div>
      )}

      {/* INYECCIÓN DE ESTILOS CSS (Self-contained) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .pnlm-load-box { display: none !important; }
        .pnlm-container { background-color: #f2f0e9; } 
        
        /* Wrapper invisible para posicionamiento */
        .custom-hotspot-wrapper {
            width: 0; height: 0;
            z-index: 100;
            cursor: pointer;
        }

        /* Estilo Base del Hotspot */
        .hotspot-visual {
            position: absolute;
            top: 0; left: 0;
            transform: translate(-50%, -50%);
            width: 44px; height: 44px;
            background-color: rgba(74, 93, 79, 0.8); /* Norfolk Green alpha */
            backdrop-filter: blur(4px);
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
            background-position: center;
            background-repeat: no-repeat;
            background-size: 20px;
            transition: all 0.2s ease-out;
        }

        .custom-hotspot-wrapper:hover .hotspot-visual {
            transform: translate(-50%, -50%) scale(1.2);
            background-color: rgba(74, 93, 79, 1);
            border-color: #F2F0E9; /* Sand */
        }

        /* Tooltip de Texto */
        .hotspot-tooltip {
            position: absolute;
            bottom: 50px; left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.9);
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            font-family: sans-serif;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
        }
        .custom-hotspot-wrapper:hover .hotspot-tooltip { opacity: 1; }

        /* Preview de Imagen */
        .hotspot-img-preview {
            position: absolute;
            bottom: 50px; left: 50%;
            transform: translateX(-50%);
            width: 160px; height: 100px;
            border: 2px solid white;
            border-radius: 8px;
            overflow: hidden;
            display: none;
            z-index: 10;
        }
        .hotspot-img-preview img { width: 100%; height: 100%; object-fit: cover; }
        .custom-hotspot-wrapper:hover .hotspot-img-preview { display: block; }

        /* --- ICONOS SVG (Data URIs) --- */
        .icon-arrow-up { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M12 4v16"/></svg>'); }
        .icon-arrow-down { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7M12 20V4"/></svg>'); }
        
        /* New Arrow Icons */
        .icon-arrow-left { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7M4 12h16"/></svg>'); }
        .icon-arrow-right { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 12h16"/></svg>'); }
        
        .icon-info { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'); }
        .icon-camera { background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'); }
        .icon-floor { 
             width: 80px !important; height: 80px !important;
             background: transparent; border: none; box-shadow: none;
             transform: translate(-50%, -50%) rotateX(70deg);
        }
        .icon-floor::before {
             content: ''; display: block; width: 100%; height: 100%;
             border: 2px solid white; border-radius: 50%;
             background: rgba(255,255,255,0.2);
             animation: pulse 2s infinite;
        }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255,255,255, 0.4); } 70% { box-shadow: 0 0 0 20px rgba(255,255,255, 0); } 100% { box-shadow: 0 0 0 0 rgba(255,255,255, 0); } }
      `}} />
    </div>
  );
};