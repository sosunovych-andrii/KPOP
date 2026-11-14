import { assertNonEmptyString, assertYear } from "./validation";

export abstract class ReferenceItem {
    public static department: string = "Research Department";

    private _publisher: string = "";

    constructor(public title: string, protected year: number) {
        assertNonEmptyString(title, "Назва");
        assertYear(year);
        console.log("Creating a new ReferenceItem ...");
    }

    public get publisher(): string {
        return this._publisher.toUpperCase();
    }

    public set publisher(newPublisher: string) {
        assertNonEmptyString(newPublisher, "Видавець");
        this._publisher = newPublisher;
    }

    public printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${ReferenceItem.department}`);
    }

    public abstract printCitation(): void;
}