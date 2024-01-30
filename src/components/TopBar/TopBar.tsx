import { useSidebarContext } from "../../context/SidebarContext";
import { useUserContext } from "../../context/UserContext";
import styles from "./TopBar.module.scss";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";

export function TopBar() {
  const { currentUser, setCurrentUser } = useUserContext();
  const { setSidebarState } = useSidebarContext();

  function logout() {
    setSidebarState(false);
    setCurrentUser(null);
  }

  return (
    <>
      {currentUser && (
        <div className={styles.topbar}>
          <div className={styles.topbar__inner}>
            <div className={styles.topbar__left}></div>
            <div className={styles.topbar__right}>
              <div className={styles.topbar__user}>{currentUser.username}</div>
              <div className={styles.topbar__mail}>
                <MdEmail />
                {currentUser.email}
              </div>
              <div className={styles.topbar__role}>
                {currentUser.role === "admin" ? <GrUserAdmin /> : <FaUser />}
                {currentUser.role}
              </div>
              <button type="button" className={styles.topbar__logout} onClick={logout}>
                <MdLogout />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
