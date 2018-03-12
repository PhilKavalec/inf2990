import { PerspectiveCamera, Vector3 } from "three";

const NEAR_CLIPPING_PLANE: number = 1;
const FAR_CLIPPING_PLANE: number = 1000;
const FIELD_OF_VIEW: number = 70;

const INITIAL_CAMERA_POSITION_Z: number = 50;
const INITIAL_CAMERA_POSITION_Y: number = 100;
const INITIAL_CAMERA_POSITION_X: number = 50;

export class EditorCamera extends PerspectiveCamera {

    public constructor(aspectRatio: number) {
        super( FIELD_OF_VIEW,
               aspectRatio,
               NEAR_CLIPPING_PLANE,
               FAR_CLIPPING_PLANE);
        this.name = "PREVIEW_CAMERA";
        this.position.z = INITIAL_CAMERA_POSITION_Z;
        this.position.y = INITIAL_CAMERA_POSITION_Y;
        this.position.x = INITIAL_CAMERA_POSITION_X;
        this.lookAt(new Vector3(0, 0, 0));
    }

    public onResize(): void {
        this.updateProjectionMatrix();
    }
}
