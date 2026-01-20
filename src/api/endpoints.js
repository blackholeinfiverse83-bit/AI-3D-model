import apiClient from './client';

// Existing local backend endpoints
export const generateDesign = async (prompt) => {
    const response = await apiClient.post('/generate', { prompt });
    return response.data;
};

export const iterateDesign = async (baseDesignId, instructions) => {
    const response = await apiClient.post('/iterate', { designId: baseDesignId, instructions });
    return response.data;
};

export const evaluateDesign = async (designId, rating, feedback) => {
    const response = await apiClient.post('/evaluate', { designId, rating, feedback });
    return response.data;
};

export const getHistory = async () => {
    const response = await apiClient.get('/history');
    return response.data;
};

