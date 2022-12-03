export default function Button(props) {

    const primaryButton = {
        padding: '12px 16px',
        fontSize: '16px',
        textAlign: 'center',
        borderRadius: '8px',
        backgroundColor: '#FF9F45',
        color: "white",
        fontWeight: "600",
        cursor: 'pointer'
    }

    return(
        <div style={primaryButton}>
            {props.name}
        </div>
    )
}