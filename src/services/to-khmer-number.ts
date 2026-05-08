import { useLocale } from "next-intl";


export const useKhmerNumber = () => {
  const locale = useLocale();
  
  const toKhmerNumber = (num: number | string): string => {
    if (locale === "km" || locale === "kh") {
      const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
      return String(num)
        .split("")
        .map(digit => {
          const parsed = parseInt(digit, 10);
          return isNaN(parsed) ? digit : khmerDigits[parsed];
        })
        .join("");
    }
    return String(num);
  };

  return toKhmerNumber;
};