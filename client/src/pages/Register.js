import Wrapper from "../assets/wrappers/RegisterPage";
import { useState, useNavigation, useEffect, useRef } from "react";
import { Logo, FormRow, Alert } from "../components/index";
import { useAppContext } from "../context/AppContext";
const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };

  const [details, setDetails] = useState(initialState);
  //global state and useNavigate
  const { isLoading, isAlert, changeAlert } = useAppContext();

  const toggleMember = () => {

    setDetails({ ...details, isMember: !details.isMember });
  };

  const handleChange = (e) => {
    console.log(e.target)
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = details;
    if (!email || !password || (!isMember && !name)) {
      changeAlert();
      return;
    }
    console.log(details);
  };

  return (
    <Wrapper className="full-page">
      <form onSubmit={handleSubmit} className="form ">
        <Logo />

        <h3> {details.isMember ? "Login" : "Register"}</h3>
        {isAlert && <Alert />}
        <div className="form-row">
          {/* name field */}
          {!details.isMember && (
            <FormRow
              value={details.name}
              handleChange={handleChange}
              labelText={"name"}
              type="name"
              name={"name"}
            />
          )}

          {/* email field */}
          <FormRow
            value={details.email}
            handleChange={handleChange}
            labelText={"email"}
            type="email"
            name={"email"}
          />
          {/* password field */}
          <FormRow
            value={details.password}
            handleChange={handleChange}
            labelText={"password"}
            type="password"
            name={"password"}
          />

          <button type="submit" className="btn btn-block">
            submit
          </button>
          <p>
            {details.isMember ? "Not a member yet? " : "Already a member?"}
            <button type="button" className="member-btn" onClick={toggleMember}>
              {details.isMember ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </form>
    </Wrapper>
  );
};

export default Register;