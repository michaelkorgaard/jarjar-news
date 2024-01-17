import styles from "./Avatar.module.scss";
import { IoMdPerson } from "react-icons/io";

type Props = { avatar: string | undefined };

function Avatar({ avatar }: Props) {
  return (
    <>
      <div className={styles.avatar}>
        {avatar ? <img src={avatar} /> : <IoMdPerson />}
      </div>
    </>
  );
}

export default Avatar;
