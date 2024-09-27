import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LogoAnimationContext = createContext();

export const useVideoOverlay = () => useContext(LogoAnimationContext);

export const LogoAnimationProvider = ({ children }) => {
  const [showVideo, setShowVideo] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/'){
      var video = document.getElementById("myVideo");
      if(video) {
        video.playbackRate = 1; // Speeds up the video playback
  
        // Example: Play video on load
        video.play();
    
      }
      
      const timer = setTimeout(() => setShowVideo(false), 4500);
      return () => clearTimeout(timer);
    } else {
      setShowVideo(false);
    }
    
  }, [location]);

  return (
    <LogoAnimationContext.Provider value={{ showVideo, setShowVideo }}>
      {children}
    </LogoAnimationContext.Provider>
  );
};