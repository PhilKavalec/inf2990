import { Vec2 } from "./vec2";
import { Char } from "./char";
import { Word } from "./word";

export class GridBox {

	private char: Char;
	private constraints: Word[] = new Array<Word>();
	private difficulty: number=0;

	public constructor(private id: Vec2, private black: boolean) {
	};

	public get $char(): Char {
		return this.char;
	}

	public set $char(value: Char) {
		this.char = value;
	}

	public addConstraint(word: Word) {
		this.constraints[this.difficulty]=word;
		this.difficulty++;
	}

	public get $difficulty(): number {
		return this.difficulty;
	}

	public get $id(): Vec2 {
		return this.id;
	}

	public get $black(): boolean {
		return this.black;
	}

	public set $black(black: boolean) {
		this.black = black;
	}


}