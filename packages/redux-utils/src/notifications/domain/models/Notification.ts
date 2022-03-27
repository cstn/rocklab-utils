import { MessageDescriptor } from 'react-intl';
import NotificationStatus from './status';
import NotificationType from './Type';

type Message = string | MessageDescriptor;

type Notification = {
  message: Message;
  details?: Message;
  status: NotificationStatus;
  type: NotificationType;
  createdAt: Date;
};

export default Notification;
export { Message };
