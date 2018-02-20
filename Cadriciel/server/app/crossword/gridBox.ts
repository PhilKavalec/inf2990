import { Coordinate } from "./coordinate";
import { Word } from "./word";
import { CommonGridBox } from "../../../common/crossword/commonGridBox";

export class GridBox extends CommonGridBox {

    public constructor(id: Coordinate, isBlack: boolean) {
        super(id, isBlack);
    }

    public addConstraint(word: Word): void {
        this._constraints[this._difficulty] = word;
        this._difficulty++;
    }

    public getConstraint(isHorizontal: boolean): Word {
        for (const constraint of this._constraints) {
            if (constraint._isHorizontal === isHorizontal) {
                return constraint;
            }
        }
        throw new Error("No corresponding constraint found");
    }

    public eliminateConstraints(): void {
        for (const constraint of this._constraints) {
            constraint._constraints = undefined;
        }
    }

    public get word(): Word {
        return this._constraints[0];
    }
    public get difficulty(): number {
        return this._difficulty;
    }

    public get id(): Coordinate {
        return this._id;
    }

}