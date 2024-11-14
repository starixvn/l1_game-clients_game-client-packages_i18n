import { Enum, SpriteFrame, _decorator } from "cc";
import { bundleManager } from "db://shared-components/shared/common-components/bundle-magager/bundle-manager";
import { LocalizedSprite } from "./LocalizedSprite";

const { ccclass, property } = _decorator;

enum PathType {
    Folder, // path/en/sprite-name
    Suffix, // path/sprite-name_en
    SpriteFolder, // path/sprite-name/en
}

@ccclass("AutoLoadLocalizedSprite")
export class AutoLoadLocalizedSprite extends LocalizedSprite {
    @property({
        visible: false,
        override: true,
    })
    spriteList = [];
    @property
    bundleName = "resources";

    @property
    path = "images/splash/i18n";

    @property
    frameName = "tagline_sc1";

    @property({ type: Enum(PathType) })
    pathType = PathType.Suffix;

    protected generateSpriteFrameName() {
        const extraType = "/spriteFrame";
        switch (this.pathType) {
            case PathType.Folder:
                return `${this.path}/${this.currentLanguage}/${this.frameName}${extraType}`;
            case PathType.Suffix:
                return `${this.path}/${this.frameName}_${this.currentLanguage}${extraType}`;
            case PathType.SpriteFolder:
                return `${this.path}/${this.frameName}/${this.currentLanguage}${extraType}`;
        }
    }

    async updateSprite() {
        const fileName = this.generateSpriteFrameName();
        const spriteFrame = await bundleManager.loadAssetsFromBundle<SpriteFrame>(this.bundleName, fileName, SpriteFrame, null);
        this.sprite.spriteFrame = spriteFrame;
    }
}
