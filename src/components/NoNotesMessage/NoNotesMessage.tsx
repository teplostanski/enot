import WarnMessage from '../WarnMessage/WarnMessage'
import './NoNotesMessage.scss'

const NoNotesMessage = () => {
  return (
    <div className='no-notes-message'>
      <WarnMessage />
      <div className='no-notes-message__container'>
        <span className='no-notes-message__text'>Заметок нет</span>
      </div>
    </div>
  )
}

export default NoNotesMessage
