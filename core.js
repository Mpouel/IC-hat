import { setCookie, getCookie, delCookie, decrypt, bip, removeloader, getuser, message_date, message_render } from "./bhuy3huygyufwyuge.js"
import { OnNewMessage } from "./devkit.extention.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import lzString from 'https://cdn.jsdelivr.net/npm/lz-string@1.5.0/+esm'
import {
    getDatabase,
    set,
    ref,
    push,
    child,
    onValue,
    onChildAdded,
    onChildChanged
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
localStorage.setItem("state", "no")
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
window.appFire = app
window.databaseFire = database

var myData = await getuser()
if (myData != null) {
    var myEmail = myData.email
    var myName = myData.user_metadata.full_name
    var myImage = myData.user_metadata.avatar_url
    document.getElementById("user_name").myName
    if (myImage != null) {
        document.getElementById("user_pic").src = myImage
        document.getElementById("user_picture_img").src = myImage
    } else {
        document.getElementById("user_pic").src = "img/default.png"
    }
    setCookie("email", myEmail)
    setCookie("name", myName)
    document.getElementById("not-connected").remove()
    document.getElementById("wait-connected").remove()
} else {
    document.getElementById("connected").remove()
    document.getElementById("wait-connected").remove()
    window.location.replace(window.location.origin)
}

export async function resizeImage(dataUrl, targetFileSizeKb, maxDeviation = 1) {
    let originalFile = await urltoFile(dataUrl, 'test.png', 'image/png');
    if (originalFile.size / 1000 < targetFileSizeKb)
        return dataUrl; // File is already smaller

    let low = 0.0;
    let middle = 0.5;
    let high = 1.0;

    let result = dataUrl;

    let file = originalFile;

    while (Math.abs(file.size / 1000 - targetFileSizeKb) > maxDeviation) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const img = document.createElement('img');

        const promise = new Promise((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = reject;
        });

        img.src = dataUrl;

        await promise;

        canvas.width = Math.round(img.width * middle);
        canvas.height = Math.round(img.height * middle);
        context.scale(canvas.width / img.width, canvas.height / img.height);
        context.drawImage(img, 0, 0);
        file = await urltoFile(canvas.toDataURL(), 'test.png', 'image/png');

        if (file.size / 1000 < (targetFileSizeKb - maxDeviation)) {
            low = middle;
        }
        else if (file.size / 1000 > targetFileSizeKb) {
            high = middle;
        }

        middle = (low + high) / 2;
        result = canvas.toDataURL();
    }

    return result;
}

export function print(text) {
    preventDefault()
    console.log(text)
}

export function urltoFile(url, filename, mimeType) {
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
}

export function filetoUrl(file) {
    var reader = new FileReader();
    let last_image_url = None
    reader.readAsDataURL(file);
    reader.onload = function () {
        last_image_url = reader.result
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
    return last_image_url
}

export function image_render(email, name) {
    var myName = name
    var name = email;
    var filelist = document.getElementById("file_input").files
    Object.keys(filelist).forEach(key => {
        var file = document.getElementById("file_input").files[key]
        var cusid = document.getElementsByClassName('chat active-chat')[0].dataset.chat
        var reader = new FileReader();
        reader.onload = function () {
            console.log(reader)
            const id = push(child(ref(database), 'messages')).key;
            console.log("[image render] Sending...")
            set(ref(database, "messages/" + cusid + "/" + id), {
                email: name,
                name: myName,
                friend: "none",
                type: "new-image",
                message: "png;base64," + reader,
                date: Date.now(),
                dname: cusid
            })
            console.log("[image render] File is perfect")
            document.getElementById("file").style.display = "none";
            document.getElementById("file_input").value = "";
        }
        reader.readAsDataURL(file)
    });
}
try {
    const send = document.getElementById("send");
    const send2 = document.getElementById("content");
    const friends = document.getElementById("new_friend_add");
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("new_friend");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Get the modal
    var modal2 = document.getElementById("file");

    // Get the button that opens the modal
    var btn2 = document.getElementById("add_file");

    // Get the <span> element that closes the modal
    var span2 = document.getElementsByClassName("close")[1];

    // When the user clicks the button, open the modal 
    btn2.onclick = function () {
        modal2.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span2.onclick = function () {
        modal2.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
    }

    friends.addEventListener('click', (e) => {
        if (document.getElementById("friend_email").value == "") {
            var list = document.querySelectorAll(".check");
            console.log(list)
            if (list != undefined) {
                var fg = []
                list.forEach(item => {
                    fg.push(item.id)
                });
                var fg = fg.join(",")
                var customid = String(btoa(fg) + btoa(fg.replace(/\s/g, '').length) + btoa(myEmail))
                var before_friend = fg + "," + myEmail
                var after_friend = before_friend.split(" ")
                var endfriend = []
                after_friend.forEach(item => {
                    if (item.search("@" != -1)) {
                        endfriend.push(item)
                    }
                });
                var data = {
                    allow: endfriend,
                    dname: customid
                }
                document.getElementById("firend_list_preview").innerHTML = ""
                /*
                set(ref(database, 'messages/' + customid + "/"), data);
                set(ref(database, 'users_friend/' + customid), data);
                console.log(document.getElementById('friend_email').value)
                document.getElementById('friend_email').value = "";
                modal.style.display = "none";
                */
            } else { }
        } else {
            var fg = document.getElementById('friend_email').value
            console.log(fg)
            var gh = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
            if (document.getElementById('friend_email').value != "" && document.getElementById('friend_email').value != " " && fg.replace(/\s/g, '').length != 0) {
                var customid = String(btoa(fg) + btoa(fg.replace(/\s/g, '').length) + btoa(myEmail))
                var before_friend = fg + "," + myEmail
                var after_friend = before_friend.split(",")
                var endfriend = []
                after_friend.forEach(item => {
                    if (item.search("@" != -1)) {
                        endfriend.push(item)
                    }
                });
                var data = {
                    allow: endfriend,
                    dname: customid
                }
                set(ref(database, 'messages/' + customid + "/"), data);
                set(ref(database, 'users_friend/' + customid), data);
                document.getElementById('friend_email').value = "";
                modal.style.display = "none";
            } else { }
        }
    });

    var add_file = document.getElementById("add_image")
    add_file.addEventListener('click', (e) => {
        image_render(myEmail, myName)
    });

    const form = document.getElementById('add_image');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    send.addEventListener('click', (e) => {
        var fg = document.getElementById('content').value
        var gh = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        if (document.getElementById('content').value != "" && fg.replace(/\s/g, '').length != 0) {
            var str = document.getElementById('content').value;
            document.getElementById('content').value = "";
            var str1 = str.replaceAll("<", "&lt;")
            var str2 = str1.replaceAll(">", "&gt;")
            var message = str2;
            var name = myName;
            const id = push(child(ref(database), 'messages')).key;
            var friend = "none"
            var cusid = document.getElementsByClassName('chat active-chat')[0].dataset.chat
            image_render(myEmail, myName)
            set(ref(database, 'preload/' + cusid + '/Message'), {
                email: myEmail,
                allow: friend,
                type: "message",
                message: message_render(message, "nop"),
                name: myName,
                date: Date.now(),
                dname: cusid
            });
            set(ref(database, 'messages/' + cusid + '/' + id), {
                email: myEmail,
                allow: friend,
                type: "message",
                message: message_render(message, "nop"),
                name: myName,
                date: Date.now(),
                dname: cusid
            });
        } else { }
    });
    send2.addEventListener("keydown", (event) => {
        if (event.keyCode == 13) {
            var fg = document.getElementById('content').value
            var gh = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
            if (document.getElementById('content').value != "" && fg.replace(/\s/g, '').length != 0) {
                var str = document.getElementById('content').value;
                document.getElementById('content').value = "";
                var str1 = str.replaceAll("<", "&lt;")
                var str2 = str1.replaceAll(">", "&gt;")
                var message = str2;
                var name = myName;
                const id = push(child(ref(database), 'messages')).key;
                var friend = "none"
                var cusid = document.getElementsByClassName('chat active-chat')[0].dataset.chat
                image_render(myEmail, myName)
                set(ref(database, 'preload/' + cusid + '/Message'), {
                    email: myEmail,
                    allow: friend,
                    type: "message",
                    message: message_render(message, "nop"),
                    name: myName,
                    date: Date.now(),
                    dname: cusid
                });
                set(ref(database, 'messages/' + cusid + '/' + id), {
                    email: myEmail,
                    allow: friend,
                    type: "message",
                    message: message_render(message, "nop"),
                    name: myName,
                    date: Date.now(),
                    dname: cusid
                });
            } else { }
        } else { }
    });

    async function newMessage(data2) {
        const dnamef = data2.val().dname
        var class_added = `tooltip`
        var tooltip = `
            <span class="tooltiptext">Send at ${new Date(data2.val().date).toDateString()}</span>
        `
        const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
        if (data2.val().name != null) {
            if (data2.val().message != null) {
                if (data2.val().type == "message") {
                    if (data2.val().name != null) {
                        if (data2.val().email == myEmail) {
                            var html = `<div class="bubble me ${class_added}">${message_render(data2.val().message)} ${tooltip}</div>`
                            var DateNow = data2.val().date
                            var date = message_date(DateNow, dnamef)
                            d1.innerHTML = d1.innerHTML + html
                        } else {
                            var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div>${message_render(data2.val().message)}</div>${tooltip}</div>`
                            var DateNow = data2.val().date
                            var date = message_date(DateNow, dnamef)
                            d1.innerHTML = d1.innerHTML + html
                        }
                        var elem = d1
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    } else { }
                } else if (data2.val().type == "image") {
                    if (data2.val().email == myEmail) {
                        var html = `<div class="bubble me ${class_added}"><img class="type-img" src="${data2.val().message}"></img>${tooltip}</div>`
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        d1.innerHTML = d1.innerHTML + html
                    } else {
                        var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div><img class="type-img" src="${data2.val().message}"></img></div>${tooltip}</div>`
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        d1.innerHTML = d1.innerHTML + html
                    }
                    var elem = d1
                    elem.scrollTop = elem.scrollHeight;
                    elem.scrollTop = elem.scrollHeight;
                } else if (data2.val().type == "new-image") {
                    if (data2.val().email == myEmail) {
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        var html = `<div class="bubble me ${class_added}"><img onclick="big(this.src)" class="type-img img-load-${dnamef}" data-state="unload" data-date="${DateNow}" data-src="${data2.val().message}"></img>${tooltip}</div>`
                        d1.innerHTML = d1.innerHTML + html
                    } else {
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div><img onclick="big(this.src)" class="type-img img-load-${dnamef}" data-date="${DateNow}" data-state="unload" data-src="${data2.val().message}"></img></div>${tooltip}</div>`
                        d1.innerHTML = d1.innerHTML + html
                    }
                    var elem = d1
                    elem.scrollTop = elem.scrollHeight;
                    elem.scrollTop = elem.scrollHeight;
                } else if (data2.val().type == "new-encrypted") {
                    if (data2.val().email == myEmail) {
                        var message = decrypt(data2.val().message)
                        var html = `<div class="bubble me ${class_added}" id="${data2.val().date}">${message_render(message)}${tooltip}</div>`
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        d1.innerHTML = d1.innerHTML + html
                    } else {
                        var message = decrypt(data2.val().message)
                        var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div>${message_render(message)}</div>${tooltip}</div>`
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        d1.innerHTML = d1.innerHTML + html
                    }
                    var elem = d1
                    elem.scrollTop = elem.scrollHeight;
                    elem.scrollTop = elem.scrollHeight;
                } else if (data2.val().type == null) {
                    if (data2.val().name != null) {
                        if (data2.val().name == myName) {
                            var html = `<div class="bubble me">${message_render(data2.val().message)}</div>`
                            var DateNow = data2.val().date
                            var date = message_date(DateNow, dnamef)
                            d1.innerHTML = d1.innerHTML + html
                        } else {
                            var html = `<div class="bubble you"><div class="bubble-name">${data2.val().name}</div><div>${message_render(data2.val().message)}</div></div>`
                            var DateNow = data2.val().date
                            var date = message_date(DateNow, dnamef)
                            d1.innerHTML = d1.innerHTML + html
                        }
                        var elem = d1
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    } else { }
                } else if (data2.val().type == "messages") {

                } else if (data2.val().type == "message") {
                } else if (data2.val().type == "encrypted") {
                } else {
                    OnNewMessage.OnMessage(data2.val())
                }
                bip()
            }
            else { }
        };

    }
    window.processingMessage = []
    document.getElementById("people").addEventListener("click", (e) => {
        const el = e.target.closest("li");
        console.log(el)
        if (el.dataset.enable != "true") {
            console.log(el.id);
            console.log("Called")
            onChildAdded(ref(database, `messages/${el.dataset.chatid}`), (data2) => {
                // To do make a list of message to load
                window.processingMessage.push(data2)
            })
            el.dataset.enable = true
            //setTimeout(MessageWorker, 1000);
        }
    });
    function MessageWorkerLoop(snapshot, snapshotRev) {
        for (let i = 0; i < (snapshot.length); i++) {
            var data2 = snapshot[i]
            newMessage(data2)
            snapshotRev.pop()
        }
        return snapshotRev
    }
    function MessageWorkerEnd(snapshotRev) {
        if (window.processingMessage != snapshotRev.reverse()) {
            var g = window.processingMessage.reverse()
            for (let i = 0; i < (g.length); i++) {
                g.pop()
            }
            window.processingMessage
        } else {
            window.processingMessage = []
        }
    }
    async function MessageWorker() {
        var snapshot = window.processingMessage.reverse()
        var snapshotRev = snapshot.reverse()
        MessageWorkerLoop(snapshot, snapshotRev)
        MessageWorkerEnd(snapshot, snapshotRev)
    }
    window.MessageWorker = MessageWorker
    window.newMessage = newMessage
    MessageWorker()
    const friend_invite = ref(database, 'users_friend/');
    onChildAdded(friend_invite, (data) => {
        var dte = data.val().allow
        if (dte.indexOf(myEmail) != -1 && dte != `,${myEmail}`) {
            var n_allow = data.val().allow
            try {
                var new_allow = n_allow.join(",")
                var nwe_allow = new_allow.replace(myEmail, "")
                var nw_allow = nwe_allow.replaceAll(",", " ")
            } catch {
                var nw_allow = n_allow
            }
            var html = `
        <li onclick="room('${data.val().dname}')" class="people-person" data-name="${data.val().allow}" data-chatid="${data.val().dname}" id="d${data.val().dname}">
        <img src="img/default.png" class="people-img"alt="picture" />
        <p id="name_${data.val().allow}" class="people-name">${nw_allow}</p>
        <p id="time_${data.val().dname}" data-send="${data.val().dname}" class="people-time"></p>
        <p id="prew_${data.val().dname}" class="people-preview"></p>
        </li>`
            // chat_el_box
            var html_chat = `
        <div class="chat" id="room_${data.val().dname}" data-chat="${data.val().dname}">
        <span></span>
        </div>`
            const d1 = document.getElementById("chat_el_box")
            const d2 = document.getElementById("people")
            d1.innerHTML = d1.innerHTML + html_chat
            d2.innerHTML = d2.innerHTML + html
            const dnamef = data.val().dname
            Storage.prototype.setObj = function (key, obj) {
                return this.setItem(key, JSON.stringify(obj))
            }
            Storage.prototype.getObj = function (key) {
                return JSON.parse(this.getItem(key))
            }
            var newroom = new URLSearchParams(window.location.search);
            if (dnamef == newroom.get("room") && newroom.has("room")) {
                window.room(newroom.get("room"))
                var f = document.getElementById("d" + newroom.get("room"))
                f.click()
                f.addEventListener('scroll', window.listener, false);
            }
            //localStorage.setObj("roomlist",localStorage.getObj("roomlist").push([data.val().dname]))
            onChildChanged(ref(database, 'preload/' + dnamef), (data2) => {
                console.log("Child changed")
                console.log(data2.val().type)
                if (data2.val().type == "call") {
                    console.log("Geting call")
                    window.receive(`?f&type=call&uuid=${data2.val().message}&name=${data2.val().name}&`)
                } else if (data2.val().name != null && data2.val().type == "message") {
                    if (data2.val().email == myEmail) {
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        document.getElementById(`time_${dnamef}`).innerHTML = date
                        document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message)
                    } else {
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        document.getElementById(`time_${dnamef}`).innerHTML = date
                        document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message)
                    }
                    setTimeout(MessageWorker, 100);
                }
            })
            onChildAdded(ref(database, 'preload/' + dnamef), async (data2) => {
                console.log("Child added")
                if (data2.val().name != null && data2.val().type == "message" && data2.val().message != null) {
                    if (data2.val().email == myEmail) {
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        document.getElementById(`time_${dnamef}`).innerHTML = date
                        document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message)
                    } else {
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        document.getElementById(`time_${dnamef}`).innerHTML = date
                        document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message)
                    }
                }
            })

        } else { }
    });

    setTimeout(removeloader(), 100000)
} catch (err) {
    console.log(err.message)
    console.log(err)
}