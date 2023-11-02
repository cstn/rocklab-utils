import { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import { v1 } from 'uuid';
import { TraceField } from './fields';

type TraceContext = {
  parentId?: string;
  requestId?: string;
  spanId?: string;
  traceId?: string;
  transactionId?: string;
};

const TRACE_CONTEXT = 'trace-context';

const generateTraceId = (): string => v1().replace('-', '');

const getTraceContext = (name: keyof TraceContext): string | undefined => {
  const context = httpContext.get(TRACE_CONTEXT) as TraceContext;

  return context[name];
};

const setTraceContext = (context: TraceContext) => {
  httpContext.set(TRACE_CONTEXT, context);
};

const trace = (req: Request, res: Response, next: NextFunction) => {
  const parentId = req.header(TraceField.ParentId);
  const requestId = req.header(TraceField.RequestId);
  const spanId = req.header(TraceField.ParentId);
  const traceId = req.header(TraceField.TraceId) || generateTraceId();
  const transactionId = req.header(TraceField.TransactionId);

  setTraceContext({
    parentId,
    requestId,
    spanId,
    traceId,
    transactionId,
  });

  next();
};

export default trace;
export { getTraceContext };
