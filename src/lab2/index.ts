import { Author, Librarian, PrizeLogger, Worker } from "./interfaces";
import { getAllWorkers, getWorkerByID, logPrize, PrintWorker } from "./workers";
import { UniversityLibrarian } from "./UniversityLibrarian";
import { Encyclopedia } from "./Encyclopedia";

function section(title: string): void {
    console.log(`\n===== ${title} =====`);
}

section("2.1 Визначення інтерфейсу");
const workers: Worker[] = getAllWorkers();
workers.forEach((worker: Worker): void => PrintWorker(worker));

const foundWorker: Worker | undefined = getWorkerByID(3);
if (foundWorker !== undefined) {
    console.log(`Знайдено за id=3:`);
    PrintWorker(foundWorker);
}
console.log(`Пошук id=99: ${getWorkerByID(99)}`);

section("2.2 Інтерфейси для типів функцій");
const prizeLogger: PrizeLogger = logPrize;
prizeLogger("Best worker of the month");
workers[1].markPrize?.("Employee of the year");

section("2.3 Розширення інтерфейсів");
const favoriteAuthor: Author = {
    name: "Lina Kostenko",
    email: "lina.kostenko@example.com",
    numBooksPublished: 20,
};
console.log(favoriteAuthor);

section("2.4 Інтерфейси для типів класів");
const favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = "Andrii";
favoriteLibrarian.email = "andrii@example.com";
favoriteLibrarian.department = "PP-32";
favoriteLibrarian.assistCustomer("Olena");

section("2.5 - 2.7 Класи, наслідування, абстрактні класи");
const refBook: Encyclopedia = new Encyclopedia("Encyclopedia of Ukraine", 1984, 2);
refBook.printItem();
refBook.printCitation();

refBook.publisher = "Naukova Dumka";
console.log(`Publisher: ${refBook.publisher}`);

section("Валідація");
const invalidCalls: Array<() => unknown> = [
    (): unknown => getWorkerByID(0),
    (): unknown => new Encyclopedia("", 2000, 1),
    (): unknown => new Encyclopedia("Future", 3000, 1),
    (): unknown => new Encyclopedia("Broken", 2000, -1),
    (): void => favoriteLibrarian.assistCustomer(""),
    (): void => {
        refBook.publisher = "  ";
    },
];
invalidCalls.forEach((call: () => unknown): void => {
    try {
        call();
    } catch (error: unknown) {
        console.log(`Помилка: ${error instanceof Error ? error.message : String(error)}`);
    }
});