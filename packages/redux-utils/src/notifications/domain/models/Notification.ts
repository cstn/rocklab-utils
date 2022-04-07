import { MessageDescriptor } from 'react-intl';
import NotificationStatus from './Status';
import NotificationType from './Type';

type Message = string | MessageDescriptor;

type Notification = {
  message: Message;
  details?: Message;
  status: NotificationStatus;
  type: NotificationType;
  createdAt: string;
};

export default Notification;
export { Message };
