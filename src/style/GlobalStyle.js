import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Ubuntu", sans-serif;
        font-style: normal;
        font-weight: 400;
        box-sizing: border-box;
    }
    
    button {
        outline: none;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
    }
    input {
        font-size: 20px;
        width: calc(100% - 30px);
        border-radius: 5px;
        outline: none;
        border: 1px solid #ccc;
        padding: 15px;
        margin: 1px;
    }

    input:focus {
        border: 2px solid #E0EFFE;
        margin: 0px;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        width: 100%;
        border-radius: 5px;
    }
    a {
        text-decoration: none;
    }
`

export default GlobalStyle