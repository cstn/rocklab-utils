import { createHydrateAction } from './hydrate';

describe('hydrate utils', () => {
  describe('createHydrateAction', () => {
    it('should create a redux toolkit hydrate action', () => {
      const result = createHydrateAction({
        firstReducer: {
          firstQuery: { id: 1 },
          secondQuery: { id: 2 },
        },
        secondReducer: {
          thirdQuery: { id: 3 },
        },
      });

      expect(result).toMatchInlineSnapshot(`
        {
          "payload": {
            "firstReducer": {
              "mutations": {},
              "provided": {},
              "queries": {
                "firstQuery": {
                  "data": {
                    "id": 1,
                  },
                  "status": "fulfilled",
                },
                "secondQuery": {
                  "data": {
                    "id": 2,
                  },
                  "status": "fulfilled",
                },
              },
            },
            "secondReducer": {
              "mutations": {},
              "provided": {},
              "queries": {
                "thirdQuery": {
                  "data": {
                    "id": 3,
                  },
                  "status": "fulfilled",
                },
              },
            },
          },
          "type": "hydrate",
        }
      `);
    });
  });
});
