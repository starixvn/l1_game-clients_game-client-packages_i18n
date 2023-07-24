import * as i18n from "./LanguageData";
import { LocalizedLabel } from "./LocalizedLabel";

import { _decorator, Label, Enum, error } from "cc";
const { ccclass, property, executeInEditMode } = _decorator;

export enum FormationHandler {
    NONE,
    UPPER,
    LOWER,
    TITLE
}

@ccclass("LocalizedLabelWithFormat")
@executeInEditMode
export default class LocalizedLabelWithFormat extends LocalizedLabel {
    @property({ type: Enum(FormationHandler) })
    format = FormationHandler.UPPER;  

    updateLabel() {
        if (!this.label) {
            this.label = this.node.getComponent(Label);

            if (!this.label) {
                error("Failed to update localized label, label component is invalid!");
                return;
            }
        }
        console.log(this.key);
        let localizedString = i18n.t(this.key);
        console.log(this.key, localizedString);
        if (localizedString) {
            localizedString = this.handleFormat(localizedString);            
            this.label.string = localizedString;
        }
    }

    handleFormat(value: string) {
        const data = [
            {
                condition: this.format === FormationHandler.LOWER,
                handle: this.lowerCase
            },
            {
                condition: this.format === FormationHandler.UPPER,
                handle: this.upperCase
            },
            {
                condition: this.format === FormationHandler.TITLE,
                handle: this.titleCase
            }
        ];
        const handler = data.filter((passed) => passed.condition);
        return handler.length ? handler[0].handle(value) : value;
    }

    titleCase(value: string) {
        const space = " ";
        const isBreakLine = value.includes("\n");
        const result = value
            .split(space)
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(space);
        if (!isBreakLine) {
            return result;
        }

        return result
            .split("\n")
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join("\n");
    }

    upperCase(value: string) {
        return value.toUpperCase();
    }

    lowerCase(value: string) {
        return value.toLowerCase();
    }
}
