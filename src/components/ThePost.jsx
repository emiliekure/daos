import { useState } from "react";
import styles from "./ThePost.module.css";

export default function ThePost() {
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
    <div className={styles.formWrapper}>
      <h1>Create post</h1>
      <form className={styles.form}>
        <label for="title" placeholder="Title (max 120 characters)">
          Title
        </label>
        <input
          name="title"
          id="title"
          type="text"
          required
          maxLength="120"
          value={title}
          onChange={updateTitle}
        />
        <p>Post type</p>
        <div className={styles.radio1}>
          <input
            name="post-type"
            id="offered"
            type="radio"
            value="Offered"
            required
            onClick={verifyRadio}
          />
          <label htmlFor="offered">Offered</label>
        </div>
        <div className={styles.radio2}>
          <input
            name="post-type"
            id="wanted"
            type="radio"
            value="Wanted"
            required
            onClick={verifyRadio}
          />
          <label htmlFor="wanted">Wanted</label>
        </div>
        <label for="instrument" required>
          Instrument
        </label>
        <select
          id="instrument"
          name="instrument"
          value={instrument}
          onChange={updateInstrument}
        >
          <option disabled selected>
            Please choose your instrument
          </option>
          <option value="None">None</option>
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
        <label for="location">Location</label>
        <input
          name="location"
          id="location"
          type="text"
          required
          value={location}
          onChange={updateLocation}
        />
        <label for="description">Description</label>
        <textarea
          name="description"
          id="description"
          type="text"
          required
          value={description}
          onChange={updateDescription}
        ></textarea>
        <button type="button" onClick={verifyInputs}>
          Submit
        </button>
        {valid && <p>Sign Up sucessfull!</p>}
        {valid === false && <p>Sign Up NOT sucessfull!</p>}
      </form>
    </div>
  );
}
