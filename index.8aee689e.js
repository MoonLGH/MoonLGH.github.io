let Brand=document.getElementById("NavBrand");async function get(e){const t=await fetch(`https://api.github.com/users/${e}`),o=await t.json(),n=document.getElementById("GHAvatar");n&&(n.src=o.avatar_url),console.log(o.avatar_url)}AOS.init(),setInterval((()=>{"MoonL"===Brand.textContent?Brand.textContent="Tsukari":Brand.textContent="MoonL"}),1500),get("MoonLGH");let selectedRepo=["TcukawiWa","Tsukari-Bot","nHentParser","BeatmapDownloader","MoonLGH.github.io","nekoWrap","RPLSaci.github.io"],more=[{name:"RPLSaci/RPLSaci.github.io",additional:"This website is my extraculicular website, which being used as the school official extraculicular website"}];async function getRepos(){const e=await fetch("https://api.github.com/users/MoonLGH/repos?per_page=200");let t=await e.json();const o=await fetch("https://api.github.com/users/MoonLGH/repos?page=2&per_page=200");let n=await o.json();for(let e=0;e<more.length;e++){const o=more[e];let n=await fetch(`https://api.github.com/repos/${o.name}`);t.push(await n.json())}t=[...t,...n],console.log(t);let a=0;t=t.sort(((e,t)=>t.stargazers_count-e.stargazers_count)),selectedRepo.length>1&&(t=t.filter((e=>selectedRepo.includes(e.name)))),console.log(t);for(let e of t){a++;let o=e.description?parseDesc(e.description):"No Description Specified",n=`\n        <div class="card w-64 ${a>10?"hidden":""} mt-9 overflow-visible shadow-xl dark:bg-gray-800 place-self-center h-52 ${e.fork?"indicator":""}">\n            ${e.fork?'<span class="indicator-item badge badge-primary">Forked</span>':""}\n            <div class="card-body flex-none my-auto">\n                <h2 class="card-title mx-auto dark:text-white">${parseDesc(e.name)}</h2>\n                <p>${o}</p>\n            </div>\n            <div class="card-actions pb-5 text-center mx-auto">\n                <button class="btn btn-primary justify-end tooltip" data-tip="Star:${e.stargazers_count}&#xa;Forks:${e.forks_count}&#xa;${more.find((t=>t.name===e.full_name))?`Infomation: ${more.find((t=>t.name===e.full_name)).additional}`:""}">Information</button>\n                <a class="btn btn-primary justify-end" href="https://github.com/${e.full_name}">Open</a>\n            </div>\n        </div>\n    `;const i=document.querySelector("#repos");i&&(i.innerHTML+=n),t.length>=10&&MakeToggleButton()}}function parseDesc(e){return e.length>=20?e.substr(0,20)+"...":e}function MakeToggleButton(){let e=document.createElement("button");e.classList.add("btn","btn-primary"),e.setAttribute("id","ToggleRepo"),e.innerText="Show More",e.setAttribute("onclick","TogRepo()");const t=document.getElementById("PlaceholderRepo");t&&t.appendChild(e)}function TogRepo(){let e=document.querySelector("#ToggleRepo");"SHOW MORE"===e.innerText?document.querySelectorAll("#repos > div.hidden").forEach((t=>{t.classList.remove("hidden"),t.classList.add("hiddenToggled"),e.innerText="Show Less"})):document.querySelectorAll("#repos > div.hiddenToggled").forEach((t=>{t.classList.add("hidden"),t.classList.remove("hiddenToggled"),e.innerText="Show More"}))}getRepos();
//# sourceMappingURL=index.8aee689e.js.map