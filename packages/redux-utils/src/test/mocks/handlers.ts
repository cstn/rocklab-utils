import { http, HttpResponse } from 'msw';
import data from './data';

const handlers = [
  http.get('/items', ({ request }) => {
    const url = new URL(request.url);

    const offset = url.searchParams.has('offset') ? parseInt(url.searchParams.get('offset') as string, 10) : 0;
    const limit = url.searchParams.has('limit') ? parseInt(url.searchParams.get('limit') as string, 10) : data.length;
    const name = url.searchParams.get('name');

    const filteredData = data.filter((item) => !name || item.name === name);

    if (!filteredData.length) {
      HttpResponse.json(
        {
          message: `No items found`,
        },
        { status: 404 }
      );
    }

    const result = {
      offset,
      limit,
      count: filteredData.slice(offset, offset + limit).length,
      total: data.length,
      items: filteredData.slice(offset, offset + limit),
    };

    return HttpResponse.json(result);
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  http.get('/items/:id', ({ params }) => {
    const { id } = params;
    const parsedId = parseInt(id as string, 10);

    if (!parsedId) {
      return HttpResponse.json({ message: 'Invalid id' }, { status: 400 });
    }

    const result = data.find((item) => item.id === parsedId);
    if (!result) {
      return HttpResponse.json({ message: `Item with id ${id as string} not found` }, { status: 404 });
    }

    return HttpResponse.json(result);
  }),
];

export default handlers;
