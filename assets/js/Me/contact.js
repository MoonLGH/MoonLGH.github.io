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

if(document.getElementById("pfpgithub")){
const name = document.getElementById("pfpgithub").getAttribute("github-name")
getpfp(name)
}

async function getpfp(name){
    const res = await fetch(`https://api.github.com/users/${name}`)
    const data = await res.json()
    document.getElementById("pfpgithub").src = data.avatar_url
    document.getElementById("pfpgithub").classList.add("fade-in")
    // document.getElementById("avatarimg").style.border = "solid 2px"
}