import * as i18n from "./LanguageData";
export const getI18nLanguage = () => {
        return i18n._language;
    }

export enum LocalizedPathType {
  Folder, // path/en/sprite-name
  Suffix, // path/sprite-name_en
  SpriteFolder, // path/sprite-name/en
}

export const getSpritePath = (pathType: string | number, rootFolder:string, frameName:string, currentLanguage?:string) => {
  if(currentLanguage === undefined || currentLanguage === null){
    currentLanguage = getI18nLanguage();
  }
        const extraType = "/spriteFrame";
        switch (+pathType) {
            case LocalizedPathType.Folder:
                return `${rootFolder}/${currentLanguage}/${frameName}${extraType}`;
            case LocalizedPathType.Suffix:
                return `${rootFolder}/${frameName}_${currentLanguage}${extraType}`;
            case LocalizedPathType.SpriteFolder:
                return `${rootFolder}/${frameName}/${currentLanguage}${extraType}`;
        }
    };

    