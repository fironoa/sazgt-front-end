import React, { createContext, useState, useContext, useEffect } from 'react';

const LogoAnimationContext = createContext();

export const useVideoOverlay = () => useContext(LogoAnimationContext);

export const LogoAnimationProvider = ({ children }) => {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    console.log("Video state : " + showVideo)
    var video = document.getElementById("myVideo");
    if(video) {
      video.playbackRate = 1; // Speeds up the video playback

      // Example: Play video on load
      video.play();
  
    }
    
    const timer = setTimeout(() => setShowVideo(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LogoAnimationContext.Provider value={{ showVideo, setShowVideo }}>
      {children}
    </LogoAnimationContext.Provider>
  );
};