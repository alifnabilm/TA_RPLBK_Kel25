import { useEffect, useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Input from "../../components/input";
import LastReadCard from "../../components/lastReadCard";
import BookCard from "../../components/bookCard";
import '../../App.css'
import Button from "../../components/button";
import Loading from "../../components/loading";

export default function Home(props){

    const [user, setUser] = useState();
    const [book, setBook] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);
    const [keySearch, setKeySearch] = useState('');
    const [loading, setLoading] = useState(false)

    const homePage = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    }

    const profile = {
        width: '49px',
        height: "49px",
        borderRadius: '100%',
        backgroundColor: "grey"
    }

    useEffect(() => {
        getCurrentUser();
        getCurrentBook();
    }, [])

    const getCurrentUser =async () => {
        await axios
        .get('https://laravel-books-db.herokuapp.com/api/user', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setUser(res.data.user)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const getCurrentBook = async () => {
        await axios
        .get('https://openlibrary.org/subjects/action.json')
        .then((res) => {
            setBook(res.data.works)
            setCurrentBook(res.data.works[0])
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const navigate = useNavigate();

    const goToDetail = (data) => {
        props.dataBook(data)
        navigate('/detail')
    }

    const searchBook = (data) => {
        // console.log(data)
        setKeySearch(data)
    }

    const search = async () => {
        setLoading(true)
        await axios
        .get(`https://openlibrary.org/search.json?q=${keySearch}&limit=10`)
        .then((res) => {
            setLoading(false)
            console.log(res.data.docs)
            props.dataSearch(res.data.docs)
            navigate('/search')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div style={{display: 'flex', height: '100%', position:'relative'}}>
            {loading ? 
                <Loading /> : 
                (
                    <section style={homePage}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div>
                                <p>
                                    Happy Reading!
                                </p>
                                <h4>
                                    {user ? user.name : ''}
                                </h4>
                            </div>
                            <div style={profile}>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent: "space-between"}}>
                            <div style={{width: '60%'}}>
                                <Input type='text' placeholder='Search Book..' margin='28px 0' action={(data) => searchBook(data)}/>
                            </div>
                            <div style={{width: '20%', margin: 'auto 0 auto 12px'}} onClick={search}>
                                <Button name="Search"/>
                            </div>
                        </div>
                        {currentBook !== null && (
                            <LastReadCard title={currentBook.title} author={currentBook.authors[0].name} image={`https://covers.openlibrary.org/b/olid/${currentBook.cover_edition_key}-L.jpg`}/>
                        )}

                        <h4 style={{margin: '12px 0'}}>
                            Recomended For You
                        </h4>
                        <div className="recomend-scroll" style={{display: "flex", overflowY : 'scroll'}}>
                            {book.map((item, index) => (
                                <div onClick={() => goToDetail(item)}>
                                    <BookCard title={item.title} author={item.authors[0].name} image={`https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-L.jpg`}/>
                                </div>
                            ))}
                        </div>
                        <Link to={'/about'} style={{textDecoration: "none"}}>
                            <Button name="about app" />
                        </Link>
                    </section>
                ) 
            }
        </div>
    )
}