import React from "react";
import "./Map.css";
function Map() {
  return (
    <div className="google-map">
      <iframe
        src="https://maps.google.co.in/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Sahil+al+zuhoor,+Dubai,+UAE&amp;aq=&amp;sll=25.392805,55.283059&amp;sspn=3.021786,5.410767&amp;ie=UTF8&amp;hq=Sahil+al+zuhoor,&amp;hnear=Dubai+-+United+Arab+Emirates&amp;ll=25.132227,55.246537&amp;spn=0.189256,0.338173&amp;t=m&amp;z=12&amp;iwloc=A&amp;cid=10065034257959596348&amp;output=embed"
        width="100%"
        height="500px"
      ></iframe>
    </div>
  );
}

export default Map;
