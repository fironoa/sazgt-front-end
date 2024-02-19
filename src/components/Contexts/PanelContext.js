import React, { createContext, useContext, useState } from 'react';

const PanelContext = createContext();

export const PanelProvider = ({ children }) => {
  const [isPanelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => {
    console.log('Panel is trying to open;;');
    setPanelOpen(!isPanelOpen);
  };

  return (
    <PanelContext.Provider value={{ isPanelOpen, togglePanel }}>
      {children}
    </PanelContext.Provider>
  );
};

export const usePanel = () => useContext(PanelContext);