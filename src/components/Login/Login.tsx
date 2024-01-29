import { useUserContext } from "../../context/UserContext";
import { UserType } from "../../types/UserType";
import styles from "./Login.module.scss";
import { FormEvent, useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";

type props = { toggleLoginDialog: () => void };

export function Login({ toggleLoginDialog }: props) {
  // const { setUser } = useUserContext();
  const [error, setError] = useState(false);

  let formRef = useRef<HTMLFormElement>(null);
  let usernameRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (usernameRef.current?.value && passwordRef.current?.value) {
      let user: UserType = {
        id: 1,
        username: usernameRef.current?.value,
        email: "",
        role: "admin",
        password: passwordRef.current?.value,
      };
      const newUser = user;
      // setUser(newUser);
      event.currentTarget.reset();
      setError(false);
      toggleLoginDialog();
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
          <button
            type="button"
            className={styles.login__close}
            onClick={toggleLoginDialog}
          >
            <IoClose />
          </button>
          <form
            method="dialog"
            onSubmit={handleLogin}
            ref={formRef}
            autoComplete="off"
          >
            <div className={styles.login__header}>Login</div>
            <div className={styles.login__input}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                autoComplete="false"
                ref={usernameRef}
              />
            </div>
            <div className={styles.login__input}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                autoComplete="false"
                ref={passwordRef}
              />
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
