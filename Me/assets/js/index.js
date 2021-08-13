async function getAvatar(nick){
    const res = await fetch(`https://api.github.com/users/${nick}`)
    const data = await res.json()
    if(data.avatar_url){
       image = data.avatar_url      
    }
    document.getElementById("avatarimg").src = image
}

getAvatar("MoonLGH")