import { useKhmerNumber } from "@/services/to-khmer-number";
import { useTranslations, useLocale } from "next-intl";
import React from "react";

type Props = {
  total: number;
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const ProgramSearch: React.FC<Props> = ({ total, searchValue, setSearchValue }) => {
  const t = useTranslations();
  const locale = useLocale();
  const toKhmerNumber = useKhmerNumber();

  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-medium text-[16px] md:text-[18px] lg:text-[20px] text-foreground">
        {t("total")} {toKhmerNumber(total)} {t("courses-found")}
      </h3>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={t("search-courses")}
        className="bg-white text-black rounded-full border border-primary p-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default ProgramSearch;