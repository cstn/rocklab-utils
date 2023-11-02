import { IncomingMessage, ServerResponse } from 'http';
import type { Request as ExpressRequest } from 'express';
import type { FormatFn } from 'morgan';
import morgan, { TokenIndexer } from 'morgan';
import { Logger } from 'winston';
import { TraceField } from './fields';

const getRequestHeader = (req: ExpressRequest | IncomingMessage, name: string): string | undefined => {
  if ((req as IncomingMessage).headers[name]) {
    return (req as IncomingMessage).headers[name] as string;
  }
  if ((req as ExpressRequest).header?.(name)) {
    return (req as ExpressRequest).header(name) as string;
  }
  if ((req as ExpressRequest).params?.[name]) {
    return (req as ExpressRequest).params[name];
  }
  if ((req as ExpressRequest).query?.[name]) {
    return (req as ExpressRequest).query[name] as string;
  }

  return undefined;
};

// trace header
morgan.token('parentId', (req) => getRequestHeader(req, TraceField.ParentId));
morgan.token('requestId', (req) => getRequestHeader(req, TraceField.RequestId));
morgan.token('spanId', (req) => getRequestHeader(req, TraceField.SpanId));
morgan.token('traceId', (req) => getRequestHeader(req, TraceField.TraceId));
morgan.token('transactionId', (req) => getRequestHeader(req, TraceField.TransactionId));

/**
 * morgan format function
 * @param tokens
 * @param req
 * @param res
 */
const format = <Request extends IncomingMessage, Response extends ServerResponse>(
  tokens: TokenIndexer<Request, Response>,
  req: Request,
  res: Response
): string =>
  JSON.stringify({
    method: tokens.method(req, res) || null,
    url: tokens.url(req, res) || null,
    status: tokens.status(req, res) ? Number.parseFloat(tokens.status(req, res) as string) : null,
    content_length: tokens.res(req, res, 'content-length') || null,
    response_time: tokens['response-time'](req, res)
      ? Number.parseFloat(tokens['response-time'](req, res) as string)
      : null,
    parentId: tokens.requestId(req, res),
    requestId: tokens.requestId(req, res),
    spanId: tokens.spanId(req, res),
    traceId: tokens.traceId(req, res),
    transactionId: tokens.transactionId(req, res),
  });

/**
 * generates morgan write function using logger
 * @param {Logger} logger the logger to use
 * @param {String} text the text for the logging message
 */
const write =
  (logger: Logger, text: string = 'Incoming request') =>
  (message: string) => {
    try {
      const data: unknown = JSON.parse(message);

      if ((data as { status: number }).status >= 500) {
        logger.error(text, data);
      } else {
        logger.info(text, data);
      }
    } catch (ex) {
      logger.info(text, message);
    }
  };

/**
 * generates morgan middleware for request logging
 * @param {Logger} logger the logger to use
 * @param {String} text the text for the logging message that will be logged among with the request data
 */
const morganMiddleware = <Request extends IncomingMessage, Response extends ServerResponse>(
  logger: Logger,
  text: string = 'Incoming request'
) =>
  morgan<Request, Response>(format as FormatFn<Request, Response>, {
    stream: {
      write: write(logger, text),
    },
  });

export default morganMiddleware;
