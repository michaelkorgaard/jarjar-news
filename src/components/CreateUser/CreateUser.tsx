import styles from "./CreateUser.module.scss";
import { FormEvent, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import Select, { ActionMeta } from "react-select";
import { UserType } from "../../types/UserType";
import { useUserContext } from "../../context/UserContext";
import { v4 as uuid } from "uuid";
import { FormError } from "../FormError/FormError";
import db from "../../assets/data/db";

type Role = {
  value: string;
  label: string;
};

const options: Role[] = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

type Props = { toggleCreateUserDialog: () => void };

export function CreateUser({ toggleCreateUserDialog }: Props) {
  const { allUsers, setAllUsers } = useUserContext();
  const [error, setError] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(options[0]);
  const errorMessage = "Please fill out all fields";

  const formRef = useRef<HTMLFormElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  function handleRoleChange(newValue: Role | null) {
    if (newValue) {
      setSelectedRole(newValue);
    }
  }

  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = formRef.current;
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const role = selectedRole?.value;
    const password = passwordRef.current?.value;
    const repeatPassword = repeatPasswordRef.current?.value;
    const image = imageRef.current?.value;

    if (username && email && role && password && repeatPassword === password && image) {
      let user: UserType = {
        id: uuid(),
        username: username,
        email: email,
        role: role,
        password: password,
        image: image,
      };

      const newUserArray = [...allUsers, user];
      setAllUsers(newUserArray);

      await db.users.add(user);

      form?.reset();
      setError(false);
      toggleCreateUserDialog();
    } else {
      setError(true);
    }
  }

  return (
    <>
      <div className={styles.createUser}>
        <div className={styles.createUser__left}>
          <div className={styles.createUser__title}>JarJar News</div>
        </div>
        <div className={styles.createUser__right}>
          <button type="button" className={styles.createUser__close} onClick={toggleCreateUserDialog}>
            <IoClose />
          </button>
          <form method="dialog" onSubmit={handleCreateUser} ref={formRef} autoComplete="off">
            <div className={styles.createUser__header}>Create user</div>
            <div className={styles.createUser__input}>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" autoComplete="false" ref={usernameRef} />
            </div>
            <div className={styles.createUser__input}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" autoComplete="false" ref={emailRef} />
            </div>
            <div className={styles.createUser__input}>
              <label htmlFor="role">Role:</label>
              <Select defaultValue={options[0]} onChange={handleRoleChange} options={options} />
            </div>
            <div className={styles.createUser__input}>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" autoComplete="false" ref={passwordRef} />
            </div>
            <div className={styles.createUser__input}>
              <label htmlFor="repeatPassword">Repeat password:</label>
              <input type="password" id="repeatPassword" autoComplete="false" ref={repeatPasswordRef} />
            </div>
            <div className={styles.createUser__input}>
              <label htmlFor="image">Image:</label>
              <input type="text" id="image" autoComplete="false" ref={imageRef} />
            </div>
            {error && <FormError errorMessage={errorMessage} />}
            <button type="submit" className={styles.createUser__button}>
              Create user
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
