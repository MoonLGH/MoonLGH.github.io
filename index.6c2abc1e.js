let t=document.getElementById("NavBrand");AOS.init(),setInterval(()=>{"MoonL"===t.textContent?t.textContent="Tsukari":t.textContent="MoonL"},1500),async function(t){let e=await fetch(`https://api.github.com/users/${t}`),o=await e.json(),n=document.getElementById("GHAvatar");n&&(n.src=o.avatar_url),console.log(o.avatar_url)}("MoonLGH"),async function(){let t=await fetch("https://raw.githubusercontent.com/MoonLGH/portfolio-assets/output/data.json"),{projects:e,"fcc-front-end":o}=await t.json(),n=[...e,...o].map(t=>({...t,name:t.repo.split("/")[1],full_name:t.repo,stargazers_count:null,forks_count:null,fork:!1}));for(let t=0;t<n.length;t++){let e=n[t],o=await fetch(`https://api.github.com/repos/${e.full_name}`),a=await o.json();n[t]={...e,stargazers_count:a.stargazers_count,forks_count:a.forks_count,fork:a.fork}}let a=n.sort((t,e)=>e.stargazers_count-t.stargazers_count).map((t,e)=>{let o=[];o=t.tech.find(t=>t.toLowerCase().includes("show"))?(o=(o=t.tech.filter(t=>t.toLowerCase().includes("show"))).map(t=>t.toLowerCase().replace("-show",""))).join(","):t.tech.join(",");let n=`
            <div>
                <a aria-label="Single Project">
                    <div class="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark">
                        <div><img class="rounded-t-xl border-none" src="https://raw.githubusercontent.com/MoonLGH/portfolio-assets/output/${t.path}" /></div>
                        <div class="text-center px-4 py-6">
                            <p class="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2">${t.full_name}</p><span class="text-lg text-ternary-dark dark:text-ternary-light">${o}</span>
                        </div>
                    </div>
                </a>
            </div>
        `;return n}).join(""),r=document.querySelector("#repos");r&&(r.innerHTML=a),n.length>10&&function(){let t=document.createElement("button");t.classList.add(...["btn","btn-primary"]),t.setAttribute("id","ToggleRepo"),t.innerText="Show More",t.setAttribute("onclick","TogRepo()");let e=document.getElementById("PlaceholderRepo");e&&e.appendChild(t)}()}();
//# sourceMappingURL=index.6c2abc1e.js.map
