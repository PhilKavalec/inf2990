import { AbstractCommand } from "./abstractCommand";
import { Vector3 } from "three";
import {EditorScene } from "../editorScene";

export class CloseLoop extends AbstractCommand {

    public constructor(editorScene: EditorScene, position: Vector3) {
        super(editorScene, position);
    }

    public execute(): void {
        this.editorScene.completeTrack();
    }
}
