import { Injectable } from "@angular/core";
import { ThirdPersonCamera } from "./thirdPersonCamera";
import { TopViewCamera } from "./topViewCamera";
import { KeyboardEventHandlerService } from "../event-handlers/keyboard-event-handler.service";
import { Car } from "../car/car";
import { Camera, Vector3 } from "three";
import { SpectatingCamera } from "./spectatingCamera";
import { CHANGE_CAMERA_KEYCODE } from "../constants/keycode.constants";

@Injectable()
export class CameraManagerService {
    private _thirdPersonCamera: ThirdPersonCamera;
    private _topViewCamera: TopViewCamera;
    private _spectatingCamera: SpectatingCamera;
    private _useThirdPersonCamera: boolean;
    private _currentCamera: Camera;

    public constructor(private _keyBoardHandler: KeyboardEventHandlerService) {
        this._useThirdPersonCamera = true;
    }

    public initializeCameras(aspectRation: number): void {
        this._thirdPersonCamera = new ThirdPersonCamera(aspectRation);
        this._topViewCamera = new TopViewCamera(aspectRation);
        this._spectatingCamera = new SpectatingCamera(aspectRation);
        this._currentCamera = this._thirdPersonCamera;
    }

    public initializeSpectatingCameraPosition(target: Vector3, direction: Vector3): void {
        this._spectatingCamera.setInitialPosition(target, direction);
    }

    public changeToSpectatingCamera(): void {
        this._currentCamera = this._spectatingCamera;
    }

    public changeToThirdPersonCamera(): void {
        this._currentCamera = this._thirdPersonCamera;
    }

    public changeToTopViewCamera(): void {
        this._currentCamera = this._topViewCamera;
    }

    public get currentCamera(): Camera {
        return this._currentCamera;
    }

    public bindCameraKey(): void {
        this._keyBoardHandler.bindFunctionToKeyDown(CHANGE_CAMERA_KEYCODE, () => {
            this._useThirdPersonCamera = !this._useThirdPersonCamera;
            (this._useThirdPersonCamera) ? this.changeToThirdPersonCamera() : this.changeToTopViewCamera();
        });
    }

    public updateCameraPositions(position: Vector3, timestep?: number): void {
        this._topViewCamera.updatePosition(position);
        if (this._currentCamera === this._spectatingCamera) {
            this._spectatingCamera.updatePosition(timestep);
        }
    }

}
