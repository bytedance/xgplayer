type XGI18nTextKeys = {
  [k: string]: string;
};

type XGI18nLangKeys = string[];

type XGI18nLang = {
  LANG: string;
  TEXT: XGI18nTextKeys
}

interface I18N {
  textKeys: XGI18nTextKeys;
  langKeys: XGI18nLangKeys;
  lang: {
      [key: string]: {
          [key: string]: string;
      }
  };
  extend: (data: {
      [key: string]: {
          [key: string]: string;
      }
  }) => void;
  use: (data: XGI18nLang) => void;
}

export default I18N;
