import {OnNewMessage} from 'https://splendorous-hamster-ecd34b.netlify.app/devkit.extention.js'


new OnNewMessage("consolelog",(data) => {console.log("Hello World !" + data)})