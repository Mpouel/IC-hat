function room(id){
    var actual_size = window.innerWidth
    var max_size = 970
    
    if (id == "geoloup_chat") {
        var new2 = document.getElementById(id + "_c")
    } else {
        var new2 = document.getElementById("room_" + id)
    }
    var old1 = document.getElementsByClassName("write")[0].setAttribute("class","write write-active")
    var old2 = document.getElementsByClassName("chat active-chat")[0]
    var new1 = document.getElementById(id)
    var new1 = document.getElementById(id)
    var to = document.querySelector("#to")
    try {
        old2.setAttribute("class","chat")
    } catch {}
    new2.setAttribute("class","chat active-chat")
    to.innerHTML = new1.dataset.name
    new2.scrollTop = new2.scrollHeight;
    new2.scrollTop = new2.scrollHeight;
}
function mobile() {
    var old1 = document.getElementsByClassName("write write-active")[0].setAttribute("class","write")
}