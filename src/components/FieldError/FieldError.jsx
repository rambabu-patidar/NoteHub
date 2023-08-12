import styles from "./style.module.css";
export function FieldError(props) {
	return <span className={styles.container}>{props.msg}</span>;
}
