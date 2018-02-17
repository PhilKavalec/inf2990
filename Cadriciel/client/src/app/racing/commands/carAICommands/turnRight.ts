import { AbstractCarAICommand } from "./../abstractCarAICommand";
import { Car } from "../../car/car";

export class TurnLeft extends AbstractCarAICommand {

    public constructor(car: Car) {
        super(car);
    }

    public execute(): void {
        this._car.steerRight();
    }
}
