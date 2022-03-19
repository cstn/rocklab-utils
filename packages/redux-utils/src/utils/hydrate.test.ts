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
        Object {
          "payload": Object {
            "firstReducer": Object {
              "mutations": Object {},
              "provided": Object {},
              "queries": Object {
                "firstQuery": Object {
                  "data": Object {
                    "id": 1,
                  },
                  "status": "fulfilled",
                },
                "secondQuery": Object {
                  "data": Object {
                    "id": 2,
                  },
                  "status": "fulfilled",
                },
              },
            },
            "secondReducer": Object {
              "mutations": Object {},
              "provided": Object {},
              "queries": Object {
                "thirdQuery": Object {
                  "data": Object {
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
