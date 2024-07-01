import TextField from '@mui/material/TextField';


export const TextFieldSlider = (props) => {
    const { minValue, maxValue, changeAmount, valueAmountSlider } = props;

    const onChange = (e) => {
        let val = e.target.value;
        if (isNaN(val)) val = minValue;
        val = Math.max(val, minValue);
        val = Math.min(val, maxValue);
        changeAmount(val);
    }
    return (
        <TextField variant="filled"
            value={valueAmountSlider}
            onChange={onChange}
            inputProps={{ style: { fontSize: 20 } }}
            sx={{
                display: "flex",
                "align-items": "center",
                "justify-content": "center"
            }}>


        </TextField>
    )
}