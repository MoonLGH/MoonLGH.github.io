let Brand = document.getElementById("NavBrand")
AOS.init();

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
    const el = document.getElementById("GHAvatar")
    if (el) {
        el.src = data.avatar_url
    }
    console.log(data.avatar_url)
}

get("MoonLGH")

let selectedRepo = ["TcukawiWa", "Tsukari-Bot", "nHentParser", "BeatmapDownloader", "MoonLGH.github.io", "nekoWrap", "RPLSaci.github.io"]
let more = [{
    name: "RPLSaci/RPLSaci.github.io",
    additional: "This website is my extraculicular website, which being used as the school official extraculicular website"
}]
async function getRepos() {
    const res = await fetch(`https://api.github.com/users/MoonLGH/repos?per_page=200`)
    let data = await res.json()
    const res2 = await fetch(`https://api.github.com/users/MoonLGH/repos?page=2&per_page=200`)
    let data2 = await res2.json()

    for (let i = 0; i < more.length; i++) {
        const element = more[i];
        let result = await fetch(`https://api.github.com/repos/${element.name}`)
        data.push((await result.json()))
    }
    data = [...data, ...data2]
    console.log(data)
    let i = 0
    data = data.sort((a, b) => b.stargazers_count - a.stargazers_count)
    if (selectedRepo.length > 1) {
        data = data.filter(r => selectedRepo.includes(r.name))
        // hiding the show more
    }
    console.log(data)
    for (let repo of data) {
        i++
        let repoDescription = repo.description ? parseDesc(repo.description) : "No Description Specified";
        let text = `
        <div class="card w-64 ${i > 10 ? "hidden" : ""} mt-9 overflow-visible dark:text-white shadow-xl dark:bg-gray-800 place-self-center h-52 ${repo.fork ? "indicator" : ""}">
            ${repo.fork ? '<span class="indicator-item badge badge-primary">Forked</span>' : ""}
            <div class="card-body flex-none my-auto">
                <h2 class="card-title mx-auto">${parseDesc(repo.name)}</h2>
                <p>${repoDescription}</p>
            </div>
            <div class="card-actions pb-5 text-center mx-auto">
                <button class="btn btn-primary justify-end tooltip" data-tip="Star:${repo.stargazers_count}&#xa;Forks:${repo.forks_count}&#xa;${more.find(a => a.name === repo.full_name) ? `Infomation: ${more.find(a => a.name === repo.full_name).additional}` : ""}">Information</button>
                <a class="btn btn-primary justify-end" href="https://github.com/${repo.full_name}">Open</a>
            </div>
        </div>
    `
        const el = document.querySelector("#repos")
        if (el) {
            el.innerHTML += text
        }
        if (data.length >= 10) {
            MakeToggleButton()
        }
    }
}
getRepos()

function parseDesc(text) {
    if (text.length >= 20) {
        return text.substr(0, 20) + "..."
    }
    return text
}

function MakeToggleButton() {
    let button = document.createElement("button")
    button.classList.add(...["btn", "btn-primary"])
    button.setAttribute("id", "ToggleRepo")
    button.innerText = "Show More"
    button.setAttribute("onclick", "TogRepo()")
    const repo = document.getElementById("PlaceholderRepo")
    if (repo) {
        repo.appendChild(button)
    }
}

function TogRepo() {
    let btn = document.querySelector("#ToggleRepo")
    if (btn.innerText === "SHOW MORE") {
        document.querySelectorAll("#repos > div.hidden").forEach((el) => {
            el.classList.remove("hidden")
            el.classList.add("hiddenToggled")
            btn.innerText = "Show Less"
        })
    } else {
        document.querySelectorAll("#repos > div.hiddenToggled").forEach((el) => {
            el.classList.add("hidden")
            el.classList.remove("hiddenToggled")
            btn.innerText = "Show More"
        })
    }
}

// const scrollPage = new ScrollPage("#content-wrapper",{
//     pages:{
// 	    //for page 1
//         1:{
//             animation:"easeInQuart",
//             time:1000
//         },
//         //for page 2
//         2:{
//             animation:"easeOutQuint",
//             time:500
//         },
//         //for page 3
//         3:{
//             animation:"easeOutCubic",
//             time:700
//         }
//     }
// }); 