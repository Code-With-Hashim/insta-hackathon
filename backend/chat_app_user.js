
const users = [];

function adduser({id,name}){
    name = name.trim()
    id = id.trim();
    const exists = users.find((user)=>{
        user.id === id && user.name === name;
    })
    if(exists){
        return {error:"user name already exists"};
    }
    let user = {id,name};
    users.push(user);
    return {user};
}

const getUser = (id)=>{
    users.find((user)=>{
        user.id === id;
    })
}

module.exports = {getUser,adduser};

