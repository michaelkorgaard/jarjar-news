import moment from "moment";
import styles from "./Dates.module.scss";
import { MdOutlineDateRange } from "react-icons/md";

type Props = { date: Date | number | undefined };

export function Dates({ date }: Props) {
  function getDate(date: moment.MomentInput) {
    return moment(date).format("L");
  }

  return (
    <>
      <div className={styles.date}>
        <MdOutlineDateRange />
        {getDate(date)}
      </div>
    </>
  );
}
