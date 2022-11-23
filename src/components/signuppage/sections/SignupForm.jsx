import { useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import EmailField from "../../atoms/forms/EmailField";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import PasswordField from "../../atoms/forms/PasswordField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";

export default function SignupForm() {
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [instrument, setInstrument] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confpassword, setConfPassword] = useState("");
	const [valid, setValid] = useState(undefined);
	const [error, setError] = useState("");

	//Function to verify the inputs
	const verifyInputs = () => {
		if (
			fname === "" ||
			lname === "" ||
			field === "" ||
			email === "" ||
			password === "" ||
			confpassword === ""
		) {
			setValid(false);
			setError("");
		} else {
			setValid(true);
		}
	};

	const updateFname = (event) => {
		setFname(event.target.value);
	};

	const updateLname = (event) => {
		setLname(event.target.value);
	};

	const updateInstrument = (event) => {
		setInstrument(event.target.value);
	};

	const updateEmail = (event) => {
		setEmail(event.target.value);
	};

	const updatePassword = (event) => {
		setPassword(event.target.value);
	};

	const updateConfPassword = (event) => {
		setConfPassword(event.target.value);
	};

	return (
		<div className={styles.formWrapper}>
			<h1>Sign Up</h1>
			<form className={styles.form}>
				<TextField
					name="first-name"
					max=""
					placeholder=""
					value={fname}
					onChange={updateFname}
				/>

				<TextField
					name="last-name"
					max=""
					placeholder=""
					value={lname}
					onChange={updateLname}
				/>

				<InstrumentSelect
					name="instrument"
					value={instrument}
					onChange={updateInstrument}
				/>

				<EmailField value={email} onChange={updateEmail} />

				<PasswordField
					type="password"
					value={password}
					onChange={updatePassword}
				/>

				<PasswordField
					type="confirm-password"
					value={confpassword}
					onChange={updateConfPassword}
				/>

				<PrimaryButton
					type="button"
					onClick={verifyInputs}
					text="Submit"
				/>
				{valid && <p>Sign up successful!</p>}
				{valid === false && <p>Sign up failed</p>}
			</form>
		</div>
	);
}
