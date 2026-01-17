
import axios from 'axios';

// Flaga zapobiegająca pętli nieskończonej
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

export const setupAxiosInterceptors = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            // Jeśli błąd to 401 i nie próbowaliśmy jeszcze odświeżać
            if (error.response?.status === 401 && !originalRequest._retry) {

                if (isRefreshing) {
                    // Jeśli odświeżanie już trwa, dodaj zapytanie do kolejki
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return axios(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const refreshToken = localStorage.getItem('refreshToken');

                    if (!refreshToken) {
                        throw new Error('No refresh token available');
                    }

                    const response = await axios.post('http://localhost:3000/auth/refresh', {
                        refreshToken
                    });

                    const { token, refreshToken: newRefreshToken } = response.data;

                    localStorage.setItem('token', token);
                    if (newRefreshToken) {
                        localStorage.setItem('refreshToken', newRefreshToken);
                    }

                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;

                    processQueue(null, token);
                    return axios(originalRequest);

                } catch (refreshError) {
                    processQueue(refreshError, null);
                    // Jeśli odświeżanie się nie uda, wyloguj użytkownika
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
};
