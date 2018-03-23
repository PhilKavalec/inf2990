import { CommonCoordinate3D } from "./commonCoordinate3D";
import { TrackType } from "./trackType";

export class Track {

    public static createFromJSON(stringObject: string): Track {
        const jsonObject = JSON.parse(stringObject) as Track;
        return new Track(
            jsonObject._id,
            jsonObject._isTestTrack,
            jsonObject.name,
            jsonObject.description,
            jsonObject.timesPlayed,
            jsonObject.bestTimes,
            jsonObject.type,
            jsonObject.vertices
        );
    }

    public constructor(
        private _id: string,
        private _isTestTrack: boolean = false,
        public name: string = "New Track",
        public description: string = "",
        public timesPlayed: number = 0,
        public bestTimes: number[] = [],
        public type: TrackType = TrackType.Default,
        public vertices: Array<CommonCoordinate3D> = new Array()) {
    }

    public get isTestTrack(): boolean {
        return this._isTestTrack;
    }

    public get id(): string {
        return this._id;
    }
}
