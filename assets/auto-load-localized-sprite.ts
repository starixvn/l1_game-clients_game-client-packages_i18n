import { Enum, SpriteFrame, _decorator } from "cc";
import { bundleManager } from "db://shared-components/shared/common-components/bundle-magager/bundle-manager";
import { LocalizedSprite } from "./LocalizedSprite";

const { ccclass, property } = _decorator;

enum PathType {
    Folder,
    Suffix,
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
        if (this.pathType === PathType.Suffix) {
            return `${this.path}/${this.frameName}_${this.currentLanguage}${extraType}`;
        }
        return `${this.path}/${this.currentLanguage}/${this.frameName}${extraType}`;
    }

    async updateSprite() {
        const fileName = this.generateSpriteFrameName();
        const spriteFrame = await bundleManager.loadAssetsFromBundle<SpriteFrame>(this.bundleName, fileName, SpriteFrame, null);
        this.sprite.spriteFrame = spriteFrame;
    }
}
