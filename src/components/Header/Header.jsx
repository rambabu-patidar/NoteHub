import { Logo } from "components/logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";

import { setUser } from "store/auth/auth-slice";
import { selectUser } from "store/auth/auth-selectors";
import { AuthAPI } from "api/auth";

import logoSrc from "assets/images/logo.png";

export function Header() {
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const signout = () => {
		AuthAPI.signout();
		dispatch(setUser(null));
	};

	const renderAuthProfile = () => {
		return (
			<div>
				<img
					src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}`}
					style={{ width: 40 }}
					className="rounded-circle"
					alt="some figure"
				/>
				<div> Hello, {user.email}</div>
				<Link to="#" onClick={signout}>
					Signout
				</Link>
			</div>
		);
	};
	return (
		<div className={`row ${styles.container}`}>
			<div className="col-xs-12 col-sm-4">
				<Logo
					onClick={() => navigate("/")}
					title="NoteHub"
					subtitle={"Manage your notes"}
					image={logoSrc}
				/>
			</div>
			<div className="col-xs-12 col-sm-8 text-end">{renderAuthProfile()}</div>
		</div>
	);
}
