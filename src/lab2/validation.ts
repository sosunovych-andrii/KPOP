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

export function assertYear(value: number): void {
    const currentYear: number = new Date().getFullYear();
    if (!Number.isInteger(value) || value < 0 || value > currentYear) {
        throw new Error(`Рік має бути цілим числом від 0 до ${currentYear}, отримано: ${value}`);
    }
}