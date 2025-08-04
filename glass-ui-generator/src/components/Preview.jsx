// src/components/Preview.jsx
import React from 'react';

const lightBgUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3a8034?q=80&w=2940&auto=format&fit=crop";
const darkBgUrl = "https://images.unsplash.com/photo-1532423622396-10a3f979251a?q=80&w=2874&auto=format&fit=crop";

const Preview = ({ styles, theme }) => {
  const isDark = theme === 'dark';

  // Calculate Depth (Box Shadow) values
  const shadowY = 2 + (styles.depth / 100) * 20;
  const shadowBlur = 10 + (styles.depth / 100) * 54;
  const shadowOpacity = 0.1 + (styles.depth / 100) * 0.2;
  const highlightOpacity = 0.15 + (styles.depth / 100) * 0.4;

  // Calculate Refraction (Edge Shine) value
  const refractionOpacity = (styles.refraction / 100) * 0.8;

  const elementStyle = {
    width: `${styles.width}px`,
    height: `${styles.height}px`,
    borderRadius: `${styles.borderRadius}px`,
    fontSize: `${styles.fontSize}px`,
    backgroundColor: isDark 
      ? `rgba(0, 0, 0, ${styles.transparency})` 
      : `rgba(255, 255, 255, ${styles.transparency})`,
    backdropFilter: `blur(${styles.blur}px)`,
    WebkitBackdropFilter: `blur(${styles.blur}px)`,
    border: `1px solid rgba(255, 255, 255, ${isDark ? 0.18 : 0.3})`,
    boxShadow: `
      0 ${shadowY}px ${shadowBlur}px 0 rgba(0, 0, 0, ${shadowOpacity}), 
      inset 0 1px 1px 0 rgba(255, 255, 255, ${highlightOpacity})
    `,
    color: isDark ? '#E5E7EB' : '#1F2937',
    position: 'relative',
    overflow: 'hidden',
  };

  const topShineStyle = {
    content: '""',
    position: 'absolute',
    top: '1px',
    left: '1px',
    right: '1px',
    height: '1px',
    background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, ${refractionOpacity}), transparent)`,
    opacity: styles.refraction > 0 ? 1 : 0,
    transition: 'opacity 0.2s'
  };

  return (
    <div
      className="flex-1 flex items-center justify-center bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${isDark ? darkBgUrl : lightBgUrl})` }}
    >
      <div
        style={elementStyle}
        className="flex items-center justify-center font-semibold transition-all duration-200"
      >
        <div style={topShineStyle}></div>
        {styles.elementType === 'button' ? styles.buttonText : ''}
      </div>
    </div>
  );
};

export default Preview;