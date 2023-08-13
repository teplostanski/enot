/* eslint-disable @typescript-eslint/no-explicit-any */
import './Header.css';

interface HeaderProps {
  onAddNote: any;
}

const Header = (props: HeaderProps) => {
  return (
    <>
      <div className="header header__container">
        <div className="header__content">
          <h1 className="header__logo_text">
            enot
          </h1>
          <button className="button" onClick={props.onAddNote}>
            Создать
          </button>
        </div>
      </div>
      {/*<div className="line"></div>*/}
    </>
  );
};

export default Header;
