export default function BookCard(props){

    const card = {
        width: "180px",
        height: "280px",
        overflow: 'hidden',
        borderRadius: '8px 8px 0 0',
        marginLeft: "20px",
        flexShrink: '0'
    }

    const book = {
        height: '60%',
        width: '100%',
        background: `url(${props.image})`,
        backgroundSize: "cover",
    }

    const title = {
        fontSize : "14px",
        fontWeight: '600',
        margin: '0 0 4px 0',
        color: "black"
    }
    
    const year = {
        fontSize : "14px",
        fontWeight: '600',
        margin: '0 0 4px 0',
        color: "#FF9F45"
    }

    const author = {
        fontSize : "14px",
        fontWeight: '500',
        margin: '0 0 4px 0',
        color: "black"
    } 

    return(
        <div style={card}>
            <div style={book}>
            </div>
            <div style={{padding: "16px", backgroundColor: '#FAFAFA'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p style={title}>
                        {props.title}
                    </p>
                    <p style={year}>
                        {props.year}
                    </p>
                </div>
                <p style={author}>
                    {props.author}
                </p>
            </div>
        </div>
    )
}