import { useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import EmailField from "../../atoms/forms/EmailField";
import PasswordField from "../../atoms/forms/PasswordField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";

export default function SignupForm() {
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [field, setField] = useState("");
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

	const updateField = (event) => {
		setField(event.target.value);
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

				<label for="field" required>
					Your field
				</label>
				<select
					id="field"
					name="field"
					value={field}
					onChange={updateField}
				>
					<option disabled selected>
						Please choose your expertise
					</option>
					<option value="None">None</option>
					<option value="Dirigent">Dirigent</option>
					<option value="Natural Horn">Natural Horn</option>
					<option value="Natural Trumpet">Natural Trumpet</option>
					<option value="Sackbut">Sackbut</option>
					<option value="Serpent">Serpent</option>
					<option value="Slide Trumpet">Slide Trumpet</option>
					<option value="Theorbo">Theorbo</option>
					<option value="Trumpet">Trumpet</option>
					<option value="Vihuela">Vihuela</option>
					<option value="Viol">Viol</option>
					<option value="Viola">Viola</option>
					<option value="Violin">Violin</option>
					<option value="Violone">Violone</option>
				</select>

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
