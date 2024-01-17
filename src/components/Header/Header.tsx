import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from "./Header.module.scss";
import Menu from "../Menu/Menu";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__inner}>
          <div className={styles.header__left}>
            <Link to="/">
              <img className={styles.header__logo} src={logo} />
              <div className={styles.header__title}>JarJar News</div>
            </Link>
          </div>
          <div className={styles.header__right}>
            <Menu />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
