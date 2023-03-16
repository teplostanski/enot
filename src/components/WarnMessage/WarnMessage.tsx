import './WarnMessage.css';
import { warnMessageText } from '../../utils/constants';

const WarnMessage = () => {
  return (
    <>
      <div className="warn-message">
        <pre className="warn-message__text">{warnMessageText}</pre>
      </div>
    </>
  );
};

export default WarnMessage;
