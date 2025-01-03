import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { FormControl, MenuItem, Select } from "@mui/material";
import { InputLabel } from "./style";

/**
 * A dropdown menu for selecting the language of the application.
 *
 * The language will be changed as soon as the user selects a new language.
 *
 * @returns A JSX element with a dropdown menu for selecting the language of the application.
 */
const LnaguageSwitch: React.FC = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { label: "English", languageCode: "en", id: 0 },
    { label: "French", languageCode: "fr", id: 1 },
    { label: "Spanish", languageCode: "es", id: 2 },
  ];

  /**
   * Changes the application's language.
   *
   * @param lng - The language code to switch to.
   */
  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <FormControl>
        <InputLabel  
          htmlFor="languages"
          >
            {t("languages")}
        </InputLabel>
        <Select
          label={t('languages')}
          id="languages"
          value={i18n.language}
          onChange={(e) => handleChangeLanguage(e.target.value)}
        >
          {languages.map((language) => (
            <MenuItem key={language.id} value={language.languageCode}>
              {language.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default LnaguageSwitch;
