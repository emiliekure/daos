import { useReducer, useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import TextareaField from "../../atoms/forms/TextareaField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";
import style from "../../atoms/forms/FormFields.module.css";

export default function PostForm() {
  const [valid, setValid] = useState(undefined);
  const [error, setError] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [errorDescription, setErrorDescription] = useState("");

  const [radioStatus, setRadioStatus] = useState();

  const switchRadio = (event) => {
    setRadioStatus(event.target.value);
  };

  const reducer = (state, newValues) => {
    return { ...state, ...newValues };
  };

  const [formValues, dispatch] = useReducer(reducer, {
    title: "",
    instrument: "",
    description: "",
    location: "",
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
      formValues.title === "" ||
      radioStatus === "" ||
      formValues.instrument === "" ||
      formValues.description === "" ||
      formValues.location === ""
    ) {
      setValid(false);
      setError("");
    } else {
      setValid(true);
      const author = JSON.parse(localStorage.getItem("user"));
      const createdPost = { ...formValues };
      createdPost.searchType = radioStatus;
      createdPost.dateOfCreation = new Date();
      createdPost.author = author.name + " " + author.surname;
      createdPost.authorId = author._id;
      console.log(createdPost);
      const token = localStorage.getItem("token");
      createPost(createdPost, token);
      dispatch({
        ["title"]: "",
        ["instrument"]: "",
        ["description"]: "",
        ["location"]: "",
      });
      setRadioStatus("");
    }
  };

  function createPost(post, token) {
    if (token && token !== "") {
      fetch("http://localhost:3004/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    } else {
      console.log("Error - unauthorized");
    }
  }

  function checkTitle() {
    if (formValues.title.length === 0) {
      setErrorTitle("Title cannot be empty");
      console.log(errorTitle);
    } else if (formValues.title.length < 5 || formValues.title.length > 21) {
      setErrorTitle("Title has to be min 5 characters and max 20 characters!");
    } else {
      setErrorTitle("");
    }
  }

  function checkDescription() {
    if (formValues.description.length === 0) {
      setErrorDescription("Description cannot be empty");
      console.log(errorDescription);
    } else if (
      formValues.description.length < 5 ||
      formValues.description.length > 21
    ) {
      setErrorDescription(
        "Description has to be min 5 characters and max 30 characters!"
      );
    } else {
      setErrorDescription("");
    }
  }

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
          onBlur={checkTitle}
          errorTitle={errorTitle}
        />

        <div className={style.fieldgroup}>
          <h2>Post type</h2>
          <div className={style.radiolabel}>
            <input
              name="post-type"
              id="offered"
              type={"radio"}
              value={"offered"}
              required
              onClick={switchRadio}
            />
            <label htmlFor="offered">Offered</label>
          </div>
          <div className={style.radiolabel}>
            <input
              name="post-type"
              id="wanted"
              type={"radio"}
              value={"wanted"}
              required
              onClick={switchRadio}
            />
            <label htmlFor="wanted">Wanted</label>
          </div>
        </div>

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
          onBlur={checkDescription}
          errorDescription={errorDescription}
        />

        <PrimaryButton type="button" onClick={verifyInputs} text="Submit" />
        {valid && <p>Post created successfully!</p>}
        {valid === false && <p>Post creation failed</p>}
      </form>
    </section>
  );
}
