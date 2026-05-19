const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
    ) {
        super(message);
    }
}

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new ApiError("Ocorreu um erro ao efetuar a requisição", response.status);
    }

    return response.json() as Promise<T>;
}
