import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState, useEffect, useRef } from "react";
import { FormRow, Alert } from "../../components/index";
import { useAppContext } from "../../context/AppContext";

const Profile = () => {
  const { isAlert, isLoading, updateUser, user, changeAlert } = useAppContext();

  const [state, setState] = useState({
    name: user?.name,
    lastName: user?.lastName,
    location: user?.location,
    email: user?.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.name || !state.lastName || !state.email || !state.location) {
      changeAlert();
      return;
    }

    updateUser(state);
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3> Profile </h3>
        {isAlert && <Alert />}
        <div className="form-center">
          <FormRow
            labelText={"name"}
            type={"text"}
            value={state.name}
            handleChange={handleChange}
            name={"name"}
          />
          <FormRow
            labelText={"last Name"}
            type={"text"}
            value={state.lastName}
            handleChange={handleChange}
            name={"lastName"}
          />
          <FormRow
            labelText={"email"}
            type={"text"}
            value={state.email}
            handleChange={handleChange}
            name={"email"}
          />
          <FormRow
            labelText={"location"}
            type={"text"}
            value={state.location}
            handleChange={handleChange}
            name={"location"}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please wait..." : "Save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
