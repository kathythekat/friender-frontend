import { useContext, useState } from "react";
import UserContext from "../auth/userContext";
import FrienderApi from "../api";

function EditProile() {
  const { currentUser, updateUser } = useContext(UserContext);
  const {
    username,
    firstName,
    lastName,
    email,
    bio,
    interests,
    age,
  } = currentUser;
  const initialState = {
    username,
    firstName,
    lastName,
    email,
    bio,
    interests,
    age,
  };
  const [selectedFile, setSelectedFile] = useState("");
  const [formData, setFormData] = useState(initialState);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let data = new FormData();
    data.append("image", selectedFile);
    const resp = await FrienderApi.sendToS3(data);
    console.log("form response", resp);
    updateUser({ ...formData, imageUrl: resp });
    setFormData({ ...formData, imageUrl: resp });
  }

  return (
    <div>
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          disabled
        />
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
        <input
          id="interests"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
        />
        <input
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          id="file"
          name="file"
          type="file"
          onChange={(e) => {
            console.log(e.target.files);
            setSelectedFile(e.target.files[0]);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditProile;
