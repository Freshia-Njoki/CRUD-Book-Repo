import { useEffect, useReducer } from 'react';
import { Action } from '../interfaces';

export function useLocalStorage<T>(key: string, reducer: React.Reducer<T, Action>, initialState: T): [T, React.Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const valueInLocalStorage = localStorage.getItem(key);
    return valueInLocalStorage ? JSON.parse(valueInLocalStorage) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}
