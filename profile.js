import { getuser, changepic, removeloader } from ".././bhuy3huygyufwyuge.js"
var myData = await getuser()
if (myData != null) {
    var myData = JSON.parse(myData)
    var myEmail = myData.email
    var myName = myData.name
    var myImage = myData.image
    var myImage = myImage.replaceAll('"', "")
    var myImage = myImage.replaceAll("'", "")
    document.getElementById('user_pic').src = image
    const context = document.getElementById('user_pic_canvas').getContext('2d')
    const img = new Image()
    img.src = myImage
        img.onload = () => { context.drawImage(img, 0, 0,document.getElementById("user_pic_canvas").width,document.getElementById("user_pic").height)
    };
    document.getElementById("user_pic_cnavas").src = myImage
    document.getElementById("not-connected").remove()
    document.getElementById("wait-connected").remove()
} else if (myData == null) {
    document.getElementById("connected").remove()
    document.getElementById("wait-connected").remove()
} else if (myData.search("<title>500 Internal Server Error</title>") != -1) {
    document.getElementById("connected").remove()
    document.getElementById("wait-connected").remove()
} else {
    document.getElementById("connected").remove()
    document.getElementById("wait-connected").remove()
}
var c = document.getElementById("box")
c.addEventListener("click", () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
        var filelist = input.files[0]
        var reader = new FileReader();
        reader.onload = function () {
            var img = "data:image/png;base64-" + btoa(reader.result)
            console.log(img)
            const contexts = document.getElementById('user_pic_canvas').getContext('2d')
            const imgs = new Image()
            imgs.src = myImage
                imgs.onload = () => { contexts.drawImage(imgs, 0, 0,document.getElementById("user_pic_canvas").width,document.getElementById("user_pic").height)
            };
            document.getElementById("user_pic_cnavas").src = img
            changepic(img, myEmail)
        }
        reader.readAsBinaryString(input.files[0]);
    };
    input.click();
});
removeloader