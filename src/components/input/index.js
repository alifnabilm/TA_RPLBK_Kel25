export default function Input(props){

    const Input = {
        padding: "14px 24px",
        borderRadius: "8px",
        border: '1.5px solid rgba(0, 0, 0, 0.08)',
        fontSize: '14px',
        margin: props.margin
    }

    const getValue = (e) => {
        props.action(e.target.value)
    }

    return(
        <input type={props.type} placeholder={props.placeholder} style={Input} onChange={(e) => getValue(e)}/>
    )
}