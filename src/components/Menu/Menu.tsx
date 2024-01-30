import { FaCirclePlus } from "react-icons/fa6";
import { MdLogin } from "react-icons/md";

import styles from "./Menu.module.scss";
import { useSidebarContext } from "../../context/SidebarContext";
import { useUserContext } from "../../context/UserContext";
import { useRef } from "react";
import { Login } from "../Login/Login";
import { CreateUser } from "../CreateUser/CreateUser";
import { FaUserPlus } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

export function Menu() {
  const { sidebarState, setSidebarState } = useSidebarContext();
  const { currentUser } = useUserContext();

  const dialogRefCreateUser = useRef<HTMLDialogElement>(null);
  const dialogRefLogin = useRef<HTMLDialogElement>(null);

  function updateValue() {
    setSidebarState(!sidebarState);
  }

  function toggleCreateUserDialog() {
    if (dialogRefCreateUser.current?.open) {
      dialogRefCreateUser.current?.close();
    } else {
      dialogRefCreateUser.current?.showModal();
    }
  }

  function toggleLoginDialog() {
    if (dialogRefLogin.current?.open) {
      dialogRefLogin.current?.close();
    } else {
      dialogRefLogin.current?.showModal();
    }
  }

  return (
    <>
      <div className={styles.menu}>
        {currentUser ? (
          <span>
            {currentUser.role === "admin" && (
              <button className={styles.menu__item} onClick={updateValue}>
                <span>
                  <div className={styles.menu__icon}>
                    <FaCirclePlus />
                  </div>
                  <div className={styles.menu__text}>News</div>
                </span>
              </button>
            )}
            <button className={styles.menu__item}>
              <div className={styles.menu__icon}>
                <FaUserEdit />
              </div>
              <div className={styles.menu__text}> Edit account</div>
            </button>
          </span>
        ) : (
          <span>
            <button className={styles.menu__item} onClick={toggleCreateUserDialog}>
              <div className={styles.menu__icon}>
                <FaUserPlus />
              </div>
              <div className={styles.menu__text}>Create user</div>
            </button>
            <button className={styles.menu__item} onClick={toggleLoginDialog}>
              <div className={styles.menu__icon}>
                <MdLogin />
              </div>
              <div className={styles.menu__text}>Login</div>
            </button>
          </span>
        )}
      </div>
      <dialog ref={dialogRefCreateUser}>
        <CreateUser toggleCreateUserDialog={toggleCreateUserDialog} />
      </dialog>
      <dialog ref={dialogRefLogin}>
        <Login toggleLoginDialog={toggleLoginDialog} />
      </dialog>
    </>
  );
}
