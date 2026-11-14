export enum Category {
    BusinessAnalyst = "Business analyst",
    Developer = "Developer",
    Designer = "Designer",
    QA = "QA",
    ScrumMaster = "Scrum master",
}

export interface Worker {
    id: number;
    name: string;
    surname: string;
    available: boolean;
    salary: number;
    category: Category;
}

export type WorkerInfo = Pick<Worker, "name" | "surname" | "salary" | "available">;

export type IdGenerator = (name: string, id: number) => string;

export interface Student {
    name: string;
    listNumber: number;
    group: string;
    hobby: string;
}