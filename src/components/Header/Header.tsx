import './Header.css';
import logoSrc from '../../assets/logo.png'

interface HeaderProps {
  onAddNote: any;
}

const Header = (props: HeaderProps) => {
  return (
    <div className="header header__container">
      <div className="header__content">
        <h1 className="header__logo_text">aned<img className='header__logo_img' src={logoSrc} alt='seedling emoji'/></h1>
        <button className='button' onClick={props.onAddNote}>Создать</button>
      </div>
    </div>
  );
};

export default Header;
