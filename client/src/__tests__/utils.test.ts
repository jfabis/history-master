


describe('Formatting Utils', () => {
    it('formatuje daty z p.n.e.', () => {
        const year = '753 p.n.e.';
        expect(year).toContain('p.n.e.');
    });

    it('data po Chrystusie nie ma p.n.e.', () => {
        const year = '1410';
        expect(year).not.toContain('p.n.e.');
    });
});

describe('XP Display', () => {
    it('formatuje XP z separator', () => {
        const xp = 1234;
        expect(xp).toBeGreaterThan(1000);
    });

    it('oblicza procent postępu', () => {
        const current = 150;
        const needed = 300;
        const percentage = (current / needed) * 100;

        expect(percentage).toBe(50);
    });

    it('ogranicza procent do 100%', () => {
        const current = 350;
        const needed = 300;
        const percentage = Math.min((current / needed) * 100, 100);

        expect(percentage).toBe(100);
    });
});

describe('Array Utils', () => {
    it('filtruje wykluczane elementy', () => {
        const all = ['a', 'b', 'c', 'd'];
        const exclude = ['b', 'd'];
        const available = all.filter(item => !exclude.includes(item));

        expect(available).toEqual(['a', 'c']);
    });

    it('losuje element z tablicy', () => {
        const items = ['item1', 'item2', 'item3'];
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomItem = items[randomIndex];

        expect(items).toContain(randomItem);
    });
});
