import { Category, IdGenerator, Worker, WorkerInfo } from "./types";
import {
    checkoutWorkers,
    getAllWorkers,
    getWorkerByID,
    getWorkersSurnamesByCategory,
    logDevelopers,
    logFirstAvailable,
    logWorkersNames,
} from "./workers";
import { createCustomer, createCustomerID } from "./customers";
import { student } from "./student";

function section(title: string): void {
    console.log(`\n===== ${title} =====`);
}

section("1.1 Базові типи");
const workers: Worker[] = getAllWorkers();
console.log(workers);
logFirstAvailable(workers);

section("1.2 Enum і фільтрація");
const developers: Array<string> = getWorkersSurnamesByCategory(Category.Developer);
console.log(`Прізвища категорії ${Category.Developer}:`);
logWorkersNames(developers);

section("1.3 Стрілочні функції");
console.log(`Робітники категорії ${Category.Developer}:`);
logDevelopers();

const workerId: number = 2;
const foundWorker: WorkerInfo | undefined = getWorkerByID(workerId);
if (foundWorker !== undefined) {
    console.log(`Робітник id=${workerId}: ${foundWorker.name} ${foundWorker.surname}, зарплата: ${foundWorker.salary}`);
} else {
    console.log(`Робітника з id=${workerId} не знайдено`);
}

section("1.4 Типи функцій");
const myID: string = createCustomerID(student.name, student.listNumber);
console.log(`myID: ${myID}`);

let idGenerator: IdGenerator = (name: string, id: number): string => `${name}${id}`;
console.log(`idGenerator (стрілочна функція): ${idGenerator("Bohdan", 10)}`);

idGenerator = createCustomerID;
console.log(`idGenerator (createCustomerID): ${idGenerator(student.name, student.listNumber)}`);

section("1.5 Параметри");
createCustomer("Olena");
createCustomer("Taras", 25);
createCustomer("Iryna", 30, "Kyiv");

console.log(`Прізвища за замовчуванням (${Category.Designer}):`);
logWorkersNames(getWorkersSurnamesByCategory());

logFirstAvailable();

const customer: string = `${student.name} (№${student.listNumber}, ${student.group}, ${student.hobby})`;
const myWorkers: string[] = checkoutWorkers(customer, 1, 2, 4, 5, 7);
console.log(`Доступні робітники:`);
myWorkers.forEach((fullName: string): void => console.log(`  - ${fullName}`));

section("Валідація");
const invalidCalls: Array<() => unknown> = [
    (): unknown => getWorkerByID(-1),
    (): unknown => createCustomerID("", 5),
    (): void => createCustomer("Test", -10),
    (): unknown => checkoutWorkers("   ", 1),
];
invalidCalls.forEach((call: () => unknown): void => {
    try {
        call();
    } catch (error: unknown) {
        console.log(`Помилка: ${error instanceof Error ? error.message : String(error)}`);
    }
});