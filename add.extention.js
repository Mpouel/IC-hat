if (localStorage.getItem("extention") != null) {} else {localStorage.setItem("extention","")}

export function add(name,url) {
    var old = localStorage.getItem("extention")
    localStorage.setItem("extention", old +  "," + name + ";" + url)
    window.location.replace("https://" + window.location.host)
}

export function check() {
    var ext = localStorage.getItem("extention")
    var act = ext.split(",")
    act.forEach((main) => {
        if (main != "") {
            var act2 = main.split(";")
            var act3 = document.querySelectorAll('[data-name="' + act2[0] +'"]')[0]
            act3.setAttribute("class","store-1 store_box store-added")
        } else{}

    });
}