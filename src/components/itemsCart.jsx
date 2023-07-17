import styled from "styled-components"
import icon3 from "../images/icon3.png"


export default function ItemsCart() {

    return (
        <ContainerCart>
            <h1>SEU CARRINHO</h1>

            <ContainerItems>
                <img src={icon3}></img>

                <ProductPrice>
                    <h2>Nome do Produto</h2>
                    <p>R$99,99</p>
                </ProductPrice>

                <img src={icon3}></img> 
            </ContainerItems>

            <button>FINALIZAR PEDIDO</button>

        </ContainerCart>
    )  
}

const ContainerCart = styled.div`
width: 431px;
height: 504px;
border-radius: 11px;
background-color: #D9D9D9;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;

h1{
    font-weight: 500;
    font-size: 24px;
    line-height: 31px;
    color: #013743;
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

const ContainerItems = styled.div`
width: 348px;
height: 92px;
display: flex;
justify-content: space-between;
align-items: center;
`

const ProductPrice = styled.div`
width: 182px;

h2{
    font-weight: 500;
    font-size: 22px;
    line-height: 25px;
    color: #1E1E1E;
}

p{
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    color: #424B5A;
    margin-top: 10px;
}
`