let Brand=document.getElementById("NavBrand");function minimenu(){document.querySelector("#minibar").classList.toggle("hidden")}async function get(t){el.src="https://github.com/MoonLGH/portfolio-assets/blob/output/pfpLinked.jpeg?raw=true"}async function getRepos(){let t=await fetch("https://raw.githubusercontent.com/MoonLGH/portfolio-assets/output/data.json"),{projects:e,"fcc-front-end":n}=await t.json(),o=[...e].map(t=>({...t,name:t.repo.split("/")[1],full_name:t.repo,stargazers_count:null,forks_count:null,fork:!1}));for(let t=0;t<o.length;t++){let e=o[t],n=await fetch(`https://api.github.com/repos/${e.full_name}`),r=await n.json();o[t]={...e,stargazers_count:r.stargazers_count,forks_count:r.forks_count,fork:r.fork}}let r=o.sort((t,e)=>e.stargazers_count-t.stargazers_count).map((t,e)=>{let n=[];n=t.tech.find(t=>t.toLowerCase().includes("show"))?(n=(n=t.tech.filter(t=>t.toLowerCase().includes("show"))).map(t=>t.toLowerCase().replace("-show",""))).join(","):t.tech.join(",");let o="";return t.url&&(o=`<a class="btn btn-primary justify-end normal-case" href="${t.url}">Open</a>`),o+=`<a class="btn btn-primary justify-end normal-case" href="https://github.com/${t.full_name}">Open Repo</a>`,`
            <div>
                    <div class="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark pb-8">
                        <div><img class="rounded-t-xl border-none" src="https://raw.githubusercontent.com/MoonLGH/portfolio-assets/output/${t.path}" /></div>
                        <div class="text-center px-4 py-6">
                            <p class="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2">${t.full_name}</p><span class="text-lg text-ternary-dark dark:text-ternary-light">${n}</span>
                        </div>
                        <div class="card-actions pt-2 text-center mx-auto place-content-center">
                            <button class="btn justify-end tooltip whitespace-pre-wrap w-min"
                                data-tip="${t.description}">Information</button>
                            ${o}
                        </div>
                    </div>
            </div>
        `}).join(""),a=document.querySelector("#repos");a&&(a.innerHTML=r),putFccFrontEnd(n),o.length>10&&MakeToggleButton()}async function putFccFrontEnd(t){t=t.map(t=>({...t,name:t.repo.split("/")[1],full_name:t.repo,stargazers_count:null,forks_count:null,fork:!1}));for(let e=0;e<t.length;e++){let n=t[e],o=await fetch(`https://api.github.com/repos/${n.full_name}`),r=await o.json();t[e]={...n,stargazers_count:r.stargazers_count,forks_count:r.forks_count,fork:r.fork}}let e=t.sort((t,e)=>e.stargazers_count-t.stargazers_count).map((t,e)=>{let n=[];n=t.tech.find(t=>t.toLowerCase().includes("show"))?(n=(n=t.tech.filter(t=>t.toLowerCase().includes("show"))).map(t=>t.toLowerCase().replace("-show",""))).join(","):t.tech.join(",");let o="";return t.url&&(o=`<a class="btn btn-primary justify-end normal-case" href="${t.url}">Open</a>`),o+=`<a class="btn btn-primary justify-end normal-case" href="https://github.com/${t.full_name}">Open Repo</a>`,`
            <div>
                    <div class="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark pb-8">
                        <div><img class="rounded-t-xl border-none" src="https://raw.githubusercontent.com/MoonLGH/portfolio-assets/output/${t.path}" /></div>
                        <div class="text-center px-4 py-6">
                            <p class="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2">${t.full_name}</p><span class="text-lg text-ternary-dark dark:text-ternary-light">${n}</span>
                        </div>
                        <div class="card-actions pt-2 text-center mx-auto place-content-center">
                            <button class="btn justify-end tooltip whitespace-pre-wrap w-min"
                                data-tip="${t.description}">Information</button>
                            ${o}
                        </div>
                    </div>
            </div>
        `}).join(""),n=document.querySelector("#fccRepos");n&&(n.innerHTML=e)}function parseDesc(t){return t.length>=20?t.substr(0,20)+"...":t}function MakeToggleButton(){let t=document.createElement("button");t.classList.add("btn","btn-primary"),t.setAttribute("id","ToggleRepo"),t.innerText="Show More",t.setAttribute("onclick","TogRepo()");let e=document.getElementById("PlaceholderRepo");e&&e.appendChild(t)}function TogRepo(){let t=document.querySelector("#ToggleRepo");"SHOW MORE"===t.innerText?document.querySelectorAll("#repos > div.hidden").forEach(e=>{e.classList.remove("hidden"),e.classList.add("hiddenToggled"),t.innerText="Show Less"}):document.querySelectorAll("#repos > div.hiddenToggled").forEach(e=>{e.classList.add("hidden"),e.classList.remove("hiddenToggled"),t.innerText="Show More"})}AOS.init(),setInterval(()=>{"MoonL"===Brand.textContent?Brand.textContent="Tsukari":Brand.textContent="MoonL"},1500),get("MoonLGH"),getRepos();
//# sourceMappingURL=MoonLGH.github.io.95e91b52.js.map
