import { warnMessageText } from '../../utils/constants'
import './WarnMessage.scss'

const WarnMessage = () => {
  return (
    <>
      <div className='warn-message'>
        <pre className='warn-message__text'>{warnMessageText}</pre>
      </div>
    </>
  )
}

export default WarnMessage
