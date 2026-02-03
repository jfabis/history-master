


describe('Basic Vitest Setup', () => {
    it('powinien działać podstawowy test matematyczny', () => {
        expect(1 + 1).toBe(2);
    });

    it('powinien działać test stringów', () => {
        expect('Hello World').toContain('World');
    });

    it('powinien działać test array', () => {
        const topics = ['Starożytność', 'Średniowiecze', 'Nowożytność'];
        expect(topics).toHaveLength(3);
        expect(topics).toContain('Starożytność');
    });
});
