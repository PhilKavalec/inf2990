import { Injectable } from "@angular/core";
import Stats = require("stats.js");
import { PerspectiveCamera, WebGLRenderer, Scene, AmbientLight, Matrix4, Vector3, CubeGeometry,
     MeshLambertMaterial, MeshBasicMaterial, Mesh, PlaneGeometry} from "three";
import { Car } from "../car/car";
import { DEG_TO_RAD, RAD_TO_DEG } from "../constants";

const FAR_CLIPPING_PLANE: number = 1000;
const NEAR_CLIPPING_PLANE: number = 1;
const FIELD_OF_VIEW: number = 70;

const ACCELERATE_KEYCODE: number = 87;  // w
const LEFT_KEYCODE: number = 65;        // a
const BRAKE_KEYCODE: number = 83;       // s
const RIGHT_KEYCODE: number = 68;       // d

const INITIAL_CAMERA_POSITION_X: number = 0;
const INITIAL_CAMERA_POSITION_Y: number = -10;
const WHITE: number = 0xFFFFFF;
const AMBIENT_LIGHT_OPACITY: number = 0.5;

@Injectable()
export class RenderService {
    private camera: PerspectiveCamera;
    private container: HTMLDivElement;
    private _car: Car;
    private renderer: WebGLRenderer;
    private scene: THREE.Scene;
    private stats: Stats;
    private lastDate: number;

    public get car(): Car {
        return this._car;
    }

    public constructor() {
        this._car = new Car();
    }

    public async initialize(container: HTMLDivElement): Promise<void> {
        if (container) {
            this.container = container;
        }

        await this.createScene();
        this.initStats();
        this.startRenderingLoop();
    }

    private initStats(): void {
        this.stats = new Stats();
        this.stats.dom.style.position = "absolute";
        this.container.appendChild(this.stats.dom);
    }

    private update(): void {
        const timeSinceLastFrame: number = Date.now() - this.lastDate;
        this._car.update(timeSinceLastFrame);
        this.lastDate = Date.now();
    }

    private async createScene(): Promise<void> {
        this.scene = new Scene();

        this.camera = new PerspectiveCamera(
            FIELD_OF_VIEW,
            this.getAspectRatio(),
            NEAR_CLIPPING_PLANE,
            FAR_CLIPPING_PLANE
        );

        await this._car.init();
        
        //this.camera.add(this._car.getMesh);
        //this.camera.position.set(0, 0, 0);
        //this.camera.lookAt(this._car.getMesh.position);
        //this._car.setCamera( this.camera ); // CHANGED
        this.scene.add(this._car);

        const groundGeometry: PlaneGeometry = new PlaneGeometry( 100, 100, 100, 100 );
        const groundMaterial: MeshBasicMaterial = new MeshBasicMaterial({ wireframe: true, color: 0x00FF00 });
        const ground: Mesh = new Mesh( groundGeometry, groundMaterial );
        this.scene.add( ground );

        const cubeGeometry: CubeGeometry = new CubeGeometry( 1, 2, 1 );
        const cubeMaterial: MeshLambertMaterial  = new MeshLambertMaterial({ color: 0xFF0000 });
        const cube: Mesh = new Mesh( cubeGeometry, cubeMaterial );
        //this.scene.add( cube );
        

        this.scene.add(new AmbientLight(WHITE, AMBIENT_LIGHT_OPACITY));
    }

    private getAspectRatio(): number {
        return this.container.clientWidth / this.container.clientHeight;
    }

    private startRenderingLoop(): void {
        this.renderer = new WebGLRenderer();
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

        this.lastDate = Date.now();
        this.container.appendChild(this.renderer.domElement);
        this.render();
    }

    private render(): void {
        requestAnimationFrame(() => this.render());
        this.update();
        //this.camera.position.set(this._car.currentPosition.x+10, this._car.currentPosition.y+5, this._car.currentPosition.z);
        this.camera.position.y = this._car.currentPosition.y + 5  ;
        this.camera.position.x = (this._car.currentPosition.x + 15  )
        this.camera.position.z = (this._car.currentPosition.z+15) * Math.cos(this._car.angle * DEG_TO_RAD);
        this.camera.lookAt(this._car.currentPosition);
        
        this.renderer.render(this.scene, this.camera);
        this.stats.update();

        // console.log(this._car.angle);
        /*this.camera.position.set(this._car.currentPosition.x + Math.sin(this._car.angle * DEG_TO_RAD) * INITIAL_CAMERA_POSITION_X,
                                 this._car.currentPosition.y + INITIAL_CAMERA_POSITION_Y, 
                                 this._car.currentPosition.z + Math.cos(this._car.angle * DEG_TO_RAD) * INITIAL_CAMERA_POSITION_X);
        */
    }

    public onResize(): void {
        this.camera.aspect = this.getAspectRatio();
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    // TODO: Create an event handler service.
    public handleKeyDown(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case ACCELERATE_KEYCODE:
                this._car.isAcceleratorPressed = true;
                break;
            case LEFT_KEYCODE:
                this._car.steerLeft();
                break;
            case RIGHT_KEYCODE:
                this._car.steerRight();
                break;
            case BRAKE_KEYCODE:
                this._car.brake();
                break;
            default:
                break;
        }
    }

    // TODO: Create an event handler service.
    public handleKeyUp(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case ACCELERATE_KEYCODE:
                this._car.isAcceleratorPressed = false;
                break;
            case LEFT_KEYCODE:
            case RIGHT_KEYCODE:
                this._car.releaseSteering();
                break;
            case BRAKE_KEYCODE:
                this._car.releaseBrakes();
                break;
            default:
                break;
        }
    }
}
