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

    
    if(data.avatar_url) {
        el.src = data.avatar_url
    } else {
        el.src = "https://github.com/MoonLGH/portfolio-assets/blob/output/pfpLinked.jpeg?raw=true"
    }
    setInterval(() =>{
        if(el.src === data.avatar_url) {
            el.src = "https://github.com/MoonLGH/portfolio-assets/blob/output/pfpLinked.jpeg?raw=true"
        } else {
            el.src = data.avatar_url
        }
    },10000)
}

get("MoonLGH")

async function getRepos() {
    const res = await fetch(`https://raw.githubusercontent.com/MoonLGH/portfolio-assets/output/data.json`);
    const { projects, "fcc-front-end": fccFrontEnd } = await res.json();
    const repos = [...projects].map((repo) => {
      return {
        ...repo,
        name: repo.repo.split("/")[1],
        full_name: repo.repo,
        stargazers_count: null,
        forks_count: null,
        fork: false,
      };
    });
  
    for (let i = 0; i < repos.length; i++) {
      const repo = repos[i];
      const result = await fetch(`https://api.github.com/repos/${repo.full_name}`);
      const data = await result.json();
      repos[i] = {
        ...repo,
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count,
        fork: data.fork,
      };
    }
  
    const reposHtml = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map((repo, index) => {
        // const repoDescription = repo.description ? parseDesc(repo.description) : "No Description Specified";
        // const text = `
        //   <div class="card w-64 ${index > 9 ? "hidden" : ""} mt-9 overflow-visible shadow-xl dark:bg-gray-800 place-self-center h-52 ${repo.fork ? "indicator" : ""}">
        //     ${repo.fork ? '<span class="indicator-item badge badge-primary">Forked</span>' : ""}
        //     <div class="card-body flex-none my-auto">
        //       <h2 class="card-title mx-auto dark:text-white">${parseDesc(repo.name)}</h2>
        //       <p>${repoDescription}</p>
        //     </div>
        //     <div class="card-actions pb-5 text-center mx-auto">
        //       <button class="btn btn-primary justify-end tooltip" data-tip="Star:${repo.stargazers_count}&#xa;Forks:${repo.forks_count}">Information</button>
        //       <a class="btn btn-primary justify-end" href="https://github.com/${repo.full_name}">Open</a>
        //     </div>
        //   </div>
        // `;
        let tech = []
        if(repo.tech.find((arr) => arr.toLowerCase().includes("show"))){
            tech = repo.tech.filter((arr) => arr.toLowerCase().includes("show"))
            tech = tech.map((arr) => arr.toLowerCase().replace("-show",""))
            tech = tech.join(",")
        } else {
            tech = repo.tech.join(",")
        }

        let optional = ``

        if (repo.url) {
            optional = `<a class="btn btn-primary justify-end normal-case" href="${repo.url}">Open</a>`
        }

            optional += `<a class="btn btn-primary justify-end normal-case" href="https://github.com/${repo.full_name}">Open Repo</a>`
        const text = `
            <div>
                    <div class="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark pb-8">
                        <div><img class="rounded-t-xl border-none" src="https://raw.githubusercontent.com/MoonLGH/portfolio-assets/output/${repo.path}" /></div>
                        <div class="text-center px-4 py-6">
                            <p class="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2">${repo.full_name}</p><span class="text-lg text-ternary-dark dark:text-ternary-light">${tech}</span>
                        </div>
                        <div class="card-actions pt-2 text-center mx-auto place-content-center">
                            <button class="btn justify-end tooltip whitespace-pre-wrap w-min"
                                data-tip="${repo.description}">Information</button>
                            ${optional}
                        </div>
                    </div>
            </div>
        `;

        return text;
      })
      .join("");
  
    const el = document.querySelector("#repos");
    if (el) {
      el.innerHTML = reposHtml;
    }
  
    putFccFrontEnd(fccFrontEnd)
    if (repos.length > 10) {
      MakeToggleButton();
    }
  }
  

async function putFccFrontEnd(frontend) {
    frontend = frontend.map((repo) => {
        return {
            ...repo,
            name: repo.repo.split("/")[1],
            full_name: repo.repo,
            stargazers_count: null,
            forks_count: null,
            fork: false,
        };
    }
    );

    for (let i = 0; i < frontend.length; i++) { 
        const repo = frontend[i];
        const result = await fetch(`https://api.github.com/repos/${repo.full_name}`);
        const data = await result.json();
        frontend[i] = {
            ...repo,
            stargazers_count: data.stargazers_count,
            forks_count: data.forks_count,
            fork: data.fork,
        };
    }
    
    const reposHtml = frontend
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map((repo, index) => {
        // const repoDescription = repo.description ? parseDesc(repo.description) : "No Description Specified";
        // const text = `
        //   <div class="card w-64 ${index > 9 ? "hidden" : ""} mt-9 overflow-visible shadow-xl dark:bg-gray-800 place-self-center h-52 ${repo.fork ? "indicator" : ""}">
        //     ${repo.fork ? '<span class="indicator-item badge badge-primary">Forked</span>' : ""}
        //     <div class="card-body flex-none my-auto">
        //       <h2 class="card-title mx-auto dark:text-white">${parseDesc(repo.name)}</h2>
        //       <p>${repoDescription}</p>
        //     </div>
        //     <div class="card-actions pb-5 text-center mx-auto">
        //       <button class="btn btn-primary justify-end tooltip" data-tip="Star:${repo.stargazers_count}&#xa;Forks:${repo.forks_count}">Information</button>
        //       <a class="btn btn-primary justify-end" href="https://github.com/${repo.full_name}">Open</a>
        //     </div>
        //   </div>
        // `;
        let tech = []
        if(repo.tech.find((arr) => arr.toLowerCase().includes("show"))){
            tech = repo.tech.filter((arr) => arr.toLowerCase().includes("show"))
            tech = tech.map((arr) => arr.toLowerCase().replace("-show",""))
            tech = tech.join(",")
        } else {
            tech = repo.tech.join(",")
        }

        let optional = ``

        if (repo.url) {
            optional = `<a class="btn btn-primary justify-end normal-case" href="${repo.url}">Open</a>`
        }

            optional += `<a class="btn btn-primary justify-end normal-case" href="https://github.com/${repo.full_name}">Open Repo</a>`
        const text = `
            <div>
                    <div class="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark pb-8">
                        <div><img class="rounded-t-xl border-none" src="https://raw.githubusercontent.com/MoonLGH/portfolio-assets/output/${repo.path}" /></div>
                        <div class="text-center px-4 py-6">
                            <p class="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2">${repo.full_name}</p><span class="text-lg text-ternary-dark dark:text-ternary-light">${tech}</span>
                        </div>
                        <div class="card-actions pt-2 text-center mx-auto place-content-center">
                            <button class="btn justify-end tooltip whitespace-pre-wrap w-min"
                                data-tip="${repo.description}">Information</button>
                            ${optional}
                        </div>
                    </div>
            </div>
        `;

        return text;
      })
      .join("");

    const el = document.querySelector("#fccRepos");
    if (el) {
        el.innerHTML = reposHtml;
        }



}

getRepos();
  

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