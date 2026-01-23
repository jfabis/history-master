/**
 * Testy dla systemu poziomów użytkownika
 * Testuje progresywny system XP bez zależności od bazy danych
 */

// Funkcja obliczająca wymagane XP dla danego poziomu (skopiowana z users.controller.ts)
function getXPForLevel(level: number): number {
    if (level <= 1) return 0;
    if (level <= 5) return (level - 1) * 100;
    return 400 + Math.floor(Math.pow(1.5, level - 5) * 100);
}

function calculateLevel(xp: number): number {
    let level = 1;
    while (true) {
        const nextLevelXP = getXPForLevel(level + 1);
        if (xp < nextLevelXP) return level;
        level++;
        if (level > 100) return 100;
    }
}

describe('User Levels - Progressive XP System', () => {
    describe('getXPForLevel', () => {
        test('poziom 1 wymaga 0 XP', () => {
            expect(getXPForLevel(1)).toBe(0);
        });

        test('poziomy 2-5 wymagają po 100 XP', () => {
            expect(getXPForLevel(2)).toBe(100);
            expect(getXPForLevel(3)).toBe(200);
            expect(getXPForLevel(4)).toBe(300);
            expect(getXPForLevel(5)).toBe(400);
        });

        test('poziom 6 rozpoczyna wzrost wykładniczy', () => {
            expect(getXPForLevel(6)).toBe(550); // 400 + 150
        });

        test('XP rośnie wykładniczo po poziomie 5', () => {
            const xp6 = getXPForLevel(6);
            const xp7 = getXPForLevel(7);
            const xp8 = getXPForLevel(8);

            expect(xp7 - xp6).toBeLessThan(xp8 - xp7);
        });
    });

    describe('calculateLevel', () => {
        test('0-99 XP to poziom 1', () => {
            expect(calculateLevel(0)).toBe(1);
            expect(calculateLevel(50)).toBe(1);
            expect(calculateLevel(99)).toBe(1);
        });

        test('100-199 XP to poziom 2', () => {
            expect(calculateLevel(100)).toBe(2);
            expect(calculateLevel(150)).toBe(2);
            expect(calculateLevel(199)).toBe(2);
        });

        test('400-549 XP to poziom 5', () => {
            expect(calculateLevel(400)).toBe(5);
            expect(calculateLevel(500)).toBe(5);
            expect(calculateLevel(549)).toBe(5);
        });

        test('550+ XP to poziom 6+', () => {
            expect(calculateLevel(550)).toBe(6);
            expect(calculateLevel(1000)).toBeGreaterThan(6);
        });

        test('bardzo wysokie XP osiąga wysokie poziomy', () => {
            const highLevel = calculateLevel(9999999);
            expect(highLevel).toBeGreaterThan(30);
            expect(highLevel).toBeLessThanOrEqual(100);
        });
    });
});
