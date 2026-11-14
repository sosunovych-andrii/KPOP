import { PrizeLogger, Worker } from "./interfaces";
import { assertNonEmptyString, assertPositiveInteger } from "./validation";

export const logPrize: PrizeLogger = (prize: string): void => {
    assertNonEmptyString(prize, "Назва премії");
    console.log(`Prize: ${prize}`);
};

export function getAllWorkers(): Worker[] {
    const workers: Worker[] = [
        { id: 1, name: "Danylo", surname: "Romanovych", available: false, salary: 1000, markPrize: logPrize },
        { id: 2, name: "Pavlo", surname: "Skoropadskyi", available: true, salary: 1500, markPrize: logPrize },
        { id: 3, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600, markPrize: logPrize },
        { id: 4, name: "Jarema", surname: "Vyshnevetskyi", available: true, salary: 1300, markPrize: logPrize },
    ];
    return workers;
}

export function getWorkerByID(id: number): Worker | undefined {
    assertPositiveInteger(id, "id робітника");
    return getAllWorkers().find((worker: Worker): boolean => worker.id === id);
}

export function PrintWorker(worker: Worker): void {
    console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}`);
}