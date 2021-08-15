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
    document.getElementById("repos").style.display = "none"
    console.log(data)
    let i = 0
    for (repo of repojson) {
      let fork = ""
      if (repo.fork) {
        fork = "<span><strong>A Fork Repo</strong></span>"
      }
      let desc = repo.description || "No Description."
      const a = document.createElement("a")
      a.setAttribute("data-aos","slide-right")
      a.innerHTML = `
      <div>
      <h3>${repo.full_name}</h3>
      ${fork}
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
      document.getElementById("repos").appendChild(a)
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
      morebtn.setAttribute("data-aos","fade-left")
      morebtn.setAttribute("onclick","togglehide(this)")
      morebtn.setAttribute("toggled","no")
      document.getElementById("github").appendChild(morebtn)  
    }
    document.getElementById("repos").style.display = "flex"
    // document.getElementById("projects").classList.add("slide-right")
    getUserCard(name)
  }
  async function getUserCard(name){
  let repothings = await getRepoThings(name)
  let usersThing = await getUserThings(name)

    const card = document.createElement("div")
    card.classList.add("card")
    card.style.display = "flex"
    card.style.justifyContent = "center"
    card.style.alignItems = "center"
    card.style.border = "none"
    card.innerHTML = `
    <div class="card-body" style="width: auto;border: 1px solid;height: auto; margin:auto">
    <div class="container">
        <div class="row">
            <div class="col-md-3" style="width: auto;"><img src="${usersThing.avatar}" style="width: 5rem;height: auto;border-radius: 10px;border: 1px solid;"></div>
            <div class="col-md-9">
                <div class="row">
                    <div class="col">
                        <a href="${usersThing.gh_url}" style="color: black;font-size: 25px;text-decoration: none;">${usersThing.nick}</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>Joined at : ${usersThing.created_at}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p><strong>Bio</strong><br />${usersThing.bio}<br><br><strong>Location</strong> : ${usersThing.location}</p>
            </div>
        </div>
    </div>
    <br>
    <div class="col">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-3">
                    <p><strong>Followers</strong><br>${usersThing.followers}</p>
                </div>
                <div class="col-md-3">
                    <p><strong>Following</strong><br>${usersThing.following}</p>
                </div>
                <div class="col-md-3">
                    <p><strong>Total Repos</strong><br>${usersThing.repos_total}</p>
                </div>
                <div class="col-md-3">
                    <p><strong>Total Forked</strong><br>${repothings.total_fork}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-md-4">
                        <h3>Top Langs</h3>
                    </div>
                </div>
                <div class="row text-center">
                  ${repothings.langs}
                </div>
            </div>
        </div>
    </div>
</div>
`
document.getElementById("github-card-info").appendChild(card)
  }

  async function getRepoThings(name){
    const repos = await fetch(`https://api.github.com/users/${name}/repos`)
    let returnedObj = {}
    const repojson = await repos.json()
    let langs = []
    let totfork = 0
    for (repo of repojson) {
      if(repo.language) {
        langs.push(repo.language)
      }
      if(repo.forks_count > 0){
        totfork += repo.forks_count
      }
    }
    var count = {};
    langs.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    langs = []
    for(var key in count){
      langs.push({key: key, value: count[key]})
    }
    let langshtml = ``
    langs.sort((a,b) => b.value - a.value).splice(3)
    for (let i = 0; i < langs.length; i++) {
      const e = langs[i];
      if(!e) return
      langshtml += `<div class="col-md-4" style="border: 1px solid;">
      <p style="margin:auto">${e.key}<br>${e.value} Projects</p></div>`
    }
    returnedObj["langs"] = langshtml
    returnedObj["total_fork"] = totfork
    return returnedObj  
  }
  async function getUserThings(name){
    const res = await fetch(`https://api.github.com/users/${name}`)
    const data = await res.json()
    let userobj = {}
    if("created_at" in data){
      userobj["created_at"] = new Date(data.created_at).toLocaleDateString()
    }
    if("name" in data){
      userobj["nick"] = data.name
    }
    if("bio" in data){
      userobj["bio"] = data.bio
    }
    if("followers" in data){
      userobj["followers"] = data.followers
    }
    if("following" in data){
      userobj["following"] = data.following
    }
    if("location" in data){
      userobj["location"] = data.location
    }
    if("twitter_username" in data){
      userobj["twitter"] = data.twitter_username
    }
    if("html_url" in data){
      userobj["gh_url"] = data.html_url
    }
    if("avatar_url" in data){
      userobj["avatar"] = data.avatar_url
    }
    if("public_repos" in data){
      userobj["repos_total"] = data.public_repos
    }
    return userobj
  }
  get("MoonLGH")
  
  
    function togglehide(btn){
      if(btn.getAttribute("toggled") === "no"){
        console.log("no")
        btn.setAttribute("toggled","yes")
        document.querySelector("#repos").querySelectorAll(".proj-more").forEach(e=>{
          e.style.display = ""
        })
        btn.innerText = "See Less"
      }else{
        console.log("yes")
        document.querySelector("#repos").querySelectorAll(".proj-more").forEach(e=>{
          e.style.display = "none"
        })
        btn.innerText = "See More"
        btn.setAttribute("toggled","no")
      }

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