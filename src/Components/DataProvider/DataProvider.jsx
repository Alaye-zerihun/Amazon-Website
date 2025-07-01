import React, { createContext, useReducer, useEffect } from "react";
import { auth } from "../../Utility/firebase"; // Make sure this path is correct for your Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";
import { Type } from "../../Utility/Action.type"; // Assuming 'type' is imported from here for SET_USER

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // This useEffect will run once when the component mounts
  // and whenever the 'auth' object changes (which it won't here)
  useEffect(() => {
    // Set up the Firebase authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in or an existing session is found
        // Dispatch the SET_USER action to update the DataContext
        dispatch({
          type: Type.SET_USER, // Use the correct type from your Action.type
          user: authUser,
        });
      } else {
        // User is signed out or no active session is found
        dispatch({
          type: Type.SET_USER,
          user: null, // Set user to null when no user is authenticated
        });
      }
    });

    // Cleanup subscription on unmount to prevent memory leaks
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  // Pass the state and dispatch from useReducer to the context consumers
  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};