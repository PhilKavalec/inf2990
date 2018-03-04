import { Injectable } from "@angular/core";
import { CommandController } from "../commands/commandController";
import { GoFoward } from "../commands/carAICommands/goFoward";
import { TurnLeft } from "../commands/carAICommands/turnLeft";
import { TurnRight } from "../commands/carAICommands/turnRight";
import { Brake } from "../commands/carAICommands/brake";
import { ReleaseAccelerator } from "../commands/carAICommands/releaseAccelerator";
import { ReleaseSteering } from "../commands/carAICommands/releaseSteering";
import { ReleaseBrakes } from "../commands/carAICommands/releaseBrakes";
import { RaceGame } from "../game-loop/raceGame";

const ACCELERATE_KEYCODE: number = 87;  // w
const LEFT_KEYCODE: number = 65;        // a
const BRAKE_KEYCODE: number = 83;       // s
const RIGHT_KEYCODE: number = 68;       // d
const DAY_KEYCODE: number = 74;         // j
const NIGHT_KEYCODE: number = 78;       // n
const DEBUG_KEYCODE: number = 48;       // 0
const MUTE_KEYCODE: number = 77;       //  m
const PLAY_KEYCODE: number = 80;       //  m

@Injectable()
export class KeyboardEventHandlerService {

    private _carControl: CommandController;

    public async initialize(): Promise<void> {
        this._carControl = new CommandController();
    }
    /*tslint disable*/
    public handleKeyDown(event: KeyboardEvent, raceGame: RaceGame): void {
        switch (event.keyCode) {
            case ACCELERATE_KEYCODE:
                this._carControl.command = new GoFoward(raceGame.playerCar);
                this._carControl.execute();
                break;
            case LEFT_KEYCODE:
                this._carControl.command = new TurnLeft(raceGame.playerCar);
                this._carControl.execute();
                break;
            case RIGHT_KEYCODE:
                this._carControl.command = new TurnRight(raceGame.playerCar);
                this._carControl.execute();
                raceGame.createSound("../../../assets/sounds/luigi.mp3");
                break;
            case BRAKE_KEYCODE:
                this._carControl.command = new Brake(raceGame.playerCar);
                this._carControl.execute();
                break;
            case DAY_KEYCODE:
                raceGame.isDay = true;
                break;
            case NIGHT_KEYCODE:
                raceGame.isDay = false;
                break;
            case DEBUG_KEYCODE:
                raceGame.debug = !raceGame.debug;
                break;
            case MUTE_KEYCODE:
                raceGame.stopMusic();
                break;
            case PLAY_KEYCODE:
                raceGame.playMusic();
                break;
            default:
                break;
        }
    }

    public handleKeyUp(event: KeyboardEvent, raceGame: RaceGame): void {
        switch (event.keyCode) {
            case ACCELERATE_KEYCODE:
                this._carControl.command = new ReleaseAccelerator(raceGame.playerCar);
                this._carControl.execute();
                break;
            case LEFT_KEYCODE:
            case RIGHT_KEYCODE:
                this._carControl.command = new ReleaseSteering(raceGame.playerCar);
                this._carControl.execute();
                break;
            case BRAKE_KEYCODE:
                this._carControl.command = new ReleaseBrakes(raceGame.playerCar);
                this._carControl.execute();
                break;
            default:
                break;
        }
    }
}
