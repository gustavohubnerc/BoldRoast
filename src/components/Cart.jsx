import styled from "styled-components"


export default function FixedCart() {

    return (
        <ContainerCart>
            <p>Seu carrinho está vazio, explore</p>
            <p>alguns produtos primeiro</p>

            <button>EXPLORAR CAFÉS</button>

        </ContainerCart>
    )  
}

const ContainerCart = styled.div`
width: 431px;
height: 439px;
border-radius: 11px;
background-color: #D9D9D9;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

p{
    font-weight: 400;
    font-size: 22px;
    line-height: 25px;
}

button{
    width: 218px;
    height: 53px;
    background-color: #013743;
    color: #FFFFFF;
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;

    &:hover{
        background-color: #00fa9a;
      }
}
`