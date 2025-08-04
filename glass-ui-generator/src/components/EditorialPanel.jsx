// src/components/EditorPanel.jsx
import React from 'react';

const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;

const EditorPanel = ({ styles, setStyles, theme, setTheme }) => {
  const handleStyleChange = (property, value) => {
    let finalValue = value;
    if (property !== 'elementType' && property !== 'buttonText' && typeof value !== 'boolean') {
      finalValue = typeof value === 'string' && value !== '' ? Number(value) : value;
    }
    setStyles(prevStyles => ({ ...prevStyles, [property]: finalValue }));
  };
  
  const handleTextChange = (e) => {
    setStyles(prevStyles => ({ ...prevStyles, buttonText: e.target.value }));
  };

  return (
    <aside className="w-96 bg-gray-50 dark:bg-gray-900 p-6 border-l dark:border-gray-700 overflow-y-auto transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">GlassMorphism Generator</h1>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Element Type</label>
        <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1 gap-1">
          <button 
            type="button"
            onClick={() => handleStyleChange('elementType', 'button')}
            className={`flex-1 p-2 rounded-md text-sm transition-colors font-medium cursor-pointer ${
              styles.elementType === 'button' 
                ? 'bg-white dark:bg-blue-600 dark:text-white shadow-sm text-blue-600' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Button
          </button>
          <button 
            type="button"
            onClick={() => handleStyleChange('elementType', 'container')}
            className={`flex-1 p-2 rounded-md text-sm transition-colors font-medium cursor-pointer ${
              styles.elementType === 'container' 
                ? 'bg-white dark:bg-blue-600 dark:text-white shadow-sm text-blue-600' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Container
          </button>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 mb-4">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Visual Effects</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="depth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Depth ({styles.depth})
            </label>
            <input
              id="depth"
              type="range"
              min="0"
              max="100"
              value={styles.depth}
              onChange={(e) => handleStyleChange('depth', e.target.value)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="refraction" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Refraction / Shine ({styles.refraction})
            </label>
            <input
              id="refraction"
              type="range"
              min="0"
              max="100"
              value={styles.refraction}
              onChange={(e) => handleStyleChange('refraction', e.target.value)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width ({styles.width}px)</label>
          <input id="width" type="range" min="50" max="600" value={styles.width} onChange={(e) => handleStyleChange('width', e.target.value)} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height ({styles.height}px)</label>
          <input id="height" type="range" min="50" max="400" value={styles.height} onChange={(e) => handleStyleChange('height', e.target.value)} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="blur" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Background Blur ({styles.blur}px)</label>
        <input id="blur" type="range" min="0" max="40" step="1" value={styles.blur} onChange={(e) => handleStyleChange('blur', e.target.value)} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
      </div>
      <div className="mb-4">
        <label htmlFor="transparency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transparency ({Math.round(styles.transparency * 100)}%)</label>
        <input id="transparency" type="range" min="0" max="1" step="0.01" value={styles.transparency} onChange={(e) => handleStyleChange('transparency', e.target.value)} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
      </div>

      <div className="mb-4">
        <label htmlFor="borderRadius" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Border Radius ({styles.borderRadius}px)</label>
        <input id="borderRadius" type="range" min="0" max="100" value={styles.borderRadius} onChange={(e) => handleStyleChange('borderRadius', e.target.value)} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
      </div>

      {styles.elementType === 'button' && (
        <>
          <div className="mb-4">
            <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Size ({styles.fontSize || 18}px)</label>
            <input id="fontSize" type="range" min="12" max="48" value={styles.fontSize || 18} onChange={(e) => handleStyleChange('fontSize', e.target.value)} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
          </div>
          <div className="mb-4">
            <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Button Text</label>
            <input id="buttonText" type="text" value={styles.buttonText || 'Glass Button'} onChange={handleTextChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-gray-100"/>
          </div>
        </>
      )}
    </aside>
  );
};

export default EditorPanel;