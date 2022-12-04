import {useNavigate} from 'react-router-dom'
import BookCard from "../../components/bookCard";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../components/input';
import Button from '../../components/button';
import Loading from '../../components/loading';

export default function Search(props){
    const [keySearch, setKeySearch] = useState('')
    const [searchData, setSearchData] = useState(props.search === undefined ? [] : props.search)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const goToDetail = (data) => {
        props.dataBook(data)
        navigate('/detail')
    }

    useEffect(() => {
      if(props.search === undefined){
        navigate("/")
      }
    }, [])
    
    

    const searchBook = (data) => {
        setKeySearch(data)
    }

    const search = () => {
        setLoading(true)
        axios
        .get(`https://openlibrary.org/search.json?q=${keySearch}&limit=10`)
        .then((res) => {
            console.log('done')
            console.log(res.data.docs)
            setSearchData(res.data.docs)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <section>
            
            <div style={{display:'flex', justifyContent: "space-between"}}>
                <div style={{width: '60%'}}>
                    <Input type='text' placeholder='Search Book..' margin='28px 0' action={(data) => searchBook(data)}/>
                </div>
                <div style={{width: '20%', margin: 'auto 0 auto 12px'}} onClick={search}>
                    <Button name="Search"/>
                </div>
            </div>
            <h2>
                Results
            </h2>
            {loading ? 
                <Loading /> : 
                (
                    <div className="recomend-scroll" style={{display: "flex", flexDirection:'row', flexWrap: 'wrap', justifyContent: "space-between"}}>
                        {searchData.map((item, index) => (
                            <div onClick={() => goToDetail(item)}>
                                <BookCard title={item.title} author={item.author_name} image={`https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-L.jpg`}/>
                            </div>
                        ))}
                    </div>
                )
            }
        </section>
    )
}