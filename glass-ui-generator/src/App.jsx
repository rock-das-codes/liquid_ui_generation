import React, { useState, useRef, useEffect } from 'react';
import { Download, Copy, Eye, EyeOff, Palette, Layers, Settings } from 'lucide-react';

const GlassmorphismGenerator = () => {
  const [config, setConfig] = useState({
    width: 240,
    height: 360,
    blur: 7,
    opacity: 0.17,
    borderRadius: 20,
    borderOpacity: 0.3,
    shadowIntensity: 0.1,
    innerGlow: 3,
    reflectionIntensity: 0.8,
    text: 'Glassmorphism',
    showText: true,
    textSize: 18,
    textColor: '#ffffff',
    backgroundColor: '#667eea',
    gradientEnd: '#764ba2'
  });

  const [activeTab, setActiveTab] = useState('design');
  const [showCode, setShowCode] = useState(false);
  const canvasRef = useRef(null);

  const generateCSS = () => {
    return `.glass-card {
  width: ${config.width}px;
  height: ${config.height}px;
  background: rgba(255, 255, 255, ${config.opacity});
  backdrop-filter: blur(${config.blur}px);
  -webkit-backdrop-filter: blur(${config.blur}px);
  border-radius: ${config.borderRadius}px;
  border: 1px solid rgba(255, 255, 255, ${config.borderOpacity});
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, ${config.shadowIntensity}),
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1),
    inset 0 0 60px 30px rgba(255, 255, 255, ${config.innerGlow / 100});
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  ${config.showText ? `
  color: ${config.textColor};
  font-size: ${config.textSize}px;
  font-weight: 500;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;` : ''}
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, ${config.reflectionIntensity}),
    transparent
  );
}

.glass-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, ${config.reflectionIntensity}),
    transparent,
    rgba(255, 255, 255, ${config.borderOpacity})
  );
}`;
  };

  const generateSVG = () => {
    const { width, height, borderRadius, blur, opacity, borderOpacity, reflectionIntensity, shadowIntensity, innerGlow } = config;
    
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Main blur filter -->
    <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="${blur * 0.5}"/>
    </filter>
    
    <!-- Shadow filter -->
    <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-opacity="${shadowIntensity}" flood-color="black"/>
    </filter>
    
    <!-- Inner glow filter -->
    <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Gradients for reflections -->
    <linearGradient id="topReflection" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:white;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:white;stop-opacity:${reflectionIntensity}"/>
      <stop offset="100%" style="stop-color:white;stop-opacity:0"/>
    </linearGradient>
    
    <linearGradient id="leftReflection" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:white;stop-opacity:${reflectionIntensity}"/>
      <stop offset="50%" style="stop-color:white;stop-opacity:0"/>
      <stop offset="100%" style="stop-color:white;stop-opacity:${borderOpacity}"/>
    </linearGradient>
    
    <!-- Glass gradient -->
    <radialGradient id="glassGradient" cx="50%" cy="30%">
      <stop offset="0%" style="stop-color:white;stop-opacity:${opacity + 0.1}"/>
      <stop offset="70%" style="stop-color:white;stop-opacity:${opacity}"/>
      <stop offset="100%" style="stop-color:white;stop-opacity:${opacity - 0.05}"/>
    </radialGradient>
    
    <!-- Inner glow gradient -->
    <radialGradient id="innerGlowGrad" cx="50%" cy="50%">
      <stop offset="0%" style="stop-color:white;stop-opacity:${innerGlow / 200}"/>
      <stop offset="100%" style="stop-color:white;stop-opacity:0"/>
    </radialGradient>
  </defs>
  
  <!-- Background for context -->
  <rect width="${width}" height="${height}" fill="url(#glassGradient)" rx="${borderRadius}" ry="${borderRadius}" filter="url(#dropShadow)"/>
  
  <!-- Main glass shape -->
  <rect x="0.5" y="0.5" width="${width-1}" height="${height-1}" rx="${borderRadius}" ry="${borderRadius}" 
        fill="url(#glassGradient)" 
        stroke="rgba(255,255,255,${borderOpacity})" 
        stroke-width="1"
        filter="url(#glassBlur)"/>
  
  <!-- Inner glow effect -->
  <rect x="0.5" y="0.5" width="${width-1}" height="${height-1}" rx="${borderRadius}" ry="${borderRadius}" 
        fill="url(#innerGlowGrad)"/>
  
  <!-- Top reflection -->
  <rect x="0" y="0" width="${width}" height="2" rx="${borderRadius}" ry="1" fill="url(#topReflection)"/>
  
  <!-- Left reflection -->
  <rect x="0" y="0" width="2" height="${height}" rx="1" ry="${borderRadius}" fill="url(#leftReflection)"/>
  
  <!-- Text -->
  ${config.showText ? `<text x="${width/2}" y="${height/2 + config.textSize/4}" text-anchor="middle" 
        fill="${config.textColor}" font-size="${config.textSize}" font-family="system-ui, -apple-system, sans-serif" 
        font-weight="500" opacity="0.9">
    ${config.text}
  </text>` : ''}
</svg>`;
  };

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set high DPI for better quality
    const dpr = window.devicePixelRatio || 1;
    canvas.width = config.width * dpr;
    canvas.height = config.height * dpr;
    canvas.style.width = config.width + 'px';
    canvas.style.height = config.height + 'px';
    ctx.scale(dpr, dpr);
    
    // Clear canvas with transparent background
    ctx.clearRect(0, 0, config.width, config.height);
    
    // Create gradient background for glass effect
    const gradient = ctx.createRadialGradient(
      config.width / 2, config.height * 0.3, 0,
      config.width / 2, config.height * 0.3, Math.max(config.width, config.height)
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${config.opacity + 0.1})`);
    gradient.addColorStop(0.7, `rgba(255, 255, 255, ${config.opacity})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, ${config.opacity - 0.05})`);
    
    // Draw main glass shape with shadow
    ctx.save();
    ctx.shadowColor = `rgba(0, 0, 0, ${config.shadowIntensity})`;
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 8;
    
    // Main glass rectangle
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, config.width, config.height, config.borderRadius);
    ctx.fill();
    ctx.restore();
    
    // Draw border
    ctx.strokeStyle = `rgba(255, 255, 255, ${config.borderOpacity})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(0.5, 0.5, config.width - 1, config.height - 1, config.borderRadius);
    ctx.stroke();
    
    // Draw inner glow
    if (config.innerGlow > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const innerGlowGradient = ctx.createRadialGradient(
        config.width / 2, config.height / 2, 0,
        config.width / 2, config.height / 2, Math.min(config.width, config.height) / 2
      );
      innerGlowGradient.addColorStop(0, `rgba(255, 255, 255, ${config.innerGlow / 200})`);
      innerGlowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = innerGlowGradient;
      ctx.beginPath();
      ctx.roundRect(0, 0, config.width, config.height, config.borderRadius);
      ctx.fill();
      ctx.restore();
    }
    
    // Draw top reflection
    const topGradient = ctx.createLinearGradient(0, 0, config.width, 0);
    topGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    topGradient.addColorStop(0.5, `rgba(255, 255, 255, ${config.reflectionIntensity})`);
    topGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = topGradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, config.width, 2, config.borderRadius, config.borderRadius, 0, 0);
    ctx.fill();
    
    // Draw left reflection
    const leftGradient = ctx.createLinearGradient(0, 0, 0, config.height);
    leftGradient.addColorStop(0, `rgba(255, 255, 255, ${config.reflectionIntensity})`);
    leftGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    leftGradient.addColorStop(1, `rgba(255, 255, 255, ${config.borderOpacity})`);
    
    ctx.fillStyle = leftGradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, 2, config.height, config.borderRadius, 0, 0, config.borderRadius);
    ctx.fill();
    
    // Apply blur effect to simulate backdrop filter
    if (config.blur > 0) {
      ctx.save();
      ctx.filter = `blur(${config.blur * 0.3}px)`;
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = `rgba(255, 255, 255, ${config.opacity * 0.5})`;
      ctx.beginPath();
      ctx.roundRect(0, 0, config.width, config.height, config.borderRadius);
      ctx.fill();
      ctx.restore();
    }
    
    // Draw text if enabled
    if (config.showText && config.text) {
      ctx.fillStyle = config.textColor;
      ctx.font = `500 ${config.textSize}px system-ui, -apple-system, BlinkMacSystemFont, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = 0.9;
      
      // Add text shadow for better visibility
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 1;
      ctx.fillText(config.text, config.width / 2, config.height / 2);
      ctx.restore();
      
      ctx.globalAlpha = 1;
    }
    
    // Download
    const link = document.createElement('a');
    link.download = 'glassmorphism-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };
  
  {/* Azure Depths */}
  
  {/* Your Content/Components */}


  return (
    <div className="min-h-screen w-full relative">
      <div
    className="absolute inset-0 z-0"
    style={{
      background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #010133 100%)",
    }}
  />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center relative z-1 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Glassmorphism Generator
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Create stunning glass-morphism effects with real-time preview and export to CSS, SVG, or PNG
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
              {[
                { id: 'design', label: 'Design', icon: Palette },
                { id: 'effects', label: 'Effects', icon: Layers },
                { id: 'text', label: 'Text', icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                    activeTab === id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="bg-white/10 scale-75 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              {activeTab === 'design' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Dimensions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 mb-2">Width</label>
                      <input
                        type="range"
                        min="100"
                        max="500"
                        value={config.width}
                        onChange={(e) => setConfig({...config, width: parseInt(e.target.value)})}
                        className="w-full"
                      />
                      <span className="text-white/60 text-sm">{config.width}px</span>
                    </div>
                    <div>
                      <label className="block text-white/80 mb-2">Height</label>
                      <input
                        type="range"
                        min="100"
                        max="500"
                        value={config.height}
                        onChange={(e) => setConfig({...config, height: parseInt(e.target.value)})}
                        className="w-full"
                      />
                      <span className="text-white/60 text-sm">{config.height}px</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2">Border Radius</label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={config.borderRadius}
                      onChange={(e) => setConfig({...config, borderRadius: parseInt(e.target.value)})}
                      className="w-full"
                    />
                    <span className="text-white/60 text-sm">{config.borderRadius}px</span>
                  </div>
                </div>
              )}

              {activeTab === 'effects' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Glass Effects</h3>
                  
                  <div>
                    <label className="block text-white/80 mb-2">Blur Intensity</label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={config.blur}
                      onChange={(e) => setConfig({...config, blur: parseInt(e.target.value)})}
                      className="w-full"
                    />
                    <span className="text-white/60 text-sm">{config.blur}px</span>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Glass Opacity</label>
                    <input
                      type="range"
                      min="0.05"
                      max="0.5"
                      step="0.01"
                      value={config.opacity}
                      onChange={(e) => setConfig({...config, opacity: parseFloat(e.target.value)})}
                      className="w-full"
                    />
                    <span className="text-white/60 text-sm">{Math.round(config.opacity * 100)}%</span>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Border Opacity</label>
                    <input
                      type="range"
                      min="0.1"
                      max="0.8"
                      step="0.01"
                      value={config.borderOpacity}
                      onChange={(e) => setConfig({...config, borderOpacity: parseFloat(e.target.value)})}
                      className="w-full"
                    />
                    <span className="text-white/60 text-sm">{Math.round(config.borderOpacity * 100)}%</span>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Shadow Depth</label>
                    <input
                      type="range"
                      min="0"
                      max="0.3"
                      step="0.01"
                      value={config.shadowIntensity}
                      onChange={(e) => setConfig({...config, shadowIntensity: parseFloat(e.target.value)})}
                      className="w-full"
                    />
                    <span className="text-white/60 text-sm">{Math.round(config.shadowIntensity * 100)}%</span>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Inner Glow</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={config.innerGlow}
                      onChange={(e) => setConfig({...config, innerGlow: parseFloat(e.target.value)})}
                      className="w-full"
                    />
                    <span className="text-white/60 text-sm">{config.innerGlow}</span>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Reflection Intensity</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={config.reflectionIntensity}
                      onChange={(e) => setConfig({...config, reflectionIntensity: parseFloat(e.target.value)})}
                      className="w-full"
                    />
                    <span className="text-white/60 text-sm">{Math.round(config.reflectionIntensity * 100)}%</span>
                  </div>
                </div>
              )}

              {activeTab === 'text' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Text Settings</h3>
                    <button
                      onClick={() => setConfig({...config, showText: !config.showText})}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        config.showText
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}
                    >
                      {config.showText ? <Eye size={16} /> : <EyeOff size={16} />}
                      {config.showText ? 'Visible' : 'Hidden'}
                    </button>
                  </div>

                  {config.showText && (
                    <>
                      <div>
                        <label className="block text-white/80 mb-2">Text Content</label>
                        <input
                          type="text"
                          value={config.text}
                          onChange={(e) => setConfig({...config, text: e.target.value})}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                          placeholder="Enter your text..."
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 mb-2">Font Size</label>
                        <input
                          type="range"
                          min="12"
                          max="48"
                          value={config.textSize}
                          onChange={(e) => setConfig({...config, textSize: parseInt(e.target.value)})}
                          className="w-full"
                        />
                        <span className="text-white/60 text-sm">{config.textSize}px</span>
                      </div>

                      <div>
                        <label className="block text-white/80 mb-2">Text Color</label>
                        <input
                          type="color"
                          value={config.textColor}
                          onChange={(e) => setConfig({...config, textColor: e.target.value})}
                          className="w-full h-12 rounded-lg border border-white/20 bg-white/10"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Export Buttons */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Export</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => copyToClipboard(generateCSS())}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all"
                >
                  <Copy size={16} />
                  Copy CSS
                </button>
                <button
                  onClick={() => downloadFile(generateCSS(), 'glassmorphism.css')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all"
                >
                  <Download size={16} />
                  CSS File
                </button>
                <button
                  onClick={() => downloadFile(generateSVG(), 'glassmorphism.svg')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-all"
                >
                  <Download size={16} />
                  SVG File
                </button>
                <button
                  onClick={downloadPNG}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500/20 text-orange-300 rounded-lg border border-orange-500/30 hover:bg-orange-500/30 transition-all"
                >
                  <Download size={16} />
                  PNG File
                </button>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            {/* Live Preview */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 min-h-[500px] flex items-center justify-center">
              <div
                style={{
                  width: `${config.width}px`,
                  height: `${config.height}px`,
                  background: `rgba(255, 255, 255, ${config.opacity})`,
                  backdropFilter: `blur(${config.blur}px)`,
                  WebkitBackdropFilter: `blur(${config.blur}px)`,
                  borderRadius: `${config.borderRadius}px`,
                  border: `1px solid rgba(255, 255, 255, ${config.borderOpacity})`,
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, ${config.shadowIntensity}),
                    inset 0 1px 0 rgba(255, 255, 255, 0.5),
                    inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                    inset 0 0 60px 30px rgba(255, 255, 255, ${config.innerGlow / 100})
                  `,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: config.textColor,
                  fontSize: `${config.textSize}px`,
                  fontWeight: '500',
                  textAlign: 'center',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, ${config.reflectionIntensity}), transparent)`
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '1px',
                    height: '100%',
                    background: `linear-gradient(180deg, rgba(255, 255, 255, ${config.reflectionIntensity}), transparent, rgba(255, 255, 255, ${config.borderOpacity}))`
                  }}
                />
                {config.showText && config.text}
              </div>
            </div>

            {/* Code Display */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <h3 className="text-lg font-semibold text-white">Generated CSS</h3>
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {showCode ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {showCode && (
                <div className="p-4">
                  <pre className="text-sm text-white/80 overflow-x-auto">
                    <code>{generateCSS()}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hidden canvas for PNG export */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default GlassmorphismGenerator;