var socket;
var usernameInput
var chatIDInput;

function onload() {
    socket = io("https://staticlimemonad.virusgaming1.repl.co");
    const data = new URLSearchParams(window.location.search);
    usernameInput = data.get('name')
    chatRoom = data.get('id')
    socket.on("join", function(room) {})

    socket.on("recieve", function(message) {
        var d = new URLSearchParams(message)
        console.log(d.get("type"))
        console.log(d.get("uuid"))
        if (d.get("type") == "call") {
            document.getElementById("Calling").dataset.uuid = d.get("uuid")
            document.getElementById("UserNameCall").innerText = d.get("name")
            openModal()
        }
    })
    socket.emit("join", chatRoom, usernameInput);
}


function Send(message) {
    if (message.replace(/\s/g, "") != "") {
        socket.emit("send", message);
    }
}

function uuidv4() { 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) { 
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8); 
        return v.toString(16); 
    }); 
}

function StartCall() {
    Send(`?f&type=call&uuid=${uuidv4()}&name=gilaxy05`)
}