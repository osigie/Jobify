import Wrapper from "../assets/wrappers/RegisterPage";
import { useState, useNavigation, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components/index";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
    isAlert: true,
  };

  const [details, setDetails] = useState(initialState);
  //global state and useNavigate

  const toggleMember = () => {
    setDetails({ ...details, isMember: !details.isMember });
  };

  const handleChange = (e) => {
    console.log(e.target);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <Wrapper className="full-page">
      <form onSubmit={handleSubmit} className="form ">
        <Logo />

        <h3> {details.isMember ? "Login" : "Register"}</h3>
        {details.isAlert && <Alert />}
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
            name={"password"}
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
