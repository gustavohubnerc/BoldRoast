import { styled } from "styled-components";
import FixedMenu from "../components/Menu";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShopPage (){
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/products`)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err.response.data))
    }, []);
    return (
        <>
        <FixedMenu />
        <Shop>
            <h1>Conheça nossos produtos</h1>
            <ProductsContainer>
                {products.length === 0 ? (
                    <p>Não há produtos para mostrar.</p>
                ) : (
                    products.map((product) => <Product key={product._id} product={product} />)
                )}
            </ProductsContainer>
        </Shop>
        </>
    )
}
const Shop = styled.div`
    font-family: Ubuntu, sans-serif;
    max-width: 1100px;
    min-height: calc(100vh - 480px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    margin: auto;
    margin-top: 60px;
    margin-bottom: 120px;

    h1{
        color: #0B1424;
        font-size: 38px;
        font-weight: 700;
    }
`
const ProductsContainer = styled.div`
    padding-top: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap:30px;
    flex-wrap: wrap;

    p{
        width: 100%;
        text-align: center;
    }
`