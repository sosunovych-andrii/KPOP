import { assertNonEmptyString, assertPositiveInteger, assertValidAge } from "./validation";

export function createCustomerID(name: string, id: number): string {
    assertNonEmptyString(name, "Ім'я замовника");
    assertPositiveInteger(id, "Ідентифікатор замовника");
    return `${name}${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    assertNonEmptyString(name, "Ім'я замовника");
    console.log(`Ім'я замовника: ${name}`);

    if (age !== undefined) {
        assertValidAge(age);
        console.log(`  Вік: ${age}`);
    }

    if (city !== undefined) {
        assertNonEmptyString(city, "Місто");
        console.log(`  Місто: ${city}`);
    }
}
