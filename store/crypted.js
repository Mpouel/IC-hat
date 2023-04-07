import {setCookie,getCookie} from "https://splendorous-hamster-ecd34b.netlify.app/bhuy3huygyufwyuge.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getDatabase,
    set,
    ref,
    push,
    child,
    onValue,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD9po7l-vwO0VrY1rMYDFTYNlEBv54T6do",
  authDomain: "ic-hat.firebaseapp.com",
  databaseURL: "https://ic-hat-default-rtdb.firebaseio.com",
  projectId: "ic-hat",
  storageBucket: "ic-hat.appspot.com",
  messagingSenderId: "720687529085",
  appId: "1:720687529085:web:2d964e880c5e2398058514",
  measurementId: "G-YC8K0D7GLR"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

if (getCookie("ready") != null) {
    var myEmail = getCookie("email")
    var myName = getCookie("email")
} else {}
try {
    var send = document.getElementById("send");
    var send2 = document.getElementById("content");

    send.replaceWith(send.cloneNode(true));
    send2.replaceWith(send2.cloneNode(true));

    var send = document.getElementById("send");
    var send2 = document.getElementById("content");
    send.addEventListener('click', (e) => {
        var fg = document.getElementById('content').value
        console.log(fg.replace(/\s/g, '').length)
        var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        if (document.getElementById('content').value != "" && fg.replace(/\s/g, '').length != 0) {
            var str = document.getElementById('content').value;
            var str1 = str.replaceAll("<","&lt;")
            var str2 = str1.replaceAll(">","&gt;")
            var message = str2;
            var name = myName;
            const id = push(child(ref(database), 'messages')).key;
            var friend = "none"
            var cusid = document.getElementsByClassName('people-person active')[0].id
            if (fg.search("&#x") == -1) {
                fetch("https://cryptjs-ic-hat-extention.francoischouin1.repl.co/crypt/" + message, {method: "GET"})
                .then((response) => response.text())
                .then((data) => {
                    set(ref(database, 'messages/'+ cusid + '/' + id), {
                        email:name,
                        allow:friend,
                        type:"encrypted",
                        message: data,
                        date: Date.now(),
                        dname: cusid
                    });
                    document.getElementById('content').value = "";    
                })
                .catch((error) => {
                    console.error("Error:", error);
                 });
            } else {
                set(ref(database, 'messages/'+ cusid + '/' + id), {
                    email:name,
                    allow:friend,
                    type:"message",
                    message: message,
                    date: Date.now(),
                    dname: cusid
                });
            }
        } else {}
    });
    send2.addEventListener("keydown", (e) => {
        if (event.keyCode == 13) {
            var fg = document.getElementById('content').value
            var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
            if (document.getElementById('content').value != "" && fg.replace(/\s/g, '').length != 0) {
                var str = document.getElementById('content').value;
                document.getElementById('content').value = "";
                var str1 = str.replaceAll("<","&lt;")
                var str2 = str1.replaceAll(">","&gt;")
                var message = str2;
                var name = myName;
                const id = push(child(ref(database), 'messages')).key;
                var friend = "none"
                var cusid = document.getElementsByClassName('people-person active')[0].id
                if (fg.search("&#x") == -1 && fg.search("?") == -1) {
                    fetch("https://cryptjs-ic-hat-extention.francoischouin1.repl.co/crypt/" + message, {method: "GET"})
                    .then((response) => response.text())
                    .then((data) => {
                        set(ref(database, 'messages/'+ cusid + '/' + id), {
                            email:name,
                            allow:friend,
                            type:"encrypted",
                            message: data,
                            date: Date.now(),
                            dname: cusid
                        });
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
                } else {
                    set(ref(database, 'messages/'+ cusid + '/' + id), {
                        email:name,
                        allow:friend,
                        type:"message",
                        message: message,
                        date: Date.now(),
                        dname: cusid
                    });
                }
            } else {}
        } else {}
    });
} catch {}