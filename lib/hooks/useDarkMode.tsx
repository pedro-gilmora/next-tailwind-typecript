import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useDarkMode() {
  const [enabled, setEnabled] = useLocalStorage("dark-theme", false);

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    enabled ? bodyClass.add(className) : bodyClass.remove(className);
  }, [enabled]);

  return [enabled, setEnabled];
}

export default useDarkMode;
