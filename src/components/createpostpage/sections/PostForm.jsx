import { useReducer, useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import TextareaField from "../../atoms/forms/TextareaField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";
import style from "../../atoms/forms/FormFields.module.css";
import UnauthorisedModal from "../../atoms/posts/UnauthorisedModal";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 0,
  },
};

export default function PostForm({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [valid, setValid] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState("");
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
      setErrorMsg(
        `All inputs marked with '*' have to be filled out before submitting.`
      );
    } else {
      setValid(true);
      const token = localStorage.getItem("token");
      if (token && token !== "") {
        setIsLoggedIn(true);
        const author = JSON.parse(localStorage.getItem("user"));
        const createdPost = { ...formValues };
        createdPost.searchType = radioStatus;
        createdPost.dateOfCreation = new Date();
        createdPost.author = author.name + " " + author.surname;
        createdPost.authorId = author._id;
        createPost(createdPost, token);
        dispatch({
          ["title"]: "",
          ["instrument"]: "",
          ["description"]: "",
          ["location"]: "",
        });
        setRadioStatus("");
      } else {
        setIsLoggedIn(false);
        setIsOpen(true);
        setErrorMsg(`Please log in or sign up to post on DAOS platform.`);
      }
    }
  };

  function createPost(post, token) {
    fetch("http://localhost:3004/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setIsOpen(true);
        setErrorMsg(`Your post has been created successfully!`);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(
          `Ups! Loooks like something went wrong when creating your post!`
        );
        setIsOpen(true);
      });
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
        />

        <PrimaryButton type="button" onClick={verifyInputs} text="Submit" />
        {!valid && <p>{errorMsg}</p>}
      </form>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        style={customStyles}
        shouldCloseOnOverlayClick
      >
        <UnauthorisedModal
          style={styles}
          onClick={() => setIsOpen(false)}
          errorMsg={errorMsg}
          isLoggedIn={isLoggedIn}
          title="Post created!"
        ></UnauthorisedModal>
      </Modal>
    </section>
  );
}
