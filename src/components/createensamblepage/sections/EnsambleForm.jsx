import { useReducer, useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import TextareaField from "../../atoms/forms/TextareaField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";

export default function EnsambleForm() {
  const [valid, setValid] = useState(undefined);
  const [error, setError] = useState("");

  const reducer = (state, newValues) => {
    return { ...state, ...newValues };
  };

  const [formValues, dispatch] = useReducer(reducer, {
    name: "",
    capacity: Number,
    description: "",
    location: "",
    email: "",
  });

  const updateFormValue = (event) => {
    const { name, value } = event.target;
    dispatch({
      [name]: value,
    });
  };

  // Function to verify the inputs
  const verifyInputs = () => {
    if (
      formValues.name === "" ||
      formValues.capacity === "" ||
      formValues.description === "" ||
      formValues.location === ""
    ) {
      setValid(false);
      setError("");
    } else {
      setValid(true);
      const author = JSON.parse(localStorage.getItem("user"));
      const createdEnsamble = { ...formValues };
      createdEnsamble.creator = author._id;
      if (createdEnsamble.email.length === 0) {
        createdEnsamble.email = author.email;
      }
      console.log(createdEnsamble);
      const token = localStorage.getItem("token");
      createEnsamble(createdEnsamble, token);
      dispatch({
        ["name"]: "",
        ["capacity"]: "",
        ["description"]: "",
        ["location"]: "",
        ["email"]: "",
      });
    }
  };

  function createEnsamble(ensamble, token) {
    if (token && token !== "") {
      fetch("http://localhost:3004/ensambles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ensamble),
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    } else {
      console.log("Error - unauthorized");
    }
  }

  return (
    <section className={styles.formWrapper}>
      <h1>Create an ensamble</h1>
      <form className={styles.form}>
        <TextField
          name="name"
          id="name"
          max="120"
          placeholder=""
          value={formValues.name}
          onChange={updateFormValue}
        />

        <p>
          Type in the email address of your ensamble OR leave the field empty if
          you wish to be contacted via your profile email.
        </p>
        <TextField
          name="email"
          max=""
          id="email"
          value={formValues.email}
          onChange={updateFormValue}
        />

        <TextField
          name="capacity"
          max=""
          value={formValues.capacity}
          onChange={updateFormValue}
        />

        <TextField
          name="location"
          value={formValues.location}
          onChange={updateFormValue}
        />

        <TextareaField
          name="description"
          id="description"
          value={formValues.description}
          onChange={updateFormValue}
        />

        <PrimaryButton type="button" onClick={verifyInputs} text="Submit" />
        {valid && <p>Ensamble created successfully!</p>}
        {valid === false && <p>Ensamble creation failed</p>}
      </form>
    </section>
  );
}
