import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, debounceTime: number) => {
  const [valueDebounce, setValueDebounce] = useState<T>();

  useEffect(() => {
    const time = setTimeout(() => {
      setValueDebounce(value);
    }, debounceTime);

    return () => clearTimeout(time);
  }, [debounceTime, value]);

  return valueDebounce;
};
