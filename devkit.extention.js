export const OnNewMessage = {
    code : "",
    LauchCode : function(data) {    
        let lauch = ""
        lauch = OnNewMessage.code
        var s = ""
        lauch(data)
    },
    setup_code : function(name,code) {
        OnNewMessage.code = code
    },
    OnMessage : function(val) {
        var CodeToLauch =  OnNewMessage.code
        OnNewMessage.LauchCode(val)
    }
}

export const docs = {
    help : 
    `import {OnNewMessage} from 'https://splendorous-hamster-ecd34b.netlify.app/devkit.extention.js'
    // note the type support by the core are not send 
    OnNewMessage.setup_code("code name",(data) => {
        console.log("message recive = " + data.message)
    })
    `
}