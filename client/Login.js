import React,{useState} from "react";
import { Link } from "react-router-dom";
function Hello(props){
        const [st,setSt]=useState({
                user:'',
                room:''
        })
        
        return ( 
        <form className='login-form'>
                <h1>Join Room {st.user}</h1>
                <input type='text' placeholder='Username'  onChange={(e)=>{
                                setSt({
                                        user:e.target.value,room:st.room
                                });
                        }
                }></input>
                <input type='text' placeholder='Secret Key'  onChange={(e)=>{
                                setSt({
                                        room:e.target.value,user:st.user
                                })
                        }
                }></input>
                <Link to={'/chat/'+st.user+'/'+st.room}>
                <button>Join Chat</button>
                </Link>
                </form>)
        }
export default Hello;