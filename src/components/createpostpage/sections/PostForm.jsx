import { useReducer, useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import RadioGroup from "../../atoms/forms/RadioGroup";
import TextareaField from "../../atoms/forms/TextareaField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";

export default function PostForm() {
  const [valid, setValid] = useState(undefined);
  const [error, setError] = useState("");

  const reducer = (state, newValues) => {
    return { ...state, ...newValues };
  };

  const [formValues, dispatch] = useReducer(reducer, {
    title: "",
    /*  radio: "", */
    instrument: "",
    description: "",
    location: "",
  });

  const updateFormValue = (event) => {
    const { name, value /* , type, checked  */ } = event.target;
    /*  const result = type === "radio" || type === "checkbox" ? checked : value; */
    dispatch({
      [name]: value,
    });
  };

  // Function to verify the inputs
  const verifyInputs = () => {
    if (
      formValues.title === "" ||
      /* formValues.radio === "" || */
      formValues.instrument === "" ||
      formValues.description === "" ||
      formValues.location === ""
    ) {
      setValid(false);
      setError("");
    } else {
      setValid(true);
    }
  };

  return (
    <section className={styles.formWrapper}>
      <h1>Create post</h1>
      <form className={styles.form}>
        <TextField
          name="title"
          max="120"
          placeholder=""
          value={formValues.title}
          onChange={updateFormValue}
        />

        <h2>Post type</h2>
        <div className={styles.radio1}>
          <label htmlFor="offered">
            Offered
            <input
              name="post-type"
              id="offered"
              type="radio"
              value="Offered"
              required
              onClick={updateFormValue}
            />
          </label>
        </div>
        <div className={styles.radio2}>
          <label htmlFor="wanted">
            Wanted
            <input
              name="post-type"
              id="wanted"
              type="radio"
              value="Wanted"
              required
              onClick={updateFormValue}
            />
          </label>
        </div>

        {/* <RadioGroup
		 value
          options={["offered", "wanted"]}
          group="post-type"
          onClick={updateFormValue}
        /> */}

        <InstrumentSelect
          name="instrument"
          value={formValues.instrument}
          onChange={updateFormValue}
        />

        <TextField
          name="location"
          max=""
          value={formValues.location}
          onChange={updateFormValue}
        />

        <TextareaField
          name="description"
          value={formValues.description}
          onChange={updateFormValue}
        />

        <PrimaryButton type="button" onClick={verifyInputs} text="Submit" />
        {valid && <p>Post created successfully!</p>}
        {valid === false && <p>Post creation failed</p>}
      </form>
    </section>
  );
}
