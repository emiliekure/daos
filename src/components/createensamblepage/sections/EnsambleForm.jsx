import { useReducer, useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import TextareaField from "../../atoms/forms/TextareaField";
import TextField from "../../atoms/forms/TextField";
import styles from "../../shared/Forms.module.css";
import style from "../../atoms/forms/FormFields.module.css";
import liststyles from "../../shared/PostList.module.css";
import UnauthorisedModal from "../../atoms/posts/UnauthorisedModal";
import Modal from "react-modal";

export default function EnsambleForm({ isLoggedIn, setIsLoggedIn }) {
  const [valid, setValid] = useState(undefined);
  const [ensambleNameError, setEnsambleNameError] = useState("");
  const [ensambleEmailError, setEnsambleEmailError] = useState("");
  const [ensambleCapacityError, setEnsambleCapacityError] = useState("");
  const [ensambleLocationError, setEnsambleLocationError] = useState("");
  const [ensambleCityError, setEnsambleCityError] = useState("");
  const [ensambleDescriptionError, setEnsambleDescriptionError] = useState("");
  const [nameAvailable, setNameAvailable] = useState("");
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
    city: "",
    email: "",
  });

  const updateFormValue = (event) => {
    const { name, value } = event.target;
    dispatch({
      [name]: value,
    });
  };

  // Function to verify the inputs
  const verifyInputs = (event) => {
    /* event.preventDefault(); */
    if (
      formValues.name === "" ||
      formValues.capacity === "" ||
      formValues.description === "" ||
      formValues.location === "" ||
      formValues.city === ""
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
        createdEnsamble.location =
          createdEnsamble.location + " " + createdEnsamble.city;
        delete createdEnsamble.city;
        if (formValues.email.length === 0) {
          createdEnsamble.email = author.email;
        }
        createEnsamble(createdEnsamble, token);
        dispatch({
          ["name"]: "",
          ["capacity"]: "",
          ["description"]: "",
          ["location"]: "",
          ["city"]: "",
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

  function checkEnsambleName() {
    setEnsambleNameError("");
    setNameAvailable("");
    if (formValues.name.length === 0) {
      setEnsambleNameError("The ensamble name cannot be empty");
    } else {
      setEnsambleNameError("");
      fetch("http://localhost:3004/ensambles/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"name": ${JSON.stringify(formValues.name)} }`,
      })
        .then((response) => response.json())
        .then((response) => setNameAvailable(response.message))
        .catch((err) => console.error(err));
    }
  }

  function checkEnsambleEmail() {
    setEnsambleEmailError("");
    if (formValues.email.length !== 0) {
      if (formValues.email.includes("@")) {
        setEnsambleEmailError("");
      } else {
        setEnsambleEmailError("The email must include an '@' sign");
        console.log(error);
      }
    }
  }

  function checkEnsambleCapacity() {
    console.log(Number(formValues.capacity));
    if (formValues.capacity.length === 0) {
      setEnsambleCapacityError("Capacity cannot be empty");
    } else if (formValues.capacity === "0") {
      setEnsambleCapacityError("Capacity cannot be 0");
    } else {
      if (formValues.capacity.length < 3 && Number(formValues.capacity)) {
        setEnsambleCapacityError("");
      } else {
        setEnsambleCapacityError(
          "Capacity has to be expressed in max of 2 numbers (max capacity is 100 members)"
        );
      }
    }
  }

  function checkZipCode() {
    console.log(Number(formValues.location));
    if (formValues.location.length === 0) {
      setEnsambleLocationError("Zipcode cannot be empty");
    } else {
      if (formValues.location.length === 4 && Number(formValues.location)) {
        setEnsambleLocationError("");
      } else {
        setEnsambleLocationError("Zipcode has to be expressed in 4 numbers");
      }
    }
  }

  function checkCity() {
    if (formValues.city.length === 0) {
      setEnsambleCityError("City cannot be empty");
    } else {
      if (formValues.city.length >= 2 && formValues.city.length <= 21) {
        setEnsambleCityError("");
      } else {
        setEnsambleCityError("Please provide a valid city name");
      }
    }
  }

  function checkEnsambleDescription() {
    if (formValues.description.length === 0) {
      setEnsambleDescriptionError("Description cannot be empty");
    } else if (
      formValues.description.length < 5 ||
      formValues.description.length > 120
    ) {
      setEnsambleDescriptionError(
        "Description has to be min 5 characters and max 120 characters!"
      );
    } else {
      setEnsambleDescriptionError("");
    }
  }

  return (
    <section className={styles.formWrapper}>
      <h1>Create an ensamble</h1>
      <form className={styles.form} /* onSubmit={verifyInputs} */>
        <TextField
          name="name"
          id="name"
          max="120"
          placeholder=""
          value={formValues.name}
          onChange={updateFormValue}
          nameAvailable={nameAvailable}
          ensambleNameError={ensambleNameError}
          onBlur={checkEnsambleName}
        />

        <TextField
          name="email"
          max=""
          id="ensamble-email"
          value={formValues.email}
          onChange={updateFormValue}
          onBlur={checkEnsambleEmail}
          ensambleEmailError={ensambleEmailError}
        />

        <TextField
          name="capacity"
          max=""
          placeholder="Maximum number of allowed members"
          value={formValues.capacity}
          onChange={updateFormValue}
          onBlur={checkEnsambleCapacity}
          ensambleCapacityError={ensambleCapacityError}
        />

        <div className={style.locationFields}>
          <TextField
            name="location"
            placeholder="Zip code"
            value={formValues.location}
            onChange={updateFormValue}
            onBlur={checkZipCode}
            ensambleLocationError={ensambleLocationError}
          />
          <TextField
            name="city"
            placeholder="City"
            value={formValues.city}
            onChange={updateFormValue}
            onBlur={checkCity}
            ensambleCityError={ensambleCityError}
          />
        </div>

        <TextareaField
          name="description"
          id="description"
          value={formValues.description}
          onChange={updateFormValue}
          onBlur={checkEnsambleDescription}
          ensambleDescriptionError={ensambleDescriptionError}
        />

        <PrimaryButton
          id="submit"
          type="button"
          onClick={verifyInputs}
          text="Submit"
        />
        {!valid && <p>{errorMsg}</p>}
      </form>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick
      >
        <UnauthorisedModal
          style={liststyles.card}
          onClick={() => setIsOpen(false)}
          errorMsg={errorMsg}
          isLoggedIn={isLoggedIn}
          title="Ensamble created!"
        ></UnauthorisedModal>
      </Modal>
    </section>
  );
}
