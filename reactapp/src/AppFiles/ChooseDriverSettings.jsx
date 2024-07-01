import { PhonePageWrapper } from './Components/PhoneWrapper'
import { TextFieldSlider } from './Components/SliderTextField'
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { theme as newTheme } from './Components/NewTheme'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { useState, useEffect } from "react";


const NameAndTextField = styled.div`
    margin-top: 2vh;
    display:flex;
    align-items: end;
    justify-content: space-between;
    width: 100%;
`

const TextFieldStyle = styled.div`
    width: 40vw;
    display: flex;
    justify-content: center;
`

const NameTextStyle = styled.div`
    font-size: 5vw;
    margin-bottom: 1vh;
`


const PrettoSlider = styled(Slider)({
    color: '#ed6d03',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 27,
        height: 27,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#ed6d03',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});


export function ChooseDriverSettings() {

    const [valueAmountSlider, setValueAmountSlider] = useState(3);
    const [valueDeviationSlider, setValueDeviationSlider] = useState(100);
    const [valuePriceSlider, setValuePriceSlider] = useState(100);


    const changeAmount = (amount) => {
        setValueAmountSlider(amount)
    }
    const changeDeviation = (amount) => {
        setValueDeviationSlider(amount)
    }

    const changePrice = (amount) => {
        setValuePriceSlider(amount)
    }

    const handleChangeAmount = (event, newValue) => {
        setValueAmountSlider(newValue);
    };

    const handleChangeDeviation = (event, newValue) => {
        setValueDeviationSlider(newValue);
    };

    const handleChangePrice = (event, newValue) => {
        setValuePriceSlider(newValue);
    };

    return (
        <>
            <ThemeProvider theme={newTheme}>
                <PhonePageWrapper>
                    <NameAndTextField>
                        <NameTextStyle>
                            Amount Of People
                        </NameTextStyle>
                        <TextFieldStyle>
                            <TextFieldSlider valueAmountSlider={valueAmountSlider} changeAmount={changeAmount} minValue={1} maxValue={20} />
                        </TextFieldStyle>
                    </NameAndTextField>
                    <PrettoSlider value={valueAmountSlider} onChange={handleChangeAmount} min={1} max={20} valueLabelDisplay="auto" color="warning"
                        sx={{
                            mt: "4vh"
                        }} />
                    <NameAndTextField>
                        <NameTextStyle>
                            Deviation
                        </NameTextStyle>
                        <TextFieldStyle>
                            <TextFieldSlider valueAmountSlider={valueDeviationSlider} changeAmount={changeDeviation} minValue={10} maxValue={5000} />
                        </TextFieldStyle>
                    </NameAndTextField>
                    <PrettoSlider value={valueDeviationSlider} onChange={handleChangeDeviation} step={10} min={10} max={5000} valueLabelDisplay="auto" color="warning"
                        sx={{
                            mt: "4vh"
                        }} />
                    <NameAndTextField>
                        <NameTextStyle>
                            Price
                        </NameTextStyle>
                        <TextFieldStyle>
                            <TextFieldSlider valueAmountSlider={valuePriceSlider} changeAmount={changePrice} minValue={10} maxValue={1000} />
                        </TextFieldStyle>
                    </NameAndTextField>
                    <PrettoSlider value={valuePriceSlider} onChange={handleChangePrice} min={10} max={1000} valueLabelDisplay="auto" color="warning"
                        sx={{
                            mt: "4vh"
                        }} />
                </PhonePageWrapper>
            </ThemeProvider>
        </>
    );
}