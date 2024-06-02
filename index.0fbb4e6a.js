let t=document.getElementById("NavBrand");async function e(t){t=t.map(t=>({...t,name:t.repo.split("/")[1],full_name:t.repo,stargazers_count:null,forks_count:null,fork:!1}));for(let e=0;e<t.length;e++){let r=t[e],a=await fetch(`https://api.github.com/repos/${r.full_name}`),o=await a.json();t[e]={...r,stargazers_count:o.stargazers_count,forks_count:o.forks_count,fork:o.fork}}let e=t.sort((t,e)=>e.stargazers_count-t.stargazers_count).map((t,e)=>{let r=[];r=t.tech.find(t=>t.toLowerCase().includes("show"))?(r=(r=t.tech.filter(t=>t.toLowerCase().includes("show"))).map(t=>t.toLowerCase().replace("-show",""))).join(","):t.tech.join(",");let a="";return t.url&&(a=`<a class="btn btn-primary justify-end normal-case" href="${t.url}">Open</a>`),a+=`<a class="btn btn-primary justify-end normal-case" href="https://github.com/${t.full_name}">Open Repo</a>`,`
            <div>
                    <div class="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark pb-8">
                        <div><img class="rounded-t-xl border-none" src="https://raw.githubusercontent.com/MoonLGH/portfolio-assets/output/${t.path}" /></div>
                        <div class="text-center px-4 py-6">
                            <p class="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2">${t.full_name}</p><span class="text-lg text-ternary-dark dark:text-ternary-light">${r}</span>
                        </div>
                        <div class="card-actions pt-2 text-center mx-auto place-content-center">
                            <button class="btn justify-end tooltip whitespace-pre-wrap w-min"
                                data-tip="${t.description}">Information</button>
                            ${a}
                        </div>
                    </div>
            </div>
        `}).join(""),r=document.querySelector("#fccRepos");r&&(r.innerHTML=e)}AOS.init(),setInterval(()=>{"MoonL"===t.textContent?t.textContent="Tsukari":t.textContent="MoonL"},1500),async function(t){let e=await fetch(`https://api.github.com/users/${t}`),r=await e.json(),a=document.getElementById("GHAvatar");r.avatar_url?a.src=r.avatar_url:a.src="https://github.com/MoonLGH/portfolio-assets/blob/output/pfpLinked.jpeg?raw=true",setInterval(()=>{a.src===r.avatar_url?a.src="https://github.com/MoonLGH/portfolio-assets/blob/output/pfpLinked.jpeg?raw=true":a.src=r.avatar_url},1e4)}("MoonLGH"),async function(){let t=await fetch("https://raw.githubusercontent.com/MoonLGH/portfolio-assets/output/data.json"),{projects:r,"fcc-front-end":a}=await t.json(),o=[...r].map(t=>({...t,name:t.repo.split("/")[1],full_name:t.repo,stargazers_count:null,forks_count:null,fork:!1}));for(let t=0;t<o.length;t++){let e=o[t],r=await fetch(`https://api.github.com/repos/${e.full_name}`),a=await r.json();o[t]={...e,stargazers_count:a.stargazers_count,forks_count:a.forks_count,fork:a.fork}}let n=o.sort((t,e)=>e.stargazers_count-t.stargazers_count).map((t,e)=>{let r=[];r=t.tech.find(t=>t.toLowerCase().includes("show"))?(r=(r=t.tech.filter(t=>t.toLowerCase().includes("show"))).map(t=>t.toLowerCase().replace("-show",""))).join(","):t.tech.join(",");let a="";return t.url&&(a=`<a class="btn btn-primary justify-end normal-case" href="${t.url}">Open</a>`),a+=`<a class="btn btn-primary justify-end normal-case" href="https://github.com/${t.full_name}">Open Repo</a>`,`
            <div>
                    <div class="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark pb-8">
                        <div><img class="rounded-t-xl border-none" src="https://raw.githubusercontent.com/MoonLGH/portfolio-assets/output/${t.path}" /></div>
                        <div class="text-center px-4 py-6">
                            <p class="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2">${t.full_name}</p><span class="text-lg text-ternary-dark dark:text-ternary-light">${r}</span>
                        </div>
                        <div class="card-actions pt-2 text-center mx-auto place-content-center">
                            <button class="btn justify-end tooltip whitespace-pre-wrap w-min"
                                data-tip="${t.description}">Information</button>
                            ${a}
                        </div>
                    </div>
            </div>
        `}).join(""),s=document.querySelector("#repos");s&&(s.innerHTML=n),e(a),o.length>10&&function(){let t=document.createElement("button");t.classList.add("btn","btn-primary"),t.setAttribute("id","ToggleRepo"),t.innerText="Show More",t.setAttribute("onclick","TogRepo()");let e=document.getElementById("PlaceholderRepo");e&&e.appendChild(t)}()}();
//# sourceMappingURL=index.0fbb4e6a.js.map
