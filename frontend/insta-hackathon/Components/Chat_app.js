import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import queryString from "query-string";

const Chat_app = ({location}) => {
    const [name, setName] = useState('');
    const [id, setId] = useState("");
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    var connectionOptions = {
        "force new connection": true,
        "reconnectionAttempts": "Infinity",
        "timeout": 10000,
        "transports": ["websocket"]
    };

    var socket = io.connect('https://localhost:8080');

    useEffect(() => {
        // const {name} =  queryString.parse(location.search);
        // console.log(name);
        setName("Karan");
        // setId('');
        socket.emit("join",{name},(error)=>{
            alert({"error":error});
        })
    }, [])


    
}

export  {Chat_app}