var url = window. location.href;
import {load} from "./loader.extention.js"
import {add,chack} from "./add.extention.js"

if (url == "https://splendorous-hamster-ecd34b.netlify.app/") {
    load()
}
else if (url == "https://splendorous-hamster-ecd34b.netlify.app/store") {
    if (localStorage.getItem("extention") != null) {} else {localStorage.setItem("extention","")}
    const btn_add = document.getElementById("add_extention")
    btn_add.addEventListener('click', (event) => {
        add("crypted message","https://splendorous-hamster-ecd34b.netlify.app/store/crypted.js")
    });
    check()
}