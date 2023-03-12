import './WarnPopup.css';
import { warnText } from '../../utils/constants';

const WarnPopup = () => {
  return (
    <>
      <div className="warn-popup">
        <pre className="warn-popup__text">{warnText}</pre>
      </div>
    </>
  );
};

export default WarnPopup;
