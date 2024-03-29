import { useReducer, useState } from "react";
import PrimaryButton from "../../atoms/buttons/PrimaryButton";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import TextareaField from "../../atoms/forms/TextareaField";
import TextField from "../../atoms/forms/TextField";
// import styles from "../../shared/Forms.module.css";
// import style from "../../atoms/forms/FormFields.module.css";
// import liststyles from "../../shared/PostList.module.css";
import "../sections/postForm.css";
import UnauthorisedModal from "../../atoms/posts/UnauthorisedModal";
import Modal from "react-modal";

// export default function PostForm({ isLoggedIn, setIsLoggedIn }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [valid, setValid] = useState(undefined);
//   const [errorTitle, setErrorTitle] = useState("");
//   const [postLocationError, setPostLocationError] = useState("");
//   const [postCityError, setPostCityError] = useState("");
//   const [errorDescription, setErrorDescription] = useState("");
//   const [errorRadio, setErrorRadio] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [radioStatus, setRadioStatus] = useState();

//   const switchRadio = (event) => {
//     setRadioStatus(event.target.value);
//   };

//   const reducer = (state, newValues) => {
//     return { ...state, ...newValues };
//   };

//   const [formValues, dispatch] = useReducer(reducer, {
//     title: "",
//     instrument: "",
//     description: "",
//     location: "",
//     city: "",
//   });

//   const updateFormValue = (event) => {
//     const { name, value } = event.target;
//     dispatch({
//       [name]: value,
//     });
//   };

//   // Function to verify the inputs
//   const verifyInputs = (event) => {
//     event.preventDefault();
//     if (
//       formValues.title === "" ||
//       radioStatus === "" ||
//       formValues.instrument === "" ||
//       formValues.description === "" ||
//       formValues.location === "" ||
//       formValues.city === ""
//     ) {
//       setValid(false);
//       setErrorMsg(
//         `All inputs marked with '*' have to be filled out before submitting.`
//       );
//     } else {
//       setValid(true);
//       const token = localStorage.getItem("token");
//       if (token && token !== "") {
//         setIsLoggedIn(true);
//         const user = JSON.parse(localStorage.getItem("user"));
//         const createdPost = { ...formValues };
//         createdPost.searchType = radioStatus;
//         createdPost.dateOfCreation = new Date();
//         createdPost.author = user._id;
//         createdPost.location = createdPost.location + " " + createdPost.city;
//         delete createdPost.city;
//         createPost(createdPost, token);
//         dispatch({
//           ["title"]: "",
//           ["instrument"]: "",
//           ["description"]: "",
//           ["location"]: "",
//           ["city"]: "",
//         });
//         setRadioStatus("");
//       } else {
//         setIsLoggedIn(false);
//         setIsOpen(true);
//         setErrorMsg(`Please log in or sign up to post on DAOS platform.`);
//       }
//     }
//   };

//   function createPost(post, token) {
//     fetch("http://localhost:3004/posts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(post),
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         console.log(response);
//         setIsOpen(true);
//         setErrorMsg(`Your post has been created successfully!`);
//       })
//       .catch((err) => {
//         console.error(err);
//         setErrorMsg(
//           `Ups! Loooks like something went wrong when creating your post!`
//         );
//         setIsOpen(true);
//       });
//   }

//   function checkRadio() {
//     setErrorRadio("");
//     if (radioStatus === undefined) {
//       setErrorRadio(
//         "You have to choose if you are seeking a musician or offering to play"
//       );
//     }
//   }

//   function checkTitle() {
//     if (formValues.title.length === 0) {
//       setErrorTitle("Title cannot be empty");
//       console.log(errorTitle);
//     } else if (formValues.title.length < 5 || formValues.title.length > 36) {
//       setErrorTitle("Title has to be min 5 characters and max 35 characters!");
//     } else {
//       setErrorTitle("");
//     }
//   }

//   function checkZipCode() {
//     console.log(Number(formValues.location));
//     if (formValues.location.length === 0) {
//       setPostLocationError("Zipcode cannot be empty");
//     } else {
//       if (formValues.location.length === 4 && Number(formValues.location)) {
//         setPostLocationError("");
//       } else {
//         setPostLocationError("Zipcode has to be expressed in 4 numbers");
//       }
//     }
//   }

//   function checkCity() {
//     if (formValues.city.length === 0) {
//       setPostCityError("City cannot be empty");
//     } else {
//       if (formValues.city.length >= 2 && formValues.city.length <= 21) {
//         setPostCityError("");
//       } else {
//         setPostCityError("Please provide a valid city name");
//       }
//     }
//   }

//   function checkDescription() {
//     if (formValues.description.length === 0) {
//       setErrorDescription("Description cannot be empty");
//       console.log(errorDescription);
//     } else if (
//       formValues.description.length < 5 ||
//       formValues.description.length > 120
//     ) {
//       setErrorDescription(
//         "Description has to be min 5 characters and max 120 characters!"
//       );
//     } else {
//       setErrorDescription("");
//     }
//   }

//   return (
//     <section className={styles.formWrapper}>
//       <h1>Create post</h1>
//       <form className={styles.form} onSubmit={verifyInputs}>
//         <TextField
//           name="title"
//           max="120"
//           placeholder=""
//           value={formValues.title}
//           onChange={updateFormValue}
//           onBlur={checkTitle}
//           errorTitle={errorTitle}
//         />

//         <div className={style.fieldgroup}>
//           <h2>Post type</h2>
//           <div className={style.radiolabel}>
//             <input
//               name="post-type"
//               id="offered"
//               type={"radio"}
//               value={"offered"}
//               required
//               onClick={switchRadio}
//               onBlur={checkRadio}
//             />
//             <label htmlFor="offered">Offered</label>
//           </div>
//           <div className={style.radiolabel}>
//             <input
//               name="post-type"
//               id="wanted"
//               type={"radio"}
//               value={"wanted"}
//               required
//               onClick={switchRadio}
//               onBlur={checkRadio}
//             />
//             <label htmlFor="wanted">Wanted</label>
//           </div>
//           {errorRadio && <p>{errorRadio}</p>}
//         </div>

//         <InstrumentSelect
//           name="instrument"
//           value={formValues.instrument}
//           onChange={updateFormValue}
//         />

//         <div className={style.locationFields}>
//           <TextField
//             name="location"
// 			placeholder="Zip code"
//             value={formValues.location}
//             onChange={updateFormValue}
//             onBlur={checkZipCode}
//             postLocationError={postLocationError}
//           />
//           <TextField
//             name="city"
// 			placeholder="City"
//             value={formValues.city}
//             onChange={updateFormValue}
//             onBlur={checkCity}
//             postCityError={postCityError}
//           />
//         </div>

//         <TextareaField
//           name="description"
//           value={formValues.description}
//           onChange={updateFormValue}
//           onBlur={checkDescription}
//           errorDescription={errorDescription}
//         />

//         <PrimaryButton id="submit" type="submit" text="Submit" />
//         {!valid && <p>{errorMsg}</p>}
//       </form>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={() => setIsOpen(false)}
//         contentLabel="Example Modal"
//         shouldCloseOnOverlayClick
//       >
//         <UnauthorisedModal
//           style={liststyles.card}
//           onClick={() => setIsOpen(false)}
//           errorMsg={errorMsg}
//           isLoggedIn={isLoggedIn}
//           title="Post created!"
//         ></UnauthorisedModal>
//       </Modal>
//     </section>
//   );
// }

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [postType, setPostType] = useState("");
  const [instrument, setInstrument] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(title + postType + instrument + zipCode + location + description);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
    console.log(postType);
  };

  const handleInstrumentChange = (e) => {
    setInstrument(e.target.value);
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]{0,4}$/.test(value) && !/0000$/.test(value)) {
      setZipCode(value);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          maxLength={120}
          required
        />
      </div>
      <div>
        <label htmlFor="post-type">Post Type:</label>
        <label>
          <input
            type="radio"
            name="post-type"
            value="offered"
            checked={postType === "offered"}
            onClick={handlePostTypeChange}
            required
          />{" "}
          Offered
        </label>
        <label>
          <input
            type="radio"
            name="post-type"
            value="wanted"
            checked={postType === "wanted"}
            onClick={handlePostTypeChange}
            required
          />{" "}
          Wanted
        </label>
      </div>
      <div>
        <label htmlFor="instrument">Instrument:</label>
        <select
          id="instrument"
          value={instrument}
          onChange={handleInstrumentChange}
          required
        >
          <option value="">-- Select an instrument --</option>
          <option value="guitar">Guitar</option>
          <option value="piano">Piano</option>
          <option value="drums">Drums</option>
          <option value="bass">Bass</option>
        </select>
      </div>
      <div>
        <label htmlFor="zip-code">Zip Code:</label>
        <input
          type="text"
          id="zip-code"
          value={zipCode}
          onChange={handleZipCodeChange}
          maxLength={4}
          minLength={4}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
          maxLength={30}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          maxLength={150}
          required
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default PostForm;
