import { useState, useCallback } from 'react';
import Cookies from 'js-cookie';

export default function useCookie(key: string, defaultValue?: string) {
  const [cookie, setCookieValue] = useState(() => {
    const cookie = Cookies.get(key);
    if (cookie) return cookie;
    // Cookies.set(key, defaultValue || "", { expires: 7 });
    Cookies.set(key, defaultValue || "");
    return defaultValue;
  });

  const updateCookie = useCallback(
    (value: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(key, value, options);
      setCookieValue(value)
    },
    [key]
  )

  const deleteCookie = useCallback(() => {
    Cookies.remove(key);
    setCookieValue('');
  }, [key]);


  return [cookie, updateCookie, deleteCookie] as const;
}