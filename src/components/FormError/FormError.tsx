import styles from "./FormError.module.scss";
import { MdErrorOutline } from "react-icons/md";

type Props = { errorMessage: string };

export function FormError({ errorMessage }: Props) {
  return (
    <>
      <div className={styles.formError}>
        <MdErrorOutline />
        <span>{errorMessage}</span>
      </div>
    </>
  );
}
