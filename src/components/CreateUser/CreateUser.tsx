import styles from "./CreateUser.module.scss";
import { FormEvent, useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Select from "react-select";

type option = {
  value: string;
  label: string;
};

const options: option[] = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

type props = { toggleCreateUserDialog: () => void };

export function CreateUser({ toggleCreateUserDialog }: props) {
  const [error, setError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  let formRef = useRef<HTMLFormElement>(null);
  let usernameRef = useRef<HTMLInputElement>(null);
  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);
  let repeatPasswordRef = useRef<HTMLInputElement>(null);

  function handlecreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (usernameRef.current?.value && passwordRef.current?.value) {
      event.currentTarget.reset();
      setError(false);
      toggleCreateUserDialog();
    } else {
      setError(true);
    }
    formRef.current?.reset();
  }

  return (
    <>
      <div className={styles.createUser}>
        <div className={styles.createUser__left}>
          <div className={styles.createUser__title}>JarJar News</div>
        </div>
        <div className={styles.createUser__right}>
          <button
            type="button"
            className={styles.createUser__close}
            onClick={toggleCreateUserDialog}
          >
            <IoClose />
          </button>
          <form
            method="dialog"
            onSubmit={handlecreateUser}
            ref={formRef}
            autoComplete="off"
          >
            <div className={styles.createUser__header}>Create user</div>
            <div className={styles.createUser__input}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                autoComplete="false"
                ref={usernameRef}
              />
            </div>
            <div className={styles.createUser__input}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                autoComplete="false"
                ref={emailRef}
              />
            </div>
            <div className={styles.createUser__input}>
              <label htmlFor="role">Role:</label>
              <Select
                defaultValue={options[0]}
                // onChange={setSelectedOption}
                options={options}
              />
            </div>
            <div className={styles.createUser__input}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                autoComplete="false"
                ref={passwordRef}
              />
            </div>
            <div className={styles.createUser__input}>
              <label htmlFor="repeatPassword">Repeat password:</label>
              <input
                type="password"
                id="repeatPassword"
                autoComplete="false"
                ref={repeatPasswordRef}
              />
            </div>
            {error && (
              <div className={styles.createUser__error}>
                <MdErrorOutline />
                <span>Username or password is incorrect</span>
              </div>
            )}
            <button type="submit" className={styles.createUser__button}>
              Create user
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
