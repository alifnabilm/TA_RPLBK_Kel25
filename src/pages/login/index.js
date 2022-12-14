import Button from "../../components/button"
import Input from "../../components/input"
import { useState } from "react"
import axios from 'axios'

export default function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginPage = {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto 0',
        width: '100%'
    }

    const title = {
        marginBottom: '8px',
        color: '#FF9F45'
    }
    
    const subtitle = {
        color: '#141C2E'
    }

    const submitForm = () => {
        axios
        .post('https://reqres.in/api/login', {
            email: email,
            password: password
        })
        .then((res) => {
            if(res.status == 200){
                props.action(true)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div style={{display: 'flex', height: '100%'}}>
            <section style={loginPage}>
                <div style={{marginBottom: '20px'}}>
                    <h2 style={title}>
                        Reading App    
                    </h2>          
                    <p style={subtitle}>
                        Enjoy your book on your freetime
                    </p>       
                </div>

                <form style={{display: 'flex', flexDirection:'column'}}>
                    <label>Email</label>
                    <Input type='email' placeholder='Input your email' margin='12px 0 20px 0' action={(data) => setEmail(data)}/>

                    <label>Password</label>
                    <Input type='password' placeholder='Input your password' margin='12px 0 20px 0' action={(data) => setPassword(data)}/>
                </form>

                <div onClick={submitForm}>
                    <Button name="login"/>
                </div>

            </section>
        </div>
    )
}