import React,{useState,useEffect} from "react";
import io from 'socket.io-client'
import { IgnorePlugin } from "webpack";
let socket;
const Bye = ({match}) => {
        const ENDPOINT='http://localhost:3000'
        const [msg,setMsg]=useState("");
        
        const [msgs,setMsgs]=useState([]);
        useEffect(()=>{
        socket = io(ENDPOINT, { transport : ['websocket'] });
        socket.emit('join',{user:match.params.user,room:match.params.room});
        
        },[ENDPOINT,match])
        
        const sendMessage=()=>{
                // alert("sent"+msg);
                socket.emit('sendMessage',msg,()=>{
                        setMsg('');
                })
        }
        useEffect(()=>{
                socket.on('message',(message)=>{
                        setMsgs([...msgs,message])            
                })
                },[msgs])
        return ( <div className='chat-d'>
                        <div className='top-b'><h2 style={{fontWeight:500}}>  <i className="fas fa-arrow-circle-left"></i>&nbsp;&nbsp; Room  {match.params.room} </h2>
                        </div>
                        <div className='chat-m'>
                                {/* {msgs.map(e=>{
                                        if(e.user==match.params.user)
                                        {
                                                return(
                                                <h1>{e.text}</h1>
                                                );
                                        }
                                        else if(e.user=='admin')
                                        {
                                                return(
                                                        <p>{e.text}</p>
                                                );
                                        }
                                return (<p>{e.text}</p>)
                                })} */}
                        </div>
                        <input type='text' placeholder='Type and press return/enter to send' value={msg} onChange={(e)=>{
                                setMsg(e.target.value)
                        }}></input>
                        <button onClick={sendMessage}><i className="fas fa-paper-plane"></i></button>
                        </div>)
        }

        export default Bye;