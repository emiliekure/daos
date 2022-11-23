import { useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import EmailField from "../../atoms/forms/EmailField";
import PasswordField from "../../atoms/forms/PasswordField";
import styles from "../../shared/Forms.module.css";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [valid, setValid] = useState(undefined);
	const [error, setError] = useState("");

	//Function to verify the email and password inputs
	const verifyInputs = () => {
		if (email === "" || password === "") {
			setValid(false);
			setError("");
		} else {
			setValid(true);
			/* // Then we call the backend and verify the user.
      		const resultFromServer = "Invalid Login";
      		setError(resultFromServer); */
		}
	};

	const updateEmail = (event) => {
		setEmail(event.target.value);
	};

	const updatePassword = (event) => {
		setPassword(event.target.value);
	};

	return (
		<div className={styles.formWrapper}>
			<h2>Log In</h2>
			<form className={styles.form}>
				<p>{error}</p>

				<EmailField value={email} onChange={updateEmail}/>

				<PasswordField type="password" value={password} onChange={updatePassword}/>

				<PrimaryButton type="button" onClick={verifyInputs} text="Submit" />

				{valid && <p>Login successful!</p>}
				{valid === false && <p>Login failed</p>}
			</form>
		</div>
	);
}
