import './Header.css';
import logoSrc from '../../assets/logo.png'

const Header = () => {
  return (
    <div className="header header__container">
      <div className="header__content">
        <h1 className="header__logo_text">aned<img className='header__logo_img' src={logoSrc} alt='seedling emoji'/></h1>
      </div>
    </div>
  );
};

export default Header;
