import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useForm from "../services/useForm";
import axios from "axios";
import FixedMenu from "../components/Menu";

export default function RegisterPage() {
  const { form, changeForm } = useForm({ completeName: "", email: "", password: ""});
  
  function useRegister() {
    const navigate = useNavigate();
  
    return (body) => {
      axios
        .post(`${import.meta.env.VITE_API_URL}/register`, body)
        .then(() => navigate("/"))
        .catch(error =>{
          if(error.response.status === 409){
            alert("Ja existe um usuario cadastrado com esse email");
            return;
          }
          alert("Erro desconhecido!");
        })
    };
  }

  const resgister = useRegister();
  function formRegister(e) {
    e.preventDefault();
    resgister(form);
  }

  return (
    <>
    <FixedMenu />
    <ResgisterContainer>
        <h1>Crie a sua conta</h1>

        <div>
          <form onSubmit={formRegister}>
            <label htmlFor="completeName">Nome completo</label>
            <input
              required
              type="text"
              placeholder="Nome Completo"
              name="completeName"
              value={form.completeName}
              onChange={changeForm}
            />
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              placeholder="E-mail"
              name="email"
              value={form.email}
              onChange={changeForm}
            />
            <label htmlFor="password">Email</label>
             <input
              required
              type="password"
              placeholder="Senha"
              name="password"
              value={form.password}
              onChange={changeForm}
            />
            <button type="submit">CRIAR CONTA</button>
            <p>Ao criar sua conta, você aceita os termos e condições e autoriza o uso dos seus dados.</p>
          </form>
        </div>

      <span>Já tem uma conta?<Link to="/login"> Entre agora!</Link></span>
    </ResgisterContainer>
    </>
  );
}


const ResgisterContainer = styled.div`
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
  
    div {
      width: min-content;
    }

    h1{
        font-family: "Ubuntu", sans-serif;
        font-weight: 700;
        font-size: 34px;
        line-height: 64px;
        color: #0B1424;
        margin-bottom: 20px;
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

    p {
      color: #1E1E1E;
      font-size: 13px;
      font-weight: 400;
    }
`;
