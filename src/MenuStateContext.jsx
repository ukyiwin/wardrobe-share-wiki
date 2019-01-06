import React, { useReducer, createContext } from 'react';
import { reducer, initialState } from './MenuReducer';

export const MenuStateContext = createContext();

export function MenuStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <MenuStateContext.Provider value={value}>
      {children}
    </MenuStateContext.Provider>
  );
}
