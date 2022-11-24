import { useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import RadioGroup from "../../atoms/forms/RadioGroup";
import TextareaField from "../../atoms/forms/TextareaField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";

export default function PostForm() {
	const [title, setTitle] = useState("");
	const [post, setPost] = useState();
	const [instrument, setInstrument] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [valid, setValid] = useState(undefined);
	const [error, setError] = useState("");
	// radio input for Post type (not sure if this is the correct way)
	const [radio, setRadio] = useState("");

	// Function to verify the inputs
	const verifyInputs = () => {
		if (
			title === "" ||
			radio === "" ||
			instrument === "" ||
			description === "" ||
			location === ""
		) {
			setValid(false);
			setError("");
		} else {
			setValid(true);
		}
	};

	const verifyRadio = (event) => {
		setRadio(event.target.value);
		console.log(radio);
	};

	const updateTitle = (event) => {
		setTitle(event.target.value);
	};

	const updatePost = (event) => {
		setPost(event.target.value);
	};

	const updateInstrument = (event) => {
		setInstrument(event.target.value);
	};

	const updateDescription = (event) => {
		setDescription(event.target.value);
	};

	const updateLocation = (event) => {
		setLocation(event.target.value);
	};

	return (
		<section className={styles.formWrapper}>
			<h1>Create post</h1>
			<form className={styles.form}>
				<TextField
					name="title"
					max="120"
					placeholder=""
					value={title}
					onChange={updateTitle}
				/>

				<RadioGroup options={["offered", "wanted"]} group="post-type" onClick={verifyRadio} />

				<InstrumentSelect
					name="instrument"
					value={instrument}
					onChange={updateInstrument}
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
