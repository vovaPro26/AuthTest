import React from 'react';
import styled from 'styled-components';


const MainDivLogin = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5vh;
`

const Login = styled.div`
    font-size: 1.5em;

`
const Panel = styled.div`
    width: 25em;
    height: 12em;
    border: solid 1px;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
`

const InputsZone = styled.div`
    width: 10em;
    display:flex;
    justify-content: center;
`

const ButtonLogin = styled.button`

appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  margin-top: 3px
`


export function App() {
    return (
        <MainDivLogin >
            <Panel>
                <Login >
                    Login
                </Login>
                <InputsZone>
                    <div>
                        <span>
                            Email
                        </span>
                        <input className="inputs" />
                        <span>
                            Password
                        </span>
                        <input className="inputs" />
                    </div>
                </InputsZone>
                <ButtonLogin>
                Login
                </ButtonLogin>
            </Panel>
        </MainDivLogin>
    )
}
