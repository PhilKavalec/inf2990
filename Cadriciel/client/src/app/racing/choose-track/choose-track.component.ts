import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { TrackService } from "../track-service/track.service";
import { TrackStructure } from "../../../../../common/racing/track";
import { RenderService } from "../render-service/render.service";
import { TrackPreview } from "./trackPreview";
import { Track } from "../track";

@Component({
    selector: "app-choose-track",
    templateUrl: "./choose-track.component.html",
    styleUrls: ["./choose-track.component.css"]
})
export class ChooseTrackComponent implements OnInit, AfterViewInit {

    @ViewChild("preview")
    private containerRef: ElementRef;

    private tracks: Track[] = new Array();
    private _trackPreview: TrackPreview;

    public constructor(
        private trackService: TrackService,
        private renderService: RenderService
    ) { }

    public ngOnInit(): void {
        this.getTracksFromServer();
    }

    public ngAfterViewInit(): void {
        this._trackPreview = new TrackPreview(this.renderService);
        this._trackPreview
            .initialize(this.containerRef)
            .then(/* do nothing */)
            .catch((err) => console.error(err));
    }

    private getTracksFromServer(): void {
        this.trackService.getTrackList()
            .subscribe((tracksFromServer: string) => {
                this.tracks = [];
                JSON.parse(tracksFromServer).forEach((document: string) => {
                    const iTrack: TrackStructure = JSON.parse(JSON.stringify(document));
                    this.tracks.push(new Track(iTrack));
                });
            });
    }

    public displayTrackPreview(track: Track): void {
        this._trackPreview.loadTrack(track);
    }

    public updateSelectedTrack(track: Track): void {
        track.timesPlayed++;
        this.saveTrack(track);
        this.renderService.resetScene();
    }

    private saveTrack(track: Track): void {
        this.trackService.putTrack(track.id, track.toTrackStructure()).subscribe();
    }
}
