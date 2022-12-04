import { useEffect, useState } from "react"
import axios from "axios"
import BookCard from "../../components/bookCard"
import Button from "../../components/button"
import { useNavigate } from "react-router-dom"
import Loading from "../../components/loading"

export default function Detail(props){
    const [authorBook, setAuthorBook] = useState([])
    const [detailBook, setDetailBook] = useState(props.book)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        getAuthorBook() 
        if(props.book === undefined){
            navigate("/")
        }
    }, [])

    const getAuthorBook = () => {
        setLoading(true)
        axios
        .get(`https://openlibrary.org/search.json?q=${props.book === undefined ? '': props.book.title}&limit=10`)
        .then((res) => {
            setLoading(false)
            console.log(res.data)
            setAuthorBook(res.data.docs)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const cover = {
        display: 'flex', 
        width : '100%',
        height: "347px",
        borderRadius: "0 0 16px 16px",
        // boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
    }

    const imageCover = props.book === undefined ? undefined : props.book.cover_edition_key

    const book = {
        borderRadius: '12px',
        width:  '159px',
        height: '223px',
        margin: 'auto',
        background: `url(https://covers.openlibrary.org/b/olid/${imageCover}-L.jpg)`,
        backgroundSize: 'cover'
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

    
    return(
        <section style={{display: "flex", flexDirection: "column"}}>
            <div style={cover}>
                <div style={book}>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', margin: "20px 0 0 0"}}>
                <p style={title}>
                    {detailBook === undefined ? '' : detailBook.title}
                </p>
                <p style={year}>
                    {detailBook === undefined ? '' : detailBook.first_publish_year}
                </p>
            </div>
            <Button name="Read"/>
            <h4 style={{margin: '12px 0'}}>
                Related Books
            </h4>
            {loading ? 
                <Loading /> : 
                (
                    <div className="recomend-scroll" style={{display: "flex", overflowY : 'scroll', marginTop: '20px'}}>
                        {authorBook.map((item, index) => (
                            <BookCard title={item.title} image={`https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-L.jpg`}/>
                        ))}
                    </div>
                )
            }
        </section>
    )
}