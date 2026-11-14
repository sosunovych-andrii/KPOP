import { Category } from "./types";

export function assertNonEmptyString(value: string, field: string): void {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`${field} має бути непорожнім рядком`);
    }
}

export function assertPositiveInteger(value: number, field: string): void {
    if (!Number.isInteger(value) || value <= 0) {
        throw new Error(`${field} має бути цілим додатним числом, отримано: ${value}`);
    }
}

export function assertValidAge(age: number): void {
    if (!Number.isInteger(age) || age < 0 || age > 150) {
        throw new Error(`Вік має бути цілим числом від 0 до 150, отримано: ${age}`);
    }
}

export function assertCategory(value: Category): void {
    const categories: string[] = Object.values(Category);
    if (!categories.includes(value)) {
        throw new Error(`Невідома категорія: ${value}`);
    }
}