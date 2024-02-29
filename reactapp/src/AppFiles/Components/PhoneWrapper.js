import styled from 'styled-components';

export const CentralDiv = styled.div`
display: flex;

flex-direction: column;
width: 100%;
`


export const PhonePage = styled.div`
display: flex;
margin-left: 25px;
margin-right: 25px; 
align-items: center;

flex-direction: column;
  
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