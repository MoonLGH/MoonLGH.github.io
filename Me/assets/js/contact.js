function copyemail(id){
    const email = document.getElementById(id)
    let textarea = document.createElement("TEXTAREA");
    textarea.innerText = email.innerText
    console.log(email.innerText)
    document.getElementById("temp").appendChild(textarea)
    textarea.select();
    document.execCommand("copy");
document.querySelector("#temp").removeChild(document.querySelector("#temp > textarea"))
}