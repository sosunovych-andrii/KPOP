import { Librarian } from "./interfaces";
import { assertNonEmptyString } from "./validation";

export class UniversityLibrarian implements Librarian {
    public name: string = "";
    public email: string = "";
    public department: string = "";

    public assistCustomer(custName: string): void {
        assertNonEmptyString(custName, "Ім'я клієнта");
        console.log(`${this.name} is assisting ${custName}`);
    }
}