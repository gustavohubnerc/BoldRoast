import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FixedMenu from '../components/Menu';

export default function ProductPage() {
    const { id } = useParams();

    const [ quantity, setQuantity ] = useState(1);
    const [ selected, setSelected ] = useState(1);
    const [ product, setProduct ] = useState();
    const [ variationsArray, setVariationsArray] = useState([]);

    const incrementQuantity = () => {
      setQuantity(quantity + 1);
    };
  
    const decrementQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    const handleSelected = (e) => {
        setSelected(e);
    }

    const handleClickBuy = () => {
        alert('Produto adicionado ao carrinho');
    }

    useEffect(() => {
        const getProducts = async() => {
            console.log("chamou!")
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
                const newProduct = response.data;

                setProduct(newProduct);

                const variationsArr = newProduct.variations.size.reduce((acc, size) => {
                    const variations = newProduct.variations.grind.map(grind => `${size}/${grind}`);
                    return [...acc, ...variations];
                }, []);

                setVariationsArray(variationsArr);

            } catch(err) {
                console.log(err);
            }   
        }   
        getProducts();
    }, []);
    
    
    
    return (
        <>
        <FixedMenu/>
        <ProductPageContainer>
            {!product ? 
            (
                <h1>Loading</h1>
            ) : (
                <ProductContainer>
                    <ProductImage src={product.image} />
                    <ProductDescription>
                        <ProductName>
                            <h1>
                                {product.name}
                            </h1>
                            <h1>
                                R${product.price.toFixed(2).toString().replace(".", ",")}
                            </h1>
                        </ProductName>
                        <Variations $position={selected}>
                            <p>Variação</p>
                            <div>
                                {variationsArray.map((variation, index) => (
                                    <button key={index} onClick={() => handleSelected(index + 1)}>
                                        {variation}
                                    </button>
                                ))}
                            </div>                       
                        </Variations>
                        <h2>Quantidade</h2>                  
                        <FinishOrder>
                            <QuantityCounter>
                                <QuantityButton onClick={decrementQuantity}>-</QuantityButton>
                                <QuantityDisplay>{quantity}</QuantityDisplay>
                                <QuantityButton onClick={incrementQuantity}>+</QuantityButton>
                            </QuantityCounter>
                            <BuyButton onClick={handleClickBuy}>COMPRAR</BuyButton>
                        </FinishOrder>
                        <h2>Descrição</h2>
                        <h3>{product.description}</h3>
                    </ProductDescription>
                </ProductContainer>     
            ) }
        </ProductPageContainer>
        </>
    );
}

const ProductPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
    margin-top: 50px;
`

const ProductContainer = styled.div`
    background-color: #fff;
    width: calc(100vw - 100px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

`

const ProductImage = styled.img`
    width: 555px;
    height: 583px;
    border-radius: 40px;    
    margin-right: 20px;
`

const ProductDescription = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    height: 600px;
    width: 555px;
    h2 {
        color: #1e1e1e;
        font-family: "Ubuntu", sans-serif;
        font-size: 20px;
        margin-top: 50px;
    }
    h3 {
        color: #A1AEB7;
        font-family: "Ubuntu", sans-serif;
        font-size: 17px;
        margin-top: 20px;
    }
`

const ProductName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    h1 {
        color: #0d0d0d;
        font-family: "Ubuntu", sans-serif;
        font-size: 40px;
        font-weight: bold;
    }
`

const Variations = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 70px;
    justify-content: space-between;
    div {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        width: 360px;
        gap: 15px;
        button:nth-child(${props => props.$position}){
            background-color: #013743;
            color: #fff;
        }
        button {
            width: 165px;
            height: 40px;
            font-size: 18px;
            background-color: #fff;
            color: #0B1424;
            border: 1px solid #013743;
            cursor: pointer;
        }
    }
    p {
        color: #1e1e1e;
        font-family: "Ubuntu", sans-serif;
        font-size: 20px;
    }
   
`

const QuantityCounter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 18px;
  border: none;
  background-color: #ddd;
  cursor: pointer;
`;

const QuantityDisplay = styled.span`
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border: 1px solid #ddd;
  margin: 0 10px;
`;

const FinishOrder = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    button {
        background-color: #013743;
        color: #fff;
    }
`   

const BuyButton = styled.button`
    background-color: #013743;
    color: #fff;
    width: 350px;
    height: 60px;
    border-radius: 13px;
    font-size: 20px;
    margin-top: 3px;
`