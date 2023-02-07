import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;

// import { useEffect, useState } from "react";

// export const useLocalStorage = (key, initialValue) => {
//   const [storedValue, setStoredValue] = useState(initialValue);

//   useEffect(() => {
//     const current = window.localStorage.getItem(key);
//     if (current) {
//       setStoredValue(JSON.parse(current));
//     } else {
//       window.localStorage.setItem(key, JSON.stringify(initialValue));
//       setStoredValue(initialValue);
//     }
//   }, []);

//   const updateValue = (newValue) => {
//     setStoredValue(newValue);
//     window.localStorage.setItem(key, JSON.stringify(newValue));
//   };

//   return [storedValue, updateValue];
// };

// export default useLocalStorage;
