import TapAngGoNameImg from '../TapandgoName.png'
import PersonLogo from '../PersonLogo.png'
import CarLogo from '../CarLogo.jpg'
import styled from 'styled-components';
import { PhonePageWrapper } from './Components/PhoneWrapper'
import { useNavigate } from "react-router-dom";

const Line = styled.div`
   height: 0.4vh;
   background-color: #C9C9C9;
   width: 100%;
   border radius: 45px;
   margin-top: 10vh;
`


const ManImg = styled.img` 
    width: 75%;
    margin-top: 6vh;    
`

const CarImg = styled.img` 
    width: 100%;
    margin-top: 15vh;    

`

export function Home() {
    let navigate = useNavigate()

    function ManClickButton() {
        navigate("/passangerroutesearch")
    }
    function CarClickButton() {
        navigate("/driverroutesearch")
    }
    return (
        <PhonePageWrapper>  
            <img src={TapAngGoNameImg}></img>

            <ManImg onClick={ManClickButton} src={PersonLogo}></ManImg>
            <Line />
            <CarImg onClick={CarClickButton} src={CarLogo}></CarImg>
        </PhonePageWrapper>
    );
}