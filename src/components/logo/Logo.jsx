import style from "./style.module.css";

export function Logo(props) {
	return (
		<>
			<div className={style.container}>
				<img className={style.img} src={props.image} alt="logo" />
				<div className={style["logo-text"]}>{props.title}</div>
			</div>
			<div className={style.subtitle}>{props.subtitle}</div>
		</>
	);
}
