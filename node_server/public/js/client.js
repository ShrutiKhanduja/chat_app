const socket= io("http://localhost:4000");
const form=document.getElementById("send-container");
const messageInput=document.getElementById("messageInp");
const messageContainer=document.querySelector(".container");
const name=prompt("Enter your name to join"); 
socket.emit("new-user-joined",name);
var audio=new Audio('ting.mp3');
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        console.log("yes");
    audio.play();
    }
}
socket.on("user-joined", data=>{
    append(`${data} joined the chat`,'right');
});
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    console.log(message);
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
}

);
socket.on("receive",data=>{
    append(`${data.name}: ${data.message}`,'left');
});
socket.on("left",name=>{
    append(`${name} left the chat`,'left');
});