/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

/**
 * Хук для работы с localStorage
 * @param {string} key Название ключа под которым будут хранитиься данные
 * @param {any} defaultValue Значение по умолчанию
 * @returns {[any, (value: any) => void]} Переменную со значением и функцияю меняющую значение переменной
 */
const useLocalStorage = (
  key: string,
  defaultValue: any
): [any, (value: any) => void] => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const setLocalStorageStateValue = (value: any) => {
    let newValue;
    if (typeof value === 'function') {
      const fn = value;
      newValue = fn(localStorageValue);
    } else {
      newValue = value;
    }
    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
