import styles from "./ActionButton.module.scss";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

type Props = { text: string };

function ActionButton({ text }: Props) {
  let icon = getIcon(text);

  function getIcon(text: string) {
    switch (text) {
      case "Like":
        return <AiFillLike />;
      case "Dislike":
        return <AiFillDislike />;
      default:
        break;
    }
    return text;
  }

  function buttonAction() {
    switch (text) {
      case "Like":
        break;
      case "Dislike":
        break;
      default:
        break;
    }
  }

  return (
    <>
      <button className={styles.actionButton} onClick={buttonAction}>
        {icon}
        {text}
      </button>
    </>
  );
}

export default ActionButton;
