import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { AuthAPI } from "api/auth";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { Input } from "components/Input/Input";
import { AuthLayout } from "layouts/AuthLayout/AuthLayout";
import { setUser } from "store/auth/auth-slice";
import { toast } from "utils/sweet-alert";

import styles from "./style.module.css";
export function Signin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			const user = await AuthAPI.signin(email, password);
			dispatch(setUser(user));
			await toast("success", "Auth succeed");
			navigate("/");
		} catch (err) {
			toast("error", err.message);
		}
	};

	const form = (
		<div className={styles.formContainer}>
			<h2 className={styles.title}>
				Signin <br />
				to access your team notes
			</h2>
			<form onSubmit={submitHandler} className={styles.formGroup}>
				<Input placeholder="Email" onTextChange={setEmail} />
				<Input
					placeholder={"Password"}
					type="password"
					onTextChange={setPassword}
				/>
				<ButtonPrimary type="submit" className={styles.button}>
					Sign in!
				</ButtonPrimary>
				<span>
					Don't have an account yet ? <Link to={"/signup"}>Signup</Link>
				</span>
			</form>
		</div>
	);
	return <AuthLayout>{form}</AuthLayout>;
}
