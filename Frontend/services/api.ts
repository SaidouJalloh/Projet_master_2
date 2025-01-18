//Code qui marchait normalement sauf la partie alerts
// // app/services/api.ts
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// export const api = {
//     // Propriétés
//     async getProperties() {
//         const response = await fetch(`${API_URL}/properties/`);
//         return response.json();
//     },

//     // Insights du marché
//     async getMarketInsights() {
//         const response = await fetch(`${API_URL}/market-insights`);
//         return response.json();
//     },

//     // Prédiction
//     async getPrediction(data: {
//         surface: number;
//         neighborhood: string;
//         model_type: 'optimized' | 'randomforest';
//     }) {
//         const response = await fetch(`${API_URL}/predict`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });
//         return response.json();
//     },

//     // Alertes
//     async createAlert(alertData: {
//         email: string;
//         min_price?: number;
//         max_price?: number;
//         min_surface?: number;
//         max_surface?: number;
//         neighborhood?: string;
//         property_type?: string;
//     }) {
//         const response = await fetch(`${API_URL}/alerts/`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(alertData)
//         });
//         return response.json();
//     },

//     async getQuartiers() {
//         const response = await fetch(`${API_URL}/available-neighborhoods`);
//         return response.json();
//     }
// };
// app/services/api.ts

//code qui marche bien

// // Types
// export interface Property {
//     id: number;
//     title: string;
//     price: number;
//     surface_m2: number;
//     neighborhood: string;
//     property_type: string;
//     location: string;
//     price_per_m2: number;
// }

// export interface MarketInsight {
//     price_metrics: {
//         average: number;
//         median: number;
//         min: number;
//         max: number;
//         price_per_m2: number;
//     };
//     neighborhood_analysis: Array<{
//         neighborhood: string;
//         total_properties: number;
//         avg_price: number;
//         avg_price_m2: number;
//     }>;
//     property_distribution: Array<{
//         property_type: string;
//         count: number;
//     }>;
// }

// export interface AlertResponse {
//     id: number;
//     email: string;
//     min_price?: number;
//     max_price?: number;
//     min_surface?: number;
//     max_surface?: number;
//     neighborhood?: string;
//     property_type?: string;
//     created_at: string;
// }

// export interface AlertData {
//     email: string;
//     min_price?: number;
//     max_price?: number;
//     min_surface?: number;
//     max_surface?: number;
//     neighborhood?: string;
//     property_type?: string;
// }

// export interface PredictionRequest {
//     surface: number;
//     neighborhood: string;
//     model_type: "optimized" | "randomforest";
// }

// export interface PredictionResponse {
//     model_used: string;
//     surface: number;
//     neighborhood: string;
//     prediction: string;
//     price_exact: string;
// }
// // Ajoutez ces interfaces avec les autres
// export interface TimeMetrics {
//     monthly_prices: Array<{
//         year: number;
//         month: number;
//         avg_price: number;
//         total_properties: number;
//     }>;
//     neighborhood_trends: Array<{
//         neighborhood: string;
//         year: number;
//         month: number;
//         avg_price_m2: number;
//     }>;
// }

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// export const api = {
//     // Propriétés
//     async getProperties(): Promise<Property[]> {
//         const response = await fetch(`${API_URL}/properties/`);
//         if (!response.ok) {
//             throw new Error('Erreur lors de la récupération des propriétés');
//         }
//         return response.json();
//     },

//     // Insights du marché
//     async getMarketInsights(): Promise<MarketInsight> {
//         const response = await fetch(`${API_URL}/market-insights`);
//         if (!response.ok) {
//             throw new Error('Erreur lors de la récupération des insights');
//         }
//         return response.json();
//     },

//     // Prédiction
//     async getPrediction(data: PredictionRequest): Promise<PredictionResponse> {
//         const response = await fetch(`${API_URL}/predict`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });
//         if (!response.ok) {
//             throw new Error('Erreur lors de la prédiction');
//         }
//         return response.json();
//     },

//     // Alertes
//     async createAlert(alertData: AlertData): Promise<AlertResponse> {
//         const response = await fetch(`${API_URL}/alerts/`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(alertData)
//         });
//         if (!response.ok) {
//             throw new Error('Erreur lors de la création de l\'alerte');
//         }
//         return response.json();
//     },

//     // Quartiers disponibles
//     // async getQuartiers(): Promise<{ neighborhoods: string[] }> {
//     //     const response = await fetch(`${API_URL}/available-neighborhoods`);
//     //     if (!response.ok) {
//     //         throw new Error('Erreur lors de la récupération des quartiers');
//     //     }
//     //     return response.json();
//     // },
//     async getQuartiers(): Promise<{ neighborhoods: string[] }> {
//         console.log('Appel API quartiers:', `${API_URL}/available-neighborhoods`); // Log de l'URL
//         try {
//             const response = await fetch(`${API_URL}/available-neighborhoods`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log('Données reçues:', data); // Log des données
//             return data;
//         } catch (error) {
//             console.error('Erreur détaillée fetch:', error); // Log de l'erreur
//             throw error;
//         }
//     },
//     // Autres métriques temporelles
//     async getTimeBasedMetrics() {
//         const response = await fetch(`${API_URL}/time-based-metrics`);
//         if (!response.ok) {
//             throw new Error('Erreur lors de la récupération des métriques temporelles');
//         }
//         return response.json();
//     }
// }
// Types
export interface Property {
    id: number;
    title: string;
    price: number;
    surface_m2: number;
    neighborhood: string;
    property_type: string;
    location: string;
    price_per_m2: number;
}

export interface MarketInsight {
    price_metrics: {
        average: number;
        median: number;
        min: number;
        max: number;
        price_per_m2: number;
    };
    neighborhood_analysis: Array<{
        neighborhood: string;
        total_properties: number;
        avg_price: number;
        avg_price_m2: number;
    }>;
    property_distribution: Array<{
        property_type: string;
        count: number;
    }>;
}

export interface AlertResponse {
    id: number;
    email: string;
    min_price?: number;
    max_price?: number;
    min_surface?: number;
    max_surface?: number;
    neighborhood?: string;
    property_type?: string;
    created_at: string;
}

export interface AlertData {
    email: string;
    min_price?: number;
    max_price?: number;
    min_surface?: number;
    max_surface?: number;
    neighborhood?: string;
    property_type?: string;
}

export interface PredictionRequest {
    surface: number;
    neighborhood: string;
    model_type: "optimized" | "randomforest";
}

export interface PredictionResponse {
    model_used: string;
    surface: number;
    neighborhood: string;
    prediction: string;
    price_exact: string;
}

export interface TimeMetrics {
    monthly_prices: Array<{
        year: number;
        month: number;
        avg_price: number;
        total_properties: number;
        neighborhood: string;
    }>;
    neighborhood_trends: Array<{
        neighborhood: string;
        year: number;
        month: number;
        avg_price_m2: number;
    }>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = {
    async getProperties(): Promise<Property[]> {
        const response = await fetch(`${API_URL}/properties/`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des propriétés');
        }
        return response.json();
    },

    async getMarketInsights(): Promise<MarketInsight> {
        const response = await fetch(`${API_URL}/market-insights`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des insights');
        }
        return response.json();
    },

    async getPrediction(data: PredictionRequest): Promise<PredictionResponse> {
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la prédiction');
        }
        return response.json();
    },

    async createAlert(alertData: AlertData): Promise<AlertResponse> {
        const response = await fetch(`${API_URL}/alerts/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alertData)
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'alerte');
        }
        return response.json();
    },

    async getQuartiers(): Promise<{ neighborhoods: string[] }> {
        console.log('Appel API quartiers:', `${API_URL}/available-neighborhoods`);
        try {
            const response = await fetch(`${API_URL}/available-neighborhoods`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Données reçues:', data);
            return data;
        } catch (error) {
            console.error('Erreur détaillée fetch:', error);
            throw error;
        }
    },

    async getTimeBasedMetrics(): Promise<TimeMetrics> {
        const response = await fetch(`${API_URL}/time-based-metrics`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des métriques temporelles');
        }
        return response.json();
    }
};