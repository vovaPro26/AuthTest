import styled from 'styled-components';

export const CentralDiv = styled.div`
display: flex;

justify-content: center;
flex-direction: column;
`


export const PhonePage = styled.div`
display: flex;
height: 95vh;
margin-left: 25px;
margin-right: 25px; 
align-items: center;
justify-content: center;
flex-direction: column;
margin-top: 1vh;    
`


export const PhonePageWrapper = ({ children }) => {
    return (
        <CentralDiv>
            <PhonePage>
                {children}
            </PhonePage>
        </CentralDiv>
    )
}