import { useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import TextareaField from "../../atoms/forms/TextareaField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";

export default function EnsembleForm() {
	const [name, setName] = useState("");
	const [post, setPost] = useState();
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [valid, setValid] = useState(undefined);
	const [error, setError] = useState("");

	// Function to verify the inputs
	const verifyInputs = () => {
		if (
			name === "" ||
			description === "" ||
			location === ""
		) {
			setValid(false);
			setError("");
		} else {
			setValid(true);
		}
	};

	const updateName = (event) => {
		setName(event.target.value);
	};

	const updatePost = (event) => {
		setPost(event.target.value);
	};

	const updateDescription = (event) => {
		setDescription(event.target.value);
	};

	const updateLocation = (event) => {
		setLocation(event.target.value);
	};

	return (
		<section className={styles.formWrapper}>
			<h1>Create ensemble</h1>
			<form className={styles.form}>
				<TextField
					name="ensemble-name"
					max=""
					placeholder=""
					value={name}
					onChange={updateName}
				/>

				<TextField
					name="location"
					max=""
					value={location}
					onChange={updateLocation}
				/>

				<TextareaField
					name="description"
					value={description}
					onChange={updateDescription}
				/>

				<PrimaryButton
					type="button"
					onClick={verifyInputs}
					text="Submit"
				/>
				{valid && <p>Post created successfully!</p>}
				{valid === false && <p>Post creation failed</p>}
			</form>
		</section>
	);
}
