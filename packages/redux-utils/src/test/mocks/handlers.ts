import { rest } from 'msw';
import data from './data';

const handlers = [
  rest.get('/items', (req, res, ctx) => {
    const offset = req.url.searchParams.has('offset') ? parseInt(req.url.searchParams.get('offset') as string, 10) : 0;
    const limit = req.url.searchParams.has('limit')
      ? parseInt(req.url.searchParams.get('limit') as string, 10)
      : data.length;
    const name = req.url.searchParams.get('name');

    const filteredData = data.filter((item) => !name || item.name === name);

    if (!filteredData.length) {
      return res(
        ctx.status(404),
        ctx.json({
          message: `No items found`,
        })
      );
    }

    const result = {
      offset,
      limit,
      count: filteredData.slice(offset, offset + limit).length,
      total: data.length,
      items: filteredData.slice(offset, offset + limit),
    };

    return res(ctx.json(result));
  }),

  rest.get('/items/:id', (req, res, ctx) => {
    const { id } = req.params;
    const parsedId = parseInt(id as string, 10);

    if (!parsedId) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid id' }));
    }

    const result = data.find((item) => item.id === parsedId);
    if (!result) {
      return res(ctx.status(404), ctx.json({ message: `Item with id ${id as string} not found` }));
    }

    return res(ctx.json(result));
  }),
];

export default handlers;
