let Brand = document.getElementById("NavBrand")

setInterval(() => {
    if (Brand.textContent === "MoonL") {
        Brand.textContent = "Tsukari"
    } else {
        Brand.textContent = "MoonL"
    }
}, 1500)

async function get(name) {
    const res = await fetch(`https://api.github.com/users/${name}`)
    const data = await res.json()
    document.getElementById("GHAvatar").src = data.avatar_url
    console.log(data.avatar_url)
}

get("MoonLGH")

async function getRepos() {
    const res = await fetch(`https://api.github.com/users/MoonLGH/repos?per_page=100`)
    let data = await res.json()
    let i = 0
    data = data.sort((a,b) => b.stargazers_count - a.stargazers_count)
    console.log(data)
    for (let repo of data){
        i++
        let repoDescription = repo.description ? parseDesc(repo.description) : "No Description Specified";
        let text = `
        <div class="card w-64 ${i > 10 ? "hidden" : ""} overflow-visible bg-base-100 text-white shadow-xl place-self-center h-52 ${repo.fork ? "indicator" : ""}" style='background-image:${GeoPattern.generate(repo.name).toDataUrl()}'>
            ${repo.fork ? '<span class="indicator-item badge badge-primary">Forked</span>' : ""}
            <div class="card-body flex-none my-auto">
                <h2 class="card-title mx-auto">${parseDesc(repo.name)}</h2>
                <p>${repoDescription}</p>
            </div>
            <div class="card-actions pb-5 text-center mx-auto">
                <button class="btn btn-primary justify-end tooltip" data-tip="Star:${repo.stargazers_count}\nForks:${repo.forks_count}">Information</button>
                <a class="btn btn-primary justify-end" href="https://github.com/${repo.full_name}">Open</a>
            </div>
        </div>
    `
    document.querySelector("#repos").innerHTML += text
    }
    MakeToggleButton()
}
getRepos()

function parseDesc(text){
    if(text.length >= 20) {
        return text.substr(0,20) + "..."
    }
    return text
}

function MakeToggleButton(){
    let button = document.createElement("button")
    button.classList.add(...["btn","btn-primary"])
    button.setAttribute("id","ToggleRepo")
    button.innerText = "Show More"
    button.setAttribute("onclick","TogRepo()")
    document.getElementById("PlaceholderRepo").appendChild(button)
}

function TogRepo() {
    let btn = document.querySelector("#ToggleRepo")
    if(btn.innerText === "SHOW MORE"){
        document.querySelectorAll("#repos > div.hidden").forEach((el)=>{
            el.classList.remove("hidden")
            el.classList.add("hiddenToggled")
            btn.innerText = "Show Less"
        })
    }else {
        document.querySelectorAll("#repos > div.hiddenToggled").forEach((el)=>{
            el.classList.add("hidden")
            el.classList.remove("hiddenToggled")
            btn.innerText = "Show More"
        })
    }
}