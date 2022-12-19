import { useReducer, useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import TextareaField from "../../atoms/forms/TextareaField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";
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

export default function EnsambleForm({ isLoggedIn, setIsLoggedIn }) {
  const [valid, setValid] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const reducer = (state, newValues) => {
    return { ...state, ...newValues };
  };

  const [formValues, dispatch] = useReducer(reducer, {
    name: "",
    capacity: "",
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
      setErrorMsg(
        `All inputs marked with '*' have to be filled out before submitting.`
      );
    } else {
      setValid(true);
      const token = localStorage.getItem("token");
      if (token && token !== "") {
        setIsLoggedIn(true);
        const author = JSON.parse(localStorage.getItem("user"));
        const createdEnsamble = { ...formValues };
        createdEnsamble.creator = author._id;
        if (formValues.email.length === 0) {
          createdEnsamble.email = author.email;
        }
        createEnsamble(createdEnsamble, token);
        dispatch({
          ["name"]: "",
          ["capacity"]: "",
          ["description"]: "",
          ["location"]: "",
          ["email"]: "",
        });
      } else {
        setIsLoggedIn(false);
        setIsOpen(true);
        setErrorMsg(
          `Please log in or sign up to create an ensamble on DAOS platform.`
        );
      }
    }
  };

  function createEnsamble(ensamble, token) {
    fetch("http://localhost:3004/ensambles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ensamble),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setIsOpen(true);
        setErrorMsg(`Your ensamble has been created successfully!`);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(
          `Ups! Loooks like something went wrong when creating your ensamble!`
        );
        setIsOpen(true);
      });
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

        <TextField
          name="email"
          max=""
          id="ensamble-email"
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
          title="Ensamble created!"
        ></UnauthorisedModal>
      </Modal>
    </section>
  );
}
