// RulesContext.js
import React, { createContext, useState, useContext } from "react";

const RulesContext = createContext();

export const RulesProvider = ({ children }) => {
  const [isRulesPage, setIsRulesPage] = useState(false);

  return (
    <RulesContext.Provider value={{ isRulesPage, setIsRulesPage }}>
      {children}
    </RulesContext.Provider>
  );
};

export const useRules = () => useContext(RulesContext);
