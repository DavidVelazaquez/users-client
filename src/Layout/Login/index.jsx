import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Loader from '../../Components/Loader'
import constants from "../../common/constants";
import requestHandlers from "./helper";
import logo from "../../assets/logo.png";
import "./login.scss";
import RenderIfValid from "../../common/RenderIfValid";

const { handleInputValue, handleLogin } = requestHandlers;

const {
  LOGIN: { EMAIL, PASSWORD }
} = constants;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }, []);

  return (
    <section className="login">
      <img className="logo" src={logo} />
      <RenderIfValid isValid={errorMessage}>
        <h5>{errorMessage}</h5>
      </RenderIfValid>
      <form className="login__form">
        <Input
          labelText={EMAIL}
          value={email}
          onChange={(e) => handleInputValue(e, setEmail, setErrorMessage)}
        />
        <Input
          labelText={PASSWORD}
          value={password}
          onChange={(e) => handleInputValue(e, setPassword, setErrorMessage)}
        />
        <RenderIfValid isValid={!isLoading}>
          <Button
            onClick={(e) =>
              handleLogin(e, { email, password }, navigate, setErrorMessage, setIsLoading)
            }
            btnValue="LOGIN"
          />
        </RenderIfValid>
        <RenderIfValid isValid={isLoading}><Loader /></RenderIfValid>
      </form>
    </section>
  );
}

export default Login;
