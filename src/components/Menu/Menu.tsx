import { FaCirclePlus } from "react-icons/fa6";
import styles from "./Menu.module.scss";
import { useGlobalContext } from "../../context/SidebarContext";

function Menu() {
  const { sidebarState, setSidebarState } = useGlobalContext();

  function updateValue() {
    setSidebarState(!sidebarState);
  }

  return (
    <>
      <div className={styles.menu}>
        <button className={styles.menu__item} onClick={updateValue}>
          <div className={styles.menu__icon}>
            <FaCirclePlus />
          </div>
          <div className={styles.menu__text}>News</div>
        </button>
      </div>
    </>
  );
}

export default Menu;