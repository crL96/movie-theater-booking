const API_URL = import.meta.env.VITE_API_URL;

async function apiRequest(endpoint, options = {}) {
    const res = await fetch(API_URL + endpoint, {
        headers: {
            "Content-Type": "Application/JSON",
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        throw new Error("API request failed: " + res.status, {
            cause: res.status,
        });
    }

    return await res.json();
}

export { apiRequest };
