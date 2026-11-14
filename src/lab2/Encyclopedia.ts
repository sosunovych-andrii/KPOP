import { ReferenceItem } from "./ReferenceItem";
import { assertPositiveInteger } from "./validation";

export class Encyclopedia extends ReferenceItem {
    constructor(title: string, year: number, public edition: number) {
        super(title, year);
        assertPositiveInteger(edition, "Видання");
    }

    public override printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    public printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    }
}