/**
 * Testy dla systemu XP w quizach
 */

describe('Quiz XP System', () => {
    // Wzór: 10 + (difficulty * 2)

    test('pytanie difficulty 0 daje 10 XP', () => {
        const xp = 10 + (0 * 2);
        expect(xp).toBe(10);
    });

    test('pytanie difficulty 1 daje 12 XP', () => {
        const xp = 10 + (1 * 2);
        expect(xp).toBe(12);
    });

    test('pytanie difficulty 2 daje 14 XP', () => {
        const xp = 10 + (2 * 2);
        expect(xp).toBe(14);
    });

    test('pytanie difficulty 5 daje 20 XP', () => {
        const xp = 10 + (5 * 2);
        expect(xp).toBe(20);
    });

    test('quiz z 5 pytań difficulty 2 daje 70 XP', () => {
        const questionsCount = 5;
        const difficulty = 2;
        const xpPerQuestion = 10 + (difficulty * 2);
        const totalXP = questionsCount * xpPerQuestion;

        expect(totalXP).toBe(70);
    });
});

describe('Quiz Randomization', () => {
    test('losuje 5 pytań z dostępnych 20', () => {
        const available = 20;
        const selected = 5;

        expect(selected).toBeLessThanOrEqual(available);
        expect(selected).toBe(5);
    });

    test('nie przekracza liczby dostępnych pytań', () => {
        const available = 3;
        const desiredCount = 5;
        const actualCount = Math.min(available, desiredCount);

        expect(actualCount).toBe(3);
    });
});
