import { styled } from "styled-components";
import cafeteiraItalina from "../images/cafeteira-italiana.png";
import { useNavigate } from "react-router-dom";

export default function PopupLogin(){
    const navigate = useNavigate();

    function login(){
        navigate('/login');
    }
    function register(){
        navigate('/register');
    }
    return(
        <PopupDiv>
            <h2>ATENÇÃO!</h2>
            <p>Identifique-se antes de continuar sua compra</p>
            <div>
                <button onClick={login}>FAZER LOGIN</button>
                <button onClick={register}>CRIAR CONTA</button>
            </div>
            <img src={cafeteiraItalina} />
        </PopupDiv>
    )
}

const PopupDiv = styled.div`
    font-family: Ubuntu, sans-serif;
    z-index: 20;
    width: 60%;
    height: 40%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 25px;
    padding: 70px 65px;
    position: relative;

    border-radius: 50.028px;
    border: 2.5px solid #BEBEBF;
    background: rgba(217, 217, 217, 0.50);
    backdrop-filter: blur(9.5px);

    h2{
        color: #5A3A20;
        font-size: 47px;
        font-weight: 700;
    }
    p{
        width: 60%;
        color: #5A3A20;
        font-size: 26px;
        font-weight: 400;
        line-height: 130%;
    }

    button{
        width: 45%;
        border-radius: 14px;
        display: flex;
        padding: 18px 47px;
        justify-content: center;
        align-items: center;
        
        color: #FFF;
        font-size: 22px;
        font-weight: 400;
        text-transform: uppercase;
    }
    div{
        width: 100%;
        display: flex;
        justify-content: space-between;
        z-index: 25;

        :first-child{
            background-color: #013743;
        }
        :nth-child(2n) {
            background-color: #505D68;
        }
    }
    img{
        height: 100%;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 21;
    }
`