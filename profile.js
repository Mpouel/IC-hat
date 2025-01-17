import { getuser, changepic, removeloader, loadScript,b64toBlob} from ".././bhuy3huygyufwyuge.js"
var myData = await getuser()
if (myData != null) {
    var myData = JSON.parse(myData)
    var myEmail = myData.email
    var myName = myData.name
    var myImage = myData.image
    var myImage = myImage.replaceAll('"', "")
    var myImage = myImage.replaceAll("'", "")
    document.getElementById('user_pic').src = myImage
    const contentType = 'image/png';
    const b64Data = myImage.replace("data:image/png;base64,","")

    const blob = b64toBlob(b64Data, contentType);
    const blobUrl = URL.createObjectURL(blob);

    document.getElementById("image").src = blobUrl
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
            const contentType = 'image/png';
            const b64Data = btoa(reader.result)

            const blob = b64toBlob(b64Data, contentType);
            const blobUrl = URL.createObjectURL(blob);

            document.getElementById("image").src = blobUrl
            document.getElementById("user_pic_ready").innerHTML = "Select this picture"
            document.getElementById("user_pic_ready").addEventListener("click",() => {
                changepic(img, myEmail)
            })
        }
        reader.readAsBinaryString(input.files[0]);
    };
    input.click();
});
removeloader

document.body.onload = main;

function main() {
    body = document.getElementsByTagName("body")[0]
    body.innerHTML = body.innerHTML + html
    if (localStorage.getItem("Theme") == "dark") {
    setTheme("dark");
    document.getElementById("slider").checked = false;
  } else {
    setTheme("light");
    document.getElementById("slider").checked = true;
  }
}

function setTheme(themeName) {
  localStorage.setItem("Theme", themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem("Theme") == "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}
