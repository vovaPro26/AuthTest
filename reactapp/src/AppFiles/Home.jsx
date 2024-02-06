import TapAngGoNameImg from '../TapandgoName.png'
import PersonLogo from '../PersonLogo.png'
import CarLogo from '../CarLogo.jpg'
import styled from 'styled-components';
import { PhonePageWrapper } from './Components/PhoneWrapper'

export function Home() {
    return (
        <PhonePageWrapper>  
            <img src={TapAngGoNameImg}></img>
            <img src={PersonLogo}></img>
            <img src={CarLogo}></img>
        </PhonePageWrapper>
    );
}