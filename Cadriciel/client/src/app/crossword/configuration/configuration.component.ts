import { Component } from "@angular/core";
import { GridService } from "../grid.service";
import { ConfigurationService } from "../configuration.service";
import { CommonGrid } from "../../../../../common/crossword/commonGrid";
import { Difficulty } from "../../../../../common/crossword/difficulty";
import { MultiplayerCommunicationService } from "../multiplayer-communication.service";

@Component({
    selector: "app-configuration",
    templateUrl: "./configuration.component.html",
    styleUrls: ["./configuration.component.css"]
})
export class ConfigurationComponent {
    public isNewGame: boolean = false;
    public isJoinGame: boolean = false;
    public difficulty: Difficulty;
    public choseGridDifficulty: boolean = false;
    public constructor(
        private _gridService: GridService,
        public configurationService: ConfigurationService,
        private multiplayerCommunicationService: MultiplayerCommunicationService) {
    }

    public setNewGame(): void {
        this.isNewGame = true;
    }

    public setJoinGame(): void {
        this.isJoinGame = true;
    }

    public createGrid(): void {
        this._gridService.gridGet(this.difficulty).subscribe((grid: CommonGrid) => {
            this.configurationService.grid = grid;
        });
    }

    private makeGrid(): void {
        this.choseGridDifficulty = true;
        // this.createGrid();
    }

    public makeEasyGrid(): void {
        this.difficulty = Difficulty.Easy;
        this.makeGrid();
    }

    public makeMediumGrid(): void {
        this.difficulty = Difficulty.Medium;
        this.makeGrid();
    }

    public makeHardGrid(): void {
        this.difficulty = Difficulty.Hard;
        this.makeGrid();
    }

    public submitName(): void {
        this.configurationService.configurationDone = true;
    }

    public createRoom(): void {
        this.multiplayerCommunicationService.connectToSocket();
        this.configurationService.isSocketConnected = true;
    }

}
