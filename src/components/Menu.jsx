import styled from "styled-components"
import image from "../images/logoWhite.png"
import text from "../images/textWhite.png"
import icon1 from "../images/icon1.png"
import icon2 from "../images/icon2.png"
import { useNavigate } from "react-router-dom"

export default function FixedMenu() {

    const navigate = useNavigate(); 

    return (
        <Menu>
            <MenuContainer>
                <ImageText onClick={() => navigate("/")}>
                    <img src={image}></img>
                    <img src={text}></img>
                </ImageText>

                <input placeholder="Pesquisar"/>

                <Icons>
                    <img src={icon1}></img>
                    <img src={icon2}></img>
                </Icons>
            </MenuContainer>
        </Menu>
    )
}

const Menu = styled.div`
height: 150px;
width: auto;
display: flex;
justify-content: center;
`

const MenuContainer = styled.div`
    width: 1100px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input{
        width: 337px;
        height: 35px;
        border-radius: 10px; 
        background-color: #EBEBEB;
        border: 1px solid #013743;
        padding: 20px;
        
        ::placeholder {
            color: #424B5A;
            font-size: 14px;
        }
    }
    `

const ImageText = styled.div`
width: 200px;
height: 105px;
display: flex;
cursor: pointer;
` 

const Icons = styled.div`
width:200px;
height: 33px;
display: flex;
justify-content: center;
gap: 15px;
`