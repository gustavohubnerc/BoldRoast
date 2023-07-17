import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import useForm from "../services/useForm";
import AuthContext from "../context/AuthContext";
import FixedMenu from "../components/Menu";


export default function LoginPage() {
  const { form, changeForm } = useForm({ email: "", password: "" });

  function useLogin() {
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);
  
    return (body) => {
      axios
        .post(`${import.meta.env.VITE_API_URL}/login`, body)
        .then((response) => {
          setToken(response.data);
          localStorage.setItem("token", response.data);
          navigate("/");
        })
        .catch(error =>{
          if(error.response.status === 422){
            alert("Dados em formato invalido!");
            return;
          }
          if(error.response.status === 404){
            alert("O e-mail informado não está cadastrado");
            return;
          }
          if(error.response.status === 401){
            alert("Senha incorreta!");
            return;
          }
        })
    };
  }

  const login = useLogin();
  function formLogin(e) {
    e.preventDefault();
    login(form);
  }

  return (
    <>
    <FixedMenu />
    <LoginContainer>
        <h1>Faça login para sua conta</h1>
      <div>
        <form onSubmit={formLogin}>
          <label htmlFor="email">E-mail</label>
          <input 
            required
            type="email"
            placeholder="E-mail"
            name="email"
            value={form.email}
            onChange={changeForm}
          />
          <label htmlFor="password">Senha</label>
          <input 
            required
            type="password"
            placeholder="Senha"
            name="password"
            value={form.password}
            onChange={changeForm}
          />
          <button type="submit">CONTINUAR</button>
        </form>
      </div>
  
      <span>Ainda não tem uma conta? <Link to="/register">Cadastre-se!</Link></span>
    </LoginContainer>
    </>
  );
}


const LoginContainer = styled.div`
  width: 100%;
  height: calc(100vh - 300px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #1E1E1E;

    h1{
        font-family: "Ubuntu", sans-serif;
        font-weight: 700;
        font-size: 34px;
        line-height: 64px;
        color: #0B1424;
        margin-bottom: 20px;
    }

    div {
      width: min-content;
    }

    input{  
        font-family: "Ubuntu", sans-serif;
        width: 396px;
        height: 48px;
        border-radius: 8px;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
    }
    label {
      align-self: flex-start;
      font-family: "Ubuntu", sans-serif;
      color: #5A5A5D;
      font-size: 16px;
      font-weight: 400;
    }
    
    span {
      color: #1E1E1E;
      font-size: 16px;
      font-weight: 400;
    }
    
    a {
        color: #013743;
    }

    
    button{
        width: 396px;
        height: 53px;
        border-radius: 11px;
        gap: 10px;
        background-color: #013743;
        color: #FFFFFF;
        font-weight: 400;
        font-size: 18px;
        line-height: 23px;
        margin-bottom: 20px;
        margin-top: 20px;

        &:hover{
          background-color: #00fa9a;
        }
    }
`;