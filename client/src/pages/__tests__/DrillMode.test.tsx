import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import DrillMode from '../DrillMode';

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

describe('DrillMode Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.setItem('token', 'fake-token');
    });

    const mockTopics = [
        { id: '1', name: 'Starożytny Rzym', description: 'Opis Rzymu', _count: { questions: 10 } },
        { id: '2', name: 'II Wojna Światowa', description: 'Opis WW2', _count: { questions: 15 } }
    ];

    const mockQuestions = [
        {
            id: 'q1',
            content: 'Kto był pierwszym cesarzem?',
            options: ['August', 'Neron', 'Cezar', 'Trajan'],
            xpValue: 10,
            difficulty: 1
        }
    ];

    it('renderuje listę tematów po załadowaniu', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockTopics });

        render(
            <BrowserRouter>
                <DrillMode />
            </BrowserRouter>
        );

        // Sprawdzamy nagłówek
        expect(screen.getByText(/wybierz księgę wiedzy/i)).toBeInTheDocument();

        // Czekamy na tematy
        await waitFor(() => {
            expect(screen.getByText('Starożytny Rzym')).toBeInTheDocument();
            expect(screen.getByText('II Wojna Światowa')).toBeInTheDocument();
            expect(screen.getByText('10 Pytań')).toBeInTheDocument();
        });
    });

    it('rozpoczyna quiz po kliknięciu w temat', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockTopics }); // Topics load

        render(
            <BrowserRouter>
                <DrillMode />
            </BrowserRouter>
        );

        await waitFor(() => screen.getByText('Starożytny Rzym'));

        // Mock quiz fetch
        mockedAxios.get.mockResolvedValueOnce({ data: mockQuestions });

        // Kliknij w temat
        fireEvent.click(screen.getByText('Starożytny Rzym'));

        // Sprawdź czy pojawiło się pytanie
        await waitFor(() => {
            expect(screen.getByText('Kto był pierwszym cesarzem?')).toBeInTheDocument();
            // Sprawdź czy nagłówek się zmienił
            expect(screen.getByText('Starożytny Rzym')).toBeInTheDocument();
        });
    });

    it('obsługuje udzielenie odpowiedzi i wyświetla feedback', async () => {
        // Setup stanu quizu (mocking implementation details setup via chained calls is hard in integration, 
        // playing through flow is better)

        mockedAxios.get
            .mockResolvedValueOnce({ data: mockTopics }) // 1. Topics
            .mockResolvedValueOnce({ data: mockQuestions }); // 2. Quiz questions

        render(<BrowserRouter><DrillMode /></BrowserRouter>);

        // Start Quiz
        await waitFor(() => screen.getByText('Starożytny Rzym'));
        fireEvent.click(screen.getByText('Starożytny Rzym'));
        await waitFor(() => screen.getByText('Kto był pierwszym cesarzem?'));

        // Mock Answer Response
        mockedAxios.post.mockResolvedValueOnce({
            data: {
                correct: true,
                correctAnswer: 'August',
                explanation: 'Oktawian August został pierwszym cesarzem w 27 p.n.e.',
                xpGained: 10
            }
        });

        // Click Answer
        fireEvent.click(screen.getByText('August'));

        // Wait for Feedback
        await waitFor(() => {
            expect(screen.getByText('Wspaniale!')).toBeInTheDocument();
            expect(screen.getByText(/Oktawian August/)).toBeInTheDocument();
            expect(screen.getByText('Zakończ Test')).toBeInTheDocument();
        });
    });
});
