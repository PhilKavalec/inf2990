import assert = require("assert");
import * as requestPromise from "request-promise-native";
import { Track } from "../../../common/racing/track";

const SERVICE_BASE_URL: string = "http://localhost:3000/track/";
describe("TRACK SERVICE TESTS", () => {

    it("should get a list of tracks", (done: MochaDone) => {
        const tracks: Track[] = new Array();
        requestPromise(SERVICE_BASE_URL).then((response: string) => {
            for (const document of JSON.parse(JSON.parse(response)) as string[]) {
                const iTrack: Track = JSON.parse(JSON.stringify(document));
                if (iTrack.isTestTrack) {
                    assert(false);
                    done();
                }
                tracks.push(iTrack);
            }
            assert(tracks.length !== 0);
            done();
        }).catch((e: Error) => {
            console.error(e.message);
            assert(false);
            done();
        });
    });

    it("should get a single track", (done: MochaDone) => {
        requestPromise(SERVICE_BASE_URL + "5a933c16883f6e3d48ec81fe").then((response: string) => {
            const iTrack: Track = JSON.parse(response);
            assert(iTrack.id === "5a933c16883f6e3d48ec81fe");
            assert(iTrack.isTestTrack);
            done();
        }).catch((e: Error) => {
            console.error(e.message);
            assert(false);
            done();
        });
    });

    it("should edit a track", (done: MochaDone) => {
        const randomNumber: number = Math.random();
        const trackToEdit: Track = new Track("5a933c16883f6e3d48ec81fe", true);
        trackToEdit.name = randomNumber.toString();
        const options: requestPromise.OptionsWithUrl = {
            method: "PUT",
            url: SERVICE_BASE_URL + "put/5a933c16883f6e3d48ec81fe",
            body: trackToEdit,
            json: true
        };
        requestPromise(options).then((response: string) => {
            const iTrack: Track = JSON.parse(JSON.stringify(response));
            assert(iTrack.id === "5a933c16883f6e3d48ec81fe");
            assert(iTrack.name === randomNumber.toString());
            done();
        }).catch((e: Error) => {
            console.error(e.message);
            assert(false);
            done();
        });
    });

    // tslint:disable-next-line:max-func-body-length
    it("should create a new track then delete it", (done: MochaDone) => {
        const trackName: string = "New Test Track 2394758329673294932865";
        const newTrack: Track = new Track(undefined, true);
        delete newTrack["_id"];
        newTrack.name = trackName;
        const options: requestPromise.OptionsWithUrl = {
            method: "POST",
            url: SERVICE_BASE_URL + "new",
            body: newTrack,
            json: true
        };
        requestPromise(options).then((responseFromNew: string) => {
            const iTrack: Track = JSON.parse(JSON.stringify(responseFromNew));
            assert(trackName === iTrack.name);
            requestPromise(SERVICE_BASE_URL + "delete/" + iTrack.id).then((responseFromDelete: string) => {
                const tracks: Track[] = JSON.parse(JSON.stringify(responseFromDelete));
                for (const track of tracks) {
                    assert(trackName !== track.name);
                }
                done();
            }).catch((e: Error) => {
                console.error(e.message);
                assert(false);
                done();
            });
            done();
        }).catch((e: Error) => {
            console.error(e.message);
            assert(false);
            done();
        });
    });
});
