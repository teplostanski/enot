/* eslint-disable @typescript-eslint/no-explicit-any */
import { THeaderProps } from '../../types'
import './Header.scss'

const Header = (props: THeaderProps) => {
  return (
    <div className='header header__container'>
      <div className='header__content'>
        <h1 className='header__logo_text'>enot</h1>
        <button className='button' onClick={props.onAddNote}>
          Создать
        </button>
      </div>
    </div>
  )
}

export default Header
