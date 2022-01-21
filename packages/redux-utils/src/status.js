/**
 * @fileOverview standard status for states
 */

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const isIdle = (status) => status === STATUS.IDLE;
const isPending = (status) => status === STATUS.PENDING;
const isResolved = (status) => status === STATUS.RESOLVED;
const isRejected = (status) => status === STATUS.REJECTED;

export { STATUS, isIdle, isPending, isRejected, isResolved };
