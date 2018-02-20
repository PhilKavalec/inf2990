import { AbstractEditorCommand } from "./../abstractEditorCommand";
import {EditorScene } from "../../editor/editorScene";

export class CloseLoop extends AbstractEditorCommand {

    public constructor(editorScene: EditorScene) {
        super(editorScene);
    }

    public execute(): void {
        this._editorScene.completeTrack();
    }
}