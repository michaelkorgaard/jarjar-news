import { useSidebarContext } from "../../context/SidebarContext";
import { useUserContext } from "../../context/UserContext";
import { UserType } from "../../types/UserType";
import styles from "./TopBar.module.scss";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export function TopBar() {
  const { user, setUser } = useUserContext();
  const { setSidebarState } = useSidebarContext();

  function logout() {
    let user: UserType = {
      username: "",
      role: "",
      password: "",
    };

    const noUser = user;
    setUser(noUser);
    setSidebarState(false);
  }

  return (
    <>
      {user?.username && (
        <div className={styles.topbar}>
          <div className={styles.topbar__inner}>
            <div className={styles.topbar__left}></div>
            <div className={styles.topbar__right}>
              <div className={styles.topbar__user}>{user?.username}</div>
              <div className={styles.topbar__role}>
                <FaUser />
                {user?.role}
              </div>
              <button
                type="button"
                className={styles.topbar__logout}
                onClick={logout}
              >
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
