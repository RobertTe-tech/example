// dataUtils.js

export function saveData(key, data) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
}

export function loadData(key) {
    const jsonData = localStorage.getItem(key);

    if (jsonData) {
        try {
            const data = JSON.parse(jsonData);
            return data;
        } catch (error) {
            console.error(`Error parsing ${key} data:`, error);
        }
    }

    return null;
}