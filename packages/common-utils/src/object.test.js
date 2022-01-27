import { shallowClone, deepClone, map } from './object';

describe('object utils', () => {
  describe('shallowClone', () => {
    it('should shallowClone an object', () => {
      const original = {
        a: 1,
        b: 2,
      };

      const shallowCloned = shallowClone(original);

      expect(shallowCloned).toEqual(original);

      shallowCloned.a = 3;
      original.b = 5;

      expect(original).toEqual({
        a: 1,
        b: 5,
      });
      expect(shallowCloned).toEqual({
        a: 3,
        b: 2,
      });
    });

    it('should shallowClone an array', () => {
      const original = [1, 2];

      const shallowCloned = shallowClone(original);

      expect(shallowCloned).toEqual(original);

      shallowCloned[0] = 3;
      original[1] = 5;

      expect(original).toEqual([1, 5]);
      expect(shallowCloned).toEqual([3, 2]);
    });

    it('should shallowClone a set', () => {
      const original = new Set();
      original.add(1);
      original.add(2);

      const shallowCloned = shallowClone(original);

      expect(shallowCloned).toEqual(original);

      original.clear();

      expect(shallowCloned.has(1)).toBeTruthy();
      expect(shallowCloned.has(2)).toBeTruthy();
    });

    it('should shallowClone a map', () => {
      const original = new Map();
      original.set('a', 1);
      original.set('b', 2);

      const shallowCloned = shallowClone(original);

      expect(shallowCloned).toEqual(original);

      shallowCloned.set('a', 3);
      original.set('b', 5);

      expect(original.get('a')).toEqual(1);
      expect(original.get('b')).toEqual(5);
      expect(shallowCloned.get('a')).toEqual(3);
      expect(shallowCloned.get('b')).toEqual(2);
    });

    it('should shallowClone a date', () => {
      const original = new Date('2022-01-01');

      const shallowCloned = shallowClone(original);

      expect(shallowCloned).toEqual(original);

      original.setFullYear(2020);

      expect(original.toISOString().substring(0, 10)).toEqual('2020-01-01');
      expect(shallowCloned.toISOString().substring(0, 10)).toEqual('2022-01-01');
    });

    it('should handle shallow clone null', () => {
      const shallowCloned = shallowClone(null);

      expect(shallowCloned).toBeNull();
    });

    it('should handle shallow clone undefined', () => {
      const shallowCloned = shallowClone(undefined);

      expect(shallowCloned).toBeUndefined();
    });
  });

  describe('deepClone', () => {
    it('should deep clone an object', () => {
      const original = {
        a: 1,
        b: 2,
        c: {
          x: 1,
          y: 2,
        },
      };

      const deepCloned = deepClone(original);

      expect(deepCloned).toEqual(original);

      original.c.x = 3;
      deepCloned.c.y = 4;

      expect(original).toEqual({
        a: 1,
        b: 2,
        c: {
          x: 3,
          y: 2,
        },
      });
      expect(deepCloned).toEqual({
        a: 1,
        b: 2,
        c: {
          x: 1,
          y: 4,
        },
      });
    });

    it('should deep clone an array', () => {
      const original = [1, [2, 3]];

      const deepCloned = deepClone(original);

      expect(deepCloned).toEqual(original);

      original[1][0] = 3;
      deepCloned[1][1] = 4;

      expect(original).toEqual([1, [3, 3]]);
      expect(deepCloned).toEqual([1, [2, 4]]);
    });

    it('should handle deep clone null', () => {
      const deepCloned = deepClone(null);

      expect(deepCloned).toBeNull();
    });

    it('should handle deep clone undefined', () => {
      const deepCloned = deepClone(undefined);

      expect(deepCloned).toBeUndefined();
    });
  });

  describe('map', () => {
    it('should map object properties', () => {
      const original = {
        a: 1,
        b: 2,
      };

      const expected = {
        a: 2,
        b: 4,
      };

      const mapped = map(original, (x) => x * 2);

      expect(mapped).toEqual(expected);
    });

    it('should map array items', () => {
      const original = [1, 2];

      const expected = [2, 4];

      const mapped = map(original, (x) => x * 2);

      expect(mapped).toEqual(expected);
    });
  });
});
