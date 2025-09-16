// (Responsável: Lucas Durski)
const STORAGE_KEY = 'appNutricao-dados';

export function saveData(data) {
    try {
        const dataString = JSON.stringify(data);
        localStorage.setItem(STORAGE_KEY, dataString);
    } catch (error) {
        console.error("Erro ao salvar os dados no localStorage:", error);
    }
}

export function loadData() {
    try {
    const dataString = localStorage.getItem(STORAGE_KEY);

    if (dataString === null) {
        return getInitialState();
    }

    return JSON.parse(dataString);

    } catch (error) {
    console.error("Erro ao carregar os dados do localStorage:", error);
    return getInitialState();
    }
}

function getInitialState() {
    return {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
    };
}