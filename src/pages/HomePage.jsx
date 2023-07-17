import styled from "styled-components";
import CoffeMock from "../images/CoffeMock.jpeg"
import CoffeBeans from "../images/cafe-graos.png"
import CoffeDust from "../images/cafe-moido.png"
import Product from "../components/Product";
import FixedMenu from "../components/Menu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {

    const navigate = useNavigate(); 

    const [latest, setLatest] = useState([]); 


    useEffect( () => {
        axios.get(`${import.meta.env.VITE_API_URL}/products`)
            .then(res => {
                const prods = res.data;
                console.log(res);
                setLatest(prods.slice(0, 5));
            })
            .catch( error => alert(error));
    }, []);


    return (
        <>
        <FixedMenu />
        <PageSC>
            <div>
                <PresentationSection>
                    <div>
                        <h1>Cafés especiais para pessoas com personalidade</h1> 
                        <p>A MELHOR SELEÇÃO DE CAFÉS DO MUNDO INTEIRO, AO SEU ALCANCE</p>
                        <button onClick={() => navigate("/shop")} >EXPLORAR CAFÉS</button>
                    </div>      
            
                    <img src={CoffeMock}/>
                </PresentationSection>   

                <Banners>
                    <div>
                        <h1>FRETE GRÁTIS PARA TODO BRASIL</h1>
                        <p>Nos pedidos acima de R$149</p>
                    </div>

                    <div>
                        <h1>CAFÉ PREMIUM DE ALTA QUALIDADE</h1>
                        <p>Grãos importados com selo</p>
                    </div>

                    <div>
                        <h1>SATISFAÇÃO GARANTIDA</h1>
                        <p>Ou devolvemos seu dinheiro</p>
                    </div>

                    <div>
                        <h1>PAGUE DO SEU JEITO</h1>
                        <p>Parcele em até 12x</p>
                    </div>
                </Banners>         

                <ProductSliders>
                    <h1>Lançamentos</h1>

                    <div> {/* Slider */}
                        {latest.length === 0 ? (
                            <h1>Nao ha produtos para serem exibidos</h1>
                        ) : latest.map((curr, index) => (
                            <Product key={index} product={curr}/>
                        ))}
                    </div>
                </ProductSliders>
        
                <BannersCategorias>
                    <div onClick={alert}>
                        <div>
                            <h1>COMPRAR CAFÉ EM GRÃOS</h1> 
                            <p>Separados por torra, para moer em casa como preferir</p>
                        </div>
                        <img src={CoffeBeans}/>
                    </div>
                    <div onClick={alert}>
                        <div>
                            <h1>COMPRAR CAFÉ MOÍDO</h1> 
                            <p>Escolha a moagem ideal para o seu método favorito</p>
                        </div>                        
                        <img src={CoffeDust}/>
                    </div>
                </BannersCategorias>

                <ProductSliders>
                    <h1>Mais Vendidos</h1>

                    <div> {/* Slider */}
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </div>
                </ProductSliders>
        
                <CommentsSection>
                    <div>
                        <h1>Quem compra se apaixona</h1> 
                    </div>

                    <Comments>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                            <span>
                                <img src={CoffeBeans}/>
                                <p>Karinha Karona</p>
                            </span>
                        </div>

                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                            <span>
                                <img src={CoffeBeans}/>
                                <p>Karinha Karona</p>
                            </span>
                        </div>

                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                            <span>
                                <img src={CoffeBeans}/>
                                <p>Karinha Karona</p>
                            </span>
                        </div>
                    </Comments>
                </CommentsSection>

            </div>
        </PageSC>
        </>
    )
}

const PageSC = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;

    margin: 60px 0px;
    align-items: center;
    & > div {
        max-width: 1100px;
    }

    h1 {
        color: #0B1424;
        font-family: Ubuntu;
        font-size: 45px;
        font-style: normal;
        font-weight: 700;
        line-height: 125%; /* 56.25px */
    }

    p {
        color: #1E1E1E;
        font-family: Ubuntu;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 130%; /* 26px */
    }

    button {
        color: #FFF;
        text-align: center;
        font-family: Ubuntu;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 171.429% */
    }

`

const PresentationSection = styled.div`
    display: flex;
    justify-content: space-between;

    padding: 50px 0px;
    height: 580px;

    gap: 27px;

    div:first-child {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        width: 45%;

        border-radius: 45px;
        padding: 80px 40px 110px 40px;
        gap: 16px;
        
        background-color: #C3CBCE;
        
        button {
            font-size: 18px;
            line-height: 130%; /* 23.4px */
            
            background-color: #013743;
            padding: 15px 35px;
            width: 60%;
            
            border-radius: 16px;
        }
    }

    img {
        width: 55%;
        border-radius: 32px;
        object-fit: cover;
        object-position: 0%;
    }
`

const Banners = styled.div`

    display: flex;
    justify-content: space-between;

    gap: 12px;

    div {
        padding: 30px 20px;
        width: 25%;
        border-radius: 25px;

        display: flex;
        flex-direction: column;
        
        gap: 12px;

        h1 {
            font-size: 22px;
        }
        
        p {
            font-size: 16px;
        } 
    }

    div:nth-child(odd) {
        background-color: #D9D9D9;
    }

    div:nth-child(even) {
        background-color: #CBE2E8;
    }
`

const ProductSliders = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding: 80px 0px;
    gap: 24px;

    width: 100%;


    & > img {
        position: absolute;
        width: 15px;
        height: 15px;
        top: 50%;
    }

    & > .left {
        left: -45px;
    }

    & > .right {
        right: -45px;
    }

    & > div {

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 450px;

        h1 {
            font-size: 24px;
            justify-self: center;
            width: 100%;
            text-align: center;
        }

        div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            
            gap: 10px;
            width: 22.5%;
            
            img {
                width: 100%;
                min-height: 70%;
                border-radius: 16px;

                object-fit: cover;    /* Mock Specific */
                object-position: 45%; /* Mock Specific */
                
            }
            
            p, h2, button{
                text-align: center;
                font-weight: 500;
            }
            
            h2 {
                color: #0D0D0D;
                font-size: 20px;
            }

            p {
                color: #0B1424;
                font-size: 18px;
            }
            
            button {
                background-color: #000000;
                border-radius: 13px;
                padding: 8px ;

                width: 80%;

                color: #FFF;
                font-size: 14px;
                font-weight: 400;
            }



        }
            
    }


`

const BannersCategorias = styled.div`
    display: flex;
    justify-content: space-around;

    gap: 27px;

    & > div {
        width: 50%;
        display: flex;
        background-color: #D9D9D9;
        border-radius: 16px;
        overflow: hidden;

        cursor: pointer;

        div {
            box-sizing: content-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            padding :0px 35px;
            width: 50%;

            h1 {
                font-size: 26px;
            }
            p {
                font-size: 16px;
            }
        }
    }

`

const CommentsSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    gap: 65px;

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        span {
            display: flex;
            gap: 16px
            
        }
        
        span > img {
            cursor: pointer;
        }
    }
`

const Comments = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    gap: 27px;
    
    & > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        width: 33%;
        
        gap: 16px;
        padding: 24px 30px;

        border-radius: 32px;
        background-color: #F2F5F7;

        p {
            color: #A1AEB7;
            font-size: 22px;
            font-weight: 300;
            line-height: 130%; /* 28.6px */
        }

        span {
            width: max-content;
            img {
                width: 45px;
                height: 45px;
                margin-right: 16px;
                border-radius: 32px;
            }
            
            p {
                font-size: 18px;
                line-height: normal;
                font-weight: 400;
            }
        }
    }

`