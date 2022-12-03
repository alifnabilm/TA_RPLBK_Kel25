import Button from "../button"

export default function LastReadCard(props) {

    const book = {
        width: '40%',
        height: '100%',
        background: `url(${props.image})`,
        backgroundSize: "cover",

    }
    
    return(
        <div style={{display: "flex", flexDirection: 'row', height: '200px', borderRadius: '8px', backgroundColor: '#fafafa', overflow: 'hidden'}}>
            <div style={book}>
            </div>
            <div style={{display: 'flex', flexDirection: "column", padding: '16px', justifyContent: "space-between"}}>
                <div>
                    <p style={{marginBottom: "4px", color: "#141C2E", opacity: '0.5'}}>
                        Continue Reading
                    </p>
                    <h2 style={{marginBottom: "4px", color: "#141C2E"}}>
                        {props.title}
                    </h2>
                    <h4 style={{color: "#141C2E", opacity: '0.5'}}>
                        {props.author}
                    </h4>
                </div>
                <div>
                    <Button name='Continue'/>
                </div>
            </div>
        </div>
    )
}