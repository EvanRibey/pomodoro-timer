import { useEffect, useMemo, useState } from 'react';
import { usePrevious } from '.';

export function useLocalStorage<Type>(storageKey: string, initialValue: Type) {
  const storageValue = useMemo(() => {
    const initialStorageValue = localStorage.getItem(storageKey);
    if (initialStorageValue) return JSON.parse(initialStorageValue);
    return initialValue;
  }, [storageKey, initialValue]);

  const [stateValue, setStateValue] = useState(storageValue);
  const prevStateValue = usePrevious(stateValue);

  useEffect(() => {
    if (prevStateValue !== stateValue) {
      localStorage.setItem(storageKey, JSON.stringify(stateValue));
    }
  }, [prevStateValue, stateValue]);

  return [stateValue, setStateValue];
}
