import React, {useState} from 'react';
import { useVideoOverlay } from '../Contexts/LogoAnimationContext';
import './VideoOverlay.css'; // Ensure this CSS file is properly styled as previously defined

const VideoOverlay = () => {
  const { showVideo, setShowVideo } = useVideoOverlay();
  const [fadeOut, setFadeOut] = useState(false);

   // Handle the video ending by first fading out, then hiding the overlay
   const handleVideoEnd = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowVideo(false);
    }, 1200); // Match this delay to your CSS fade-out duration
  };

  const overlayClass = fadeOut ? "video-overlay fade-out" : "video-overlay";


  if (!showVideo) return null;

  return (
    <div className={overlayClass}>
      <video id="myVideo" width="720" autoplay muted style={{height: "200px"}} 
       onEnded={handleVideoEnd}>
        <source src="/images/sazgtlogoanimation.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoOverlay;