import styles from "./style.module.css";
export function ButtonPrimary(props) {
	const buttonStyles = `btn btn-primary ${styles.button}  ${styles.className}`;

	return (
		<button
			disabled={props.isDisabled}
			onClick={props.onClick}
			type={props.type}
			className={buttonStyles}
		>
			{props.children}
		</button>
	);
}
