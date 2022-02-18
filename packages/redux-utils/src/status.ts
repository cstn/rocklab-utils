/**
 * @fileOverview standard status for states
 */

enum Status {
  Idle = 'idle',
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected',
}

const isIdle = (status: Status) => status === Status.Idle;
const isPending = (status: Status) => status === Status.Pending;
const isResolved = (status: Status) => status === Status.Resolved;
const isRejected = (status: Status) => status === Status.Rejected;

export { Status, isIdle, isPending, isRejected, isResolved };
