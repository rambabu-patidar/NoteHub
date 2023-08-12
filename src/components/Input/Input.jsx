import styles from "./style.module.css";

export function Input(props) {
	const onChangeHandler = (event) => {
		props.onTextChange(event.target.value);
	};

	return (
		<input
			type={props.type || "text"}
			className={styles.input}
			onChange={onChangeHandler}
			placeholder={props.placeholder}
		/>
	);
}
