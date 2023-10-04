export const setItem = (key: string, item: any) => {
    if (!key || !item) {
        throw new Error('key and item cannot be empty');
    }
    return localStorage.setItem(key, item);
};

export const getItem = (key: string) => {
    if (!key) {
        throw new Error('key cannot be empty');
    }
    return localStorage.getItem(key);
};

export const removeItem = (key: string) => {
    if (!key) {
        throw new Error('key cannot be empty');
    }
    return localStorage.removeItem(key);
};
