var url = window. location.href;
import {load} from "./loader.extention.js"
import {add,check} from "./add.extention.js"

if (url == "https://splendorous-hamster-ecd34b.netlify.app/"|| url == "https://chat.geoloup.com/" || url == "https://ic-hat.geoloup.com/" ) {
    load()
}
else if (url == "https://splendorous-hamster-ecd34b.netlify.app/store" || url == "https://chat.geoloup.com/store" || url == "https://ic-hat.geloup.com/store" ) {
    if (localStorage.getItem("extention") != null) {} else {localStorage.setItem("extention","")}
    const btn_add = document.getElementById("add_extention")
    btn_add.addEventListener('click', (event) => {
        add("crypted message",window.location.href + "/store/crypted.js")
    });
    check()
}
console.info("[extention core] Extention are enable")