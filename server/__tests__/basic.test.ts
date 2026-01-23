/**
 * Minimalny test dla backendu
 * Weryfikuje podstawową funkcjonalność testową
 */

describe('Backend Setup', () => {
    test('podstawowy test matematyczny działa', () => {
        expect(1 + 1).toBe(2);
    });

    test('środowisko testowe jest skonfigurowane', () => {
        expect(process.env.NODE_ENV).toBeDefined();
    });
});
