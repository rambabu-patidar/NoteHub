import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";
import { Input } from "components/Input/Input";
export function SearchBar(props) {
	return (
		<>
			<SearchIcon size={25} className={s.icon} />
			<Input
				onTextChange={props.onTextChange}
				placeholder={props.placeholder}
			/>
		</>
	);
}
