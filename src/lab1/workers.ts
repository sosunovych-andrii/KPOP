import { Category, Worker, WorkerInfo } from "./types";
import { assertCategory, assertNonEmptyString, assertPositiveInteger } from "./validation";

export function getAllWorkers(): Worker[] {
    const workers: Worker[] = [
        { id: 1, name: "Danylo", surname: "Romanovych", available: false, salary: 1000, category: Category.Developer },
        { id: 2, name: "Pavlo", surname: "Skoropadskyi", available: true, salary: 1500, category: Category.Designer },
        { id: 3, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600, category: Category.QA },
        { id: 4, name: "Jarema", surname: "Vyshnevetskyi", available: true, salary: 1300, category: Category.Developer },
        { id: 5, name: "Ivan", surname: "Mazepa", available: true, salary: 1700, category: Category.BusinessAnalyst },
        { id: 6, name: "Bohdan", surname: "Khmelnytskyi", available: false, salary: 1800, category: Category.ScrumMaster },
        { id: 7, name: "Petro", surname: "Sahaidachnyi", available: true, salary: 1400, category: Category.Designer },
    ];
    return workers;
}

export function logFirstAvailable(workers: Worker[] = getAllWorkers()): void {
    if (!Array.isArray(workers)) {
        throw new Error("workers має бути масивом");
    }

    console.log(`Кількість робітників: ${workers.length}`);

    for (const worker of workers) {
        if (worker.available) {
            console.log(`Перший доступний робітник: ${worker.name} ${worker.surname}`);
            return;
        }
    }

    console.log(`Доступних робітників немає`);
}

export function getWorkersSurnamesByCategory(category: Category = Category.Designer): Array<string> {
    assertCategory(category);

    const surnames: Array<string> = [];
    for (const worker of getAllWorkers()) {
        if (worker.category === category) {
            surnames.push(worker.surname);
        }
    }
    return surnames;
}

export function logWorkersNames(names: string[]): void {
    if (names.length === 0) {
        console.log(`(список порожній)`);
        return;
    }
    for (const name of names) {
        console.log(`  - ${name}`);
    }
}

export function logDevelopers(): void {
    getAllWorkers()
        .filter((worker: Worker): boolean => worker.category === Category.Developer)
        .forEach((worker: Worker): void => console.log(`  - ${worker.name} ${worker.surname}`));
}

export function getWorkerByID(id: number): WorkerInfo | undefined {
    assertPositiveInteger(id, "id робітника");

    const worker: Worker | undefined = getAllWorkers().find((w: Worker): boolean => w.id === id);
    if (worker === undefined) {
        return undefined;
    }

    const { name, surname, salary, available }: WorkerInfo = worker;
    return { name, surname, salary, available };
}

export function checkoutWorkers(customer: string, ...workerIDs: number[]): string[] {
    assertNonEmptyString(customer, "Ім'я замовника");

    console.log(`Замовник: ${customer}`);

    const availableWorkers: string[] = [];
    for (const id of workerIDs) {
        const worker: WorkerInfo | undefined = getWorkerByID(id);
        if (worker === undefined) {
            console.log(`  Робітника з id=${id} не знайдено`);
            continue;
        }
        if (worker.available) {
            availableWorkers.push(`${worker.name} ${worker.surname}`);
        }
    }
    return availableWorkers;
}