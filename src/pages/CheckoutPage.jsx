import { styled } from "styled-components";
import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import PopupLogin from "../components/PopupLogin";


export default function CheckoutPage(){
    const [exibirEndereco, setExibirEndereco] = useState(true);
    const [exibirPagamento, setExibirPagamento] = useState (false);
    const [botaoFinalizar, setBotaoFinalizar] = useState (true);

    const [addressName, setAddressName] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [addressComplement, setAddressComplement] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const [creditCard, setCreditCard] = useState("");
    const [cardOwner, setCardOwner] = useState("");
    const [cardExpiringDate, setCardExpiringDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [installments, setInstallments] = useState("");

    const { token } = useContext(AuthContext);
    const config = { headers: { Authorization:`Bearer ${token}` } }

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const {products, total, notes} = useContext(CartContext);

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    function navegarLoja(){
        navigate('/shop');
    }

    function formatarCEP(e){
        const input = e.target;
        let value = input.value.replace(/\D/g, '');
    
        if (value.length > 8) {
            value = value.slice(0, 8);
        }
    
        if (value.length > 5) {
            value = `${value.slice(0, 5)}-${value.slice(5)}`;
        }
    
        input.value = value;
    }

    function formatarNumeroCartao(e){
        const input = e.target;
        let value = input.value.replace(/\D/g, '');

        if (value.length > 16) {
            value = value.slice(0, 16);
        }

        value = value.replace(/(\d{4})/g, '$1 ').trim();
        input.value = value;
    }

    function formatarValidadeCartao(e){
        const input = e.target;
        let value = input.value.replace(/\D/g, '');

        if (value.length > 4) {
            value = value.slice(0, 4);
        }

        value = value.replace(/^(\d{2})/, '$1/');
        input.value = value;
    }

    function formatarCVVCartao(e){
        const input = e.target;
        let value = input.value.replace(/\D/g, '');

        if (value.length > 3) {
            value = value.slice(0, 3);
        }

        input.value = value;
    }

    function handleEndereco(e){
        e.preventDefault();

        setExibirEndereco(false);
        setExibirPagamento(true);
    }

    function handlePagamento(e){
        e.preventDefault();

        setExibirPagamento(false);
        setBotaoFinalizar(false);
    }

    function enviarPedido(){
       
        const formatedCC = creditCard.replaceAll(" ", "");

        const compra = {
            notes,
            products,
            addressInfo:{ addressName,cep,address,addressComplement,city,state },
            paymentInfo:{creditCard: formatedCC, cardOwner, cardExpiringDate, cvv, installments }
        }
        axios.post(`${import.meta.env.VITE_API_URL}/purchases`, compra, config)
            .then(() => {
                alert("Recebemos seu pedido!");
                navigate('/');
            })
            .catch(error=>{
                if(error.response.status === 422){
                    alert("Preencha todos os campos corretamente");
                    setExibirEndereco(true);
                    return;
                }
                if(error.response.status === 401){
                    alert("Você foi desconectado, faça o login novamente.");
                    navigate('/login');
                    return;
                }
                if(error.response.status === 500){
                    alert("Tente novamente em alguns instantes");
                    return;
                }
            })
    }

    return(
        <>
        {isLoggedIn ?
                        <CheckoutDiv>
                        <TopContent>
                            <h1>Checkout</h1>
                            <button onClick={navegarLoja}>VOLTAR PARA A LOJA</button>
                        </TopContent>
        
                        <MainContent>
                            <CheckoutInputs>
                                {exibirEndereco ?
                                        <Inputs>
                                            <h2>Endereço de Entrega</h2>
                                            <form onSubmit={handleEndereco}>
                                                <label htmlFor="remetente">Nome completo do remetente</label>
                                                <input
                                                    name="remetente"
                                                    placeholder="Digite o nome completo aqui"
                                                    type="text"
                                                    required
                                                    onChange={(e) => setAddressName(e.target.value)}
                                                />
        
                                                <label htmlFor="cep">CEP</label>
                                                <input
                                                    name="cep"
                                                    placeholder="Digite o número do seu CEP aqui"
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength="9"
                                                    onInput={formatarCEP}
                                                    required
                                                    onChange={(e) => setCep(e.target.value)}
                                                />
        
                                                <label htmlFor="endereco">Endereço</label>
                                                <input
                                                    name="endereco"
                                                    placeholder="Digite o seu endereço aqui"
                                                    type="text"
                                                    required
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
        
                                                <label htmlFor="complemento">Complemento (opcional)</label>
                                                <input
                                                    name="complemento"
                                                    placeholder="Digite o complemento do seu endereço aqui"
                                                    type="text"
                                                    onChange={(e) => setAddressComplement(e.target.value)}
                                                />
        
                                                <label htmlFor="cidade">Cidade</label>
                                                <input
                                                    name="cidade"
                                                    placeholder="Digite sua cidade aqui aqui"
                                                    type="text"
                                                    required
                                                    onChange={(e) => setCity(e.target.value)}
                                                />
        
                                                <label htmlFor="estado">Estado</label>
                                                <select
                                                    name="estado"
                                                    required
                                                    onChange={(e) => setState(e.target.value)}
                                                >
                                                    <option value="">Selecione seu estado</option>
                                                    <option value="AC">Acre</option>
                                                    <option value="AL">Alagoas</option>
                                                    <option value="AP">Amapá</option>
                                                    <option value="AM">Amazonas</option>
                                                    <option value="BA">Bahia</option>
                                                    <option value="CE">Ceará</option>
                                                    <option value="DF">Distrito Federal</option>
                                                    <option value="ES">Espírito Santo</option>
                                                    <option value="GO">Goiás</option>
                                                    <option value="MA">Maranhão</option>
                                                    <option value="MT">Mato Grosso</option>
                                                    <option value="MS">Mato Grosso do Sul</option>
                                                    <option value="MG">Minas Gerais</option>
                                                    <option value="PA">Pará</option>
                                                    <option value="PB">Paraíba</option>
                                                    <option value="PR">Paraná</option>
                                                    <option value="PE">Pernambuco</option>
                                                    <option value="PI">Piauí</option>
                                                    <option value="RJ">Rio de Janeiro</option>
                                                    <option value="RN">Rio Grande do Norte</option>
                                                    <option value="RS">Rio Grande do Sul</option>
                                                    <option value="RO">Rondônia</option>
                                                    <option value="RR">Roraima</option>
                                                    <option value="SC">Santa Catarina</option>
                                                    <option value="SP">São Paulo</option>
                                                    <option value="SE">Sergipe</option>
                                                    <option value="TO">Tocantins</option>
                                                </select>
        
                                                <button type="submit">SEGUIR PARA PAGAMENTO</button>
                                            </form>
                                        </Inputs>
        
                                :   <ClosedInputs>
                                        <h2>Endereço de Entrega</h2>
                                    </ClosedInputs>
                                }
                                
                                {exibirPagamento ? 
                                    <Inputs>
                                        <h2>Dados de Pagamento</h2>
                                        <form onSubmit={handlePagamento}>
                                            <label htmlFor="numerocartao">Número do cartão</label>
                                            <input
                                                name="numerocartao"
                                                type="text"
                                                required
                                                inputMode="numeric"
                                                pattern="[0-9\s]{13,19}"
                                                autoComplete="cc-number"
                                                onInput={formatarNumeroCartao}
                                                maxLength="19"
                                                placeholder="1234 5678 9123 4567"
                                                onChange={(e) => setCreditCard(e.target.value)}
                                            />
            
                                            <label htmlFor="nomecartao">Nome impresso no cartão</label>
                                            <input
                                                name="nomecartao"
                                                placeholder="Digite o nome impresso no cartão"
                                                type="text"
                                                required
                                                onChange={(e) => setCardOwner(e.target.value)}
                                            />
            
                                            <label htmlFor="validade">Validade</label>
                                            <input
                                                name="validade"
                                                placeholder="MM/AA"
                                                onInput={formatarValidadeCartao}
                                                type="text"
                                                required
                                                onChange={(e) => setCardExpiringDate(e.target.value)}
                                            />
            
                                            <label htmlFor="cvv">Código de segurança (CVV)</label>
                                            <input
                                                name="cvv"
                                                placeholder="123"
                                                onInput={formatarCVVCartao}
                                                maxLength="3"
                                                type="number"
                                                onChange={(e) => setCvv(e.target.value)}
                                            />
            
                                            <label htmlFor="parcelamento">Parcelamento</label>
                                            <select
                                                name="parcelamento"
                                                required
                                                onChange={(e) => setInstallments(e.target.value)}
                                            >
                                                <option value="">Escolha o número de parcelas</option>
                                                <option value="1x">1x</option>
                                                <option value="2x">2x</option>
                                                <option value="3x">3x</option>
                                                <option value="4x">4x</option>
                                                <option value="5x">5x</option>
                                                <option value="6x">6x</option>
                                                <option value="7x">7x</option>
                                                <option value="8x">8x</option>
                                                <option value="9x">9x</option>
                                                <option value="10x">10x</option>
                                                <option value="11x">11x</option>
                                                <option value="12x">12x</option>
                                            </select>
            
                                            <button type="submit">REVISAR SEU PEDIDO</button>
                                        </form>
                                    </Inputs>
        
                                :   <ClosedInputs>
                                        <h2>Dados de Pagamento</h2>
                                    </ClosedInputs>
                                }
                                
                                
                            </CheckoutInputs>
                            <ReviewOrder>
                                <div>
                                    <h3>Revise seu Pedido</h3>
                                    <OrderItems>
                                    {products.length === 0 ? (
                                        <p>Carregando produtos...</p>
                                    ) : (
                                        products.map((product) =>{
                                            <OrderItem key={product._id}>
                                                <img src={product.image}></img>
                                                <div>
                                                    <h4>{product.name}</h4>
                                                    <p>Variação: {product.productVariation}</p>
                                                    <p>Quantidade: {product.productQuantity}</p>
                                                    <div>R${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                                                </div>
                                            </OrderItem>
                                        })
                                    )}
                                    </OrderItems>
                                </div>
                                <TotalOrder>
                                    <div>
                                        <h3>Total:</h3>
                                        <h3>R${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                                    </div>
                                    <button disabled={botaoFinalizar} onClick={enviarPedido}>FINALIZAR PEDIDO</button>
                                </TotalOrder>
                            </ReviewOrder>
                        </MainContent>
                    </CheckoutDiv>
        :
            <PopupDiv>
                <div>
                <PopupLogin />
                </div>
            </PopupDiv>
        }

        </>
    )
}

const CheckoutDiv = styled.div`
    font-family: Ubuntu, sans-serif;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    margin: auto;
    margin-top: 60px;
`
const TopContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    h1{
        color: #0D0D0D;
        font-size: 42px;
        font-weight: 700;
    }

    button{
        width: 265px;
        padding: 13px 30px;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: #013743;

        color: #FFF;
        font-size: 16px;
        font-weight: 400;
        text-transform: uppercase;
    }
`
const MainContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 50px 0px 30px;
`
const CheckoutInputs = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
`
const ReviewOrder = styled.div`
    width: 35%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3{
        color: #1E1E1E;
        font-size: 28px;
        font-weight: 700;
        padding-bottom: 30px;
    }
`
const OrderItems = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const OrderItem = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 20px;

    img{
        width: 95px;
        height: 95px;
        object-fit: cover;
        border-radius: 5px;
    }
    div{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 6px;

        h4{
            color: #1E1E1E;
            font-size: 16px;
            font-weight: 500;
            line-height: 115%;
        }
        p{
            color: #424B5A;
            font-size: 12px;
            font-weight: 400;
        }

        div{
            display: flex;
            align-items: flex-end;

            color: #1E1E1E;
            font-weight: 500;
        }
    }
    
`
const TotalOrder = styled.div`
    align-self: flex-end;
    width: 100%;
    div{
        display: flex;
        justify-content: space-between;
        h3{
            font-size: 24px;
        }
    }
    button{
        border-radius: 13px;
        background: #013743;
        padding: 18px 41px;

        color: #FFF;
        font-size: 21px;
        font-weight: 400;
        text-transform: uppercase;
    }
`
const ClosedInputs = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    background: #F2F5F7;
    padding: 27px 26px;
    margin-bottom: 25px;

    h2{
        color: #5A5A5D;
        font-size: 32px;
        font-weight: 700;
    }
`
const Inputs = styled.div`
    border-radius: 15px;
    background: #F2F5F7;
    padding: 27px 26px;
    margin-bottom: 25px;
    
    h2{
        color: #5A5A5D;
        font-size: 32px;
        font-weight: 700;
    }

    form{
        padding: 30px 0px 15px;
        label{
            align-self: flex-start;
            text-align: left;
        }
        input{
            align-self: flex-start;
        }
        select{
            align-self: flex-start;
            font-size: 20px;
            width: calc(100% - 30px);
            border-radius: 5px;
            outline: none;
            border: 1px solid #ccc;
            padding: 15px;
            margin: 1px;
            
            :focus {
                border: 2px solid #E0EFFE;
                margin: 0px;
            }
        }
    }

    button{
        margin: 0% 25%;
        width: 265px;
        padding: 13px 30px;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: #013743;

        color: #FFF;
        font-size: 16px;
        font-weight: 400;
        text-transform: uppercase;
    }
`
const PopupDiv = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(217, 217, 217, 0.30);

    div{
        width: max-content;
        height: max-content;
    }
`