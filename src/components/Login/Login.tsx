import { useUserContext } from "../../context/UserContext";
import styles from "./Login.module.scss";
import { FormEvent, useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";

type Props = { toggleLoginDialog: () => void };

export function Login({ toggleLoginDialog }: Props) {
  const { setCurrentUser, allUsers } = useUserContext();
  const [error, setError] = useState(false);

  let formRef = useRef<HTMLFormElement>(null);
  let usernameRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (username && password && allUsers) {
      const user = allUsers.find((user) => user.username === username && user.password === password);
      if (user) {
        setCurrentUser(user);
        setError(false);
        toggleLoginDialog();
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }

    formRef.current?.reset();
  }

  return (
    <>
      <div className={styles.login}>
        <div className={styles.login__left}>
          <div className={styles.login__title}>JarJar News</div>
        </div>
        <div className={styles.login__right}>
          <button type="button" className={styles.login__close} onClick={toggleLoginDialog}>
            <IoClose />
          </button>
          <form method="dialog" onSubmit={handleLogin} ref={formRef} autoComplete="off">
            <div className={styles.login__header}>Login</div>
            <div className={styles.login__input}>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" autoComplete="false" ref={usernameRef} />
            </div>
            <div className={styles.login__input}>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" autoComplete="false" ref={passwordRef} />
            </div>
            {error && (
              <div className={styles.login__error}>
                <MdErrorOutline />
                <span>Username or password is incorrect</span>
              </div>
            )}
            <button type="submit" className={styles.login__button}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
