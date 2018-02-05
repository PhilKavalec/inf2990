import { Request, Response } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
import { Track } from "../../../common/racing/track";
import { tracks } from "../mock-track";

@injectable()
export class TrackRoute {
    public getTrackList(req: Request, res: Response): void {
        res.send(tracks);
    }

    public getTrackFromID(req: Request, res: Response): void {
        res.send(tracks.find((track: Track) => track.$id === req.params.id));
    }

    public newTrack(req: Request, res: Response): void {
        const track: Track = new Track(tracks.length + 1, req.params.name);
        tracks.push(track);
        this.getTrackList(req, res);
    }

    public deleteTrack(req: Request, res: Response): void {
        const removeIndex: number = tracks.findIndex((track: Track) => track.$id === +req.params.id);
        tracks.splice(removeIndex, 1);
        for (let i: number = removeIndex; i < tracks.length; i++) {
            tracks[i].$id--;
        }
        this.getTrackList(req, res);
    }
}
