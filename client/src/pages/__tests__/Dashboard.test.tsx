/**
 * Testy komponentu Dashboard
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '../Dashboard';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('Dashboard Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.setItem('token', 'fake-token');
    });

    it('renderuje stan ładowania i pobiera dane użytkownika', async () => {
        // Setup mocka
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                id: '1',
                email: 'test@example.com',
                displayName: 'Test User',
                progress: {
                    level: 5,
                    xp: 450,
                    xpProgress: 50,
                    xpNeeded: 100,
                    totalActiveDays: 3
                }
            }
        });

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        // Sprawdź czy wywołano API
        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/users/me', expect.any(Object));

        // Czekaj na załadowanie danych
        await waitFor(() => {
            expect(screen.getByText('Test User')).toBeInTheDocument();
            expect(screen.getByText('Poziom 5 • Kronikarz')).toBeInTheDocument();
            expect(screen.getByText('450 XP')).toBeInTheDocument();
        });
    });

    it('przekierowuje do logowania jeśli brak tokenu', () => {
        localStorage.removeItem('token');

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(mockedNavigate).toHaveBeenCalledWith('/');
    });

    it('obsługuje błąd API i wylogowuje użytkownika', async () => {
        // Suppress console.error for this test as we expect an error log
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        mockedAxios.get.mockRejectedValueOnce(new Error('Unauthorized'));

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/');
        });

        // Restore console.error
        consoleSpy.mockRestore();
    });

    it('renderuje 4 główne moduły (Księga, Test, Oś Czasu, AI)', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: { displayName: 'User' } });

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Księga Wiedzy')).toBeInTheDocument();
            expect(screen.getByText('Wielki Test')).toBeInTheDocument();
            expect(screen.getByText('Oś Czasu')).toBeInTheDocument();
            expect(screen.getByText('Wizje AI')).toBeInTheDocument();
        });
    });
});
