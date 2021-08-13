async function get(name) {
    //image url
    const res = await fetch(`https://api.github.com/users/${name}`)
    const data = await res.json()
    document.getElementById("avatarimg").src = data.avatar_url
    document.getElementById("avatarimg").classList.add("fade-in")
    // document.getElementById("avatarimg").style.border = "solid 2px"
    console.log(data.avatar_url)
  
    //get repos
    const repos = await fetch(`https://api.github.com/users/${name}/repos`)
    const repojson = await repos.json()
    document.getElementById("projects").style.display = "none"
    let i = 0
    for (repo of repojson) {
      let fork = ""
      if (repo.fork) {
        fork = "A Fork Repo"
      }
      let desc = repo.description || "No Description."
      const a = document.createElement("a")
      a.setAttribute("data-aos","slide-right")
      a.innerHTML = `
      <div>
      <h3>${repo.full_name}</h3>
      <span>
      <strong>${fork}</strong>
      </span>
      </div>
      <br>
      <p>${desc}</p>
      <span class="github-card__meta">
        <i class="fa fa-star" aria-hidden="true"></i>
        <span data-stars>
          ${repo.stargazers_count}
        </span>
      </span>
      <span class="github-card__meta">
        <i class="fa fa-code-fork" aria-hidden="true"></i>
        <span data-forks>
          ${repo.forks}
        </span>
      </span>
      `
  
      if(i >= 10){
        a.style.display = "none"
        a.classList.add("proj-more")
      }
      a.href = repo.html_url
      a.classList.add("github-card")
      document.getElementById("projects").appendChild(a)
      i++
    }
    if(i >= 10){
      let morebtn = document.createElement("button")
      morebtn.innerText = "See More"
      morebtn.style.borderRadius = "1rem"
      morebtn.style.display = "flex"
      morebtn.style.marginLeft = "auto"
      morebtn.style.marginRight = "auto"
      morebtn.classList.add("btn")
      morebtn.classList.add("btn-primary")
      morebtn.classList.add("text-center")
      morebtn.classList.add("slide-left")
      morebtn.setAttribute("data-aos","fade-left")
      morebtn.setAttribute("onclick","togglehide(this)")
      document.getElementById("github").appendChild(morebtn)
    }
    document.getElementById("projects").style.display = "flex"
    // document.getElementById("projects").classList.add("slide-right")
  }
  
  get("MoonLGH")
  
  
    function togglehide(btn){
        console.log(btn)
    }
  function skills(skill) {
    let ind= 0
    skill.forEach(s => {
      document.getElementById("skills").innerHTML += `
    <style>
    [data-aos="skill-scroll${ind}"] {
      width: 0% !important;
      transition-property: width;
    }
  
    [data-aos="skill-scroll${ind}"].aos-animate {
      width: ${s.percentage} !important;
    } 
    </style>
    
    <p>${s.name}</p>
    <div class="skills-container">
      <div class="skills skillsAnimation"style="width:${s.percentage};background-color: #37434d;text-align: right;" data-aos="skill-scroll${ind}"><span>${s.percentage}</span></div>
    </div>
    `
    ind++
    })
  }
  let skillslist = [{
    "name": "HTML",
    "percentage": "70%"
  }, {
    "name": "CSS",
    "percentage": "30%"
  }, {
    "name": "JavaScript",
    "percentage": "85%"
  }, {
    "name": "TypeScript",
    "percentage": "80%"
  }, {
    "name": "Python",
    "percentage": "50%"
  }]
  skills(skillslist)
  
  function technologies(tech) {
    tech.forEach(t => {
      document.getElementById("technologies").innerHTML = `
      ${document.getElementById("technologies").innerHTML}
      <span class="technology" data-aos="fade-left" data-aos-duration="1000" >
        <img src="${t.icon || ""}">
        <a>${t.name}</a>
      </span>
      `
    })
  }
  
  let techlist = [{
    "name": "VSCode",
    "icon": "./assets/img/tech/VSCode.png"
  }, {
    "name": "Git",
    "icon": "./assets/img/tech/Git.png"
  }, {
    "name": "Node.js",
    "icon": "./assets/img/tech/NodeJS.png"
  },{
    "name": "GitHub",
    "icon": "./assets/img/tech/GitHub.png"
  }, {
    "name": "ElectronJS",
    "icon": "./assets/img/tech/ElectronJS.png"
  }, {
    "name": "Python3",
    "icon": "./assets/img/tech/Python3.png"
  }, {
    "name": "MongoDB",
    "icon": "./assets/img/tech/MongoDB.svg"
  }, {
    "name": "Github Copilot",
    "icon": "./assets/img/tech/GithubCopilot.png"
  }, {
    "name": "BootStrap",
    "icon": "./assets/img/tech/Bootstrap.png"
  }]
  technologies(techlist)