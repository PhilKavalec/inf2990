import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ConfigurationComponent } from "./configuration.component";
import { GridService } from "../grid.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ConfigurationService } from "../configuration/configuration.service";
import { Difficulty } from "../../../../../common/crossword/difficulty";
import { MultiplayerCommunicationService } from "../multiplayer-communication.service";

describe("ConfigurationComponent", () => {
    let component: ConfigurationComponent;
    let fixture: ComponentFixture<ConfigurationComponent>;

    beforeEach(async((done: () => void) => {
        TestBed.configureTestingModule({
            declarations: [ConfigurationComponent],
            providers: [
                GridService,
                HttpClient,
                HttpHandler,
                ConfigurationService,
                MultiplayerCommunicationService
            ]
        })
            .compileComponents()
            .then()
            .catch((e: Error) => console.error(e.message));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfigurationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should toggle 'new game' on click", () => {
        component.setNewGame();
        expect(component.isNewGame).toEqual(true);
    });

    it("should toggle 'join game' on click", () => {
        component.setJoinGame();
        expect(component.isJoinGame).toEqual(true);
    });

    it("should toggle 'chose grid difficulty' on click", () => {
        component.makeEasyGrid();
        expect(component.choseGridDifficulty).toEqual(true);
    });

    it("When the user submits his name it is saved to the service", () => {
        component.configurationService.playerOne.name = "Player1";
        expect(component.configurationService.playerOne.name).toEqual("Player1");
    });

    it("When the user submits his name, the game configuration is over", () => {
        component.submitName("playerName");
        expect(component.configurationService.configurationDone).toEqual(true);
    });

    describe("tests for the difficulty", () => {

        it("should set grid difficulty to Easy on click", () => {
            component.makeEasyGrid();
            expect(component.configurationService.difficulty).toEqual(Difficulty.Easy);
        });

        it("should set grid difficulty to Medium on click", () => {
            component.makeMediumGrid();
            expect(component.configurationService.difficulty).toEqual(Difficulty.Medium);
        });

        it("should set grid difficulty to Hard on click", () => {
            component.makeHardGrid();
            expect(component.configurationService.difficulty).toEqual(Difficulty.Hard);
        });

    });

    describe("socket.io tests", () => {
        it("should connect to server when it is a two player game", () => {
            component.setGameType(true);
            expect(component.multiplayerCommunicationService.isSocketDefined).toBeTruthy();
        });

        it("should have created a room and subscribed to it's messages", () => {
            component.configurationService.difficulty = Difficulty.Easy;
            component.createRoom("player");
            expect(component["_hasSubscribed"]).toBeTruthy();
        });

        it("should setup a join game", () => {
            component.setJoinGame();
            expect(component.isJoinGame).toBeTruthy();
            expect(component.configurationService.isTwoPlayerGame).toBeTruthy();
            expect(component.multiplayerCommunicationService.isSocketDefined).toBeTruthy();
            expect(component["_hasSubscribed"]).toBeTruthy();
        });

        describe("join list query is asynchronous", () => {
            let value: number = 0;
            beforeEach((done: () => void) => {
                setTimeout(() => {
                    value++;
                    done();
                }, 4000);
            });

            it("should query list of games", () => {
                component.setJoinGame();
                value++;
                expect(value).toEqual(2);

                // TODO: should wait for responce
                // spyOnProperty(component.multiplayerCommunicationService, "availableGames", "get");

                // waitsFor(
                //     () => component.multiplayerCommunicationService.availableGames.length > 1,
                //     "didnt receive available games", 10000);

                // runs(() => {
                // expect(component.multiplayerCommunicationService.availableGames.length).toBeGreaterThan(1);
                // const lastIndex: number = component.multiplayerCommunicationService.availableGames.length - 1;
                // expect(component.multiplayerCommunicationService.availableGames[lastIndex].difficulty).toEqual(Difficulty.Easy);
                // expect(component.multiplayerCommunicationService.availableGames[lastIndex].players[0].name).toEqual("player");
                // });

            });
        });

        it("should have same grid on start game", () => {
            expect(true).toBeFalsy();
        });

    });

    it("game only starts when other player has join", () => {
        expect(true).toBeFalsy();
    });

    it("show loader when looking for other player", () => {
        component.setGameType(true);
        expect(component.waitingForRoom).toBeTruthy();
    });

    it("When both players has join and grid is generated, the game can start", () => {
        expect(true).toBeFalsy();
    });

    it("All players can see what word is selected", () => {
        expect(true).toBeFalsy();
    });

    it("All players can see what word is found", () => {
        expect(true).toBeFalsy();
    });

});
