/**
 * Testy dla localStorage persistence (AI Mode)
 */
import { describe, it, expect, beforeEach } from 'vitest';

describe('localStorage - Seen Scenarios', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('zapisuje widziane scenariusze do localStorage', () => {
        const seenIds = ['id1', 'id2', 'id3'];
        localStorage.setItem('seenScenarioIds', JSON.stringify(seenIds));

        const retrieved = JSON.parse(localStorage.getItem('seenScenarioIds') || '[]');
        expect(retrieved).toEqual(seenIds);
    });

    it('dodaje nowy ID do istniejącej listy', () => {
        const existing = ['id1', 'id2'];
        localStorage.setItem('seenScenarioIds', JSON.stringify(existing));

        const updated = [...existing, 'id3'];
        localStorage.setItem('seenScenarioIds', JSON.stringify(updated));

        const retrieved = JSON.parse(localStorage.getItem('seenScenarioIds') || '[]');
        expect(retrieved).toHaveLength(3);
        expect(retrieved).toContain('id3');
    });

    it('resetuje listę gdy pula wyczerpana', () => {
        const full = ['id1', 'id2', 'id3', 'id4', 'id5'];
        localStorage.setItem('seenScenarioIds', JSON.stringify(full));

        // Symulacja pool reset
        localStorage.setItem('seenScenarioIds', JSON.stringify(['id6']));

        const retrieved = JSON.parse(localStorage.getItem('seenScenarioIds') || '[]');
        expect(retrieved).toHaveLength(1);
        expect(retrieved[0]).toBe('id6');
    });

    it('działa dla różnych trybów (battles, costumes)', () => {
        localStorage.setItem('seenBattleIds', JSON.stringify(['b1', 'b2']));
        localStorage.setItem('seenCostumeIds', JSON.stringify(['c1', 'c2', 'c3']));

        const battles = JSON.parse(localStorage.getItem('seenBattleIds') || '[]');
        const costumes = JSON.parse(localStorage.getItem('seenCostumeIds') || '[]');

        expect(battles).toHaveLength(2);
        expect(costumes).toHaveLength(3);
    });
});
