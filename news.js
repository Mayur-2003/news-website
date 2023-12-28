// const API_KEY = "ca05e9f6cdbc451f93e0ecf330f83386";
const API_KEY = "7eee49fc46d448c68f7f906a90ede2d1";
const url  = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("Trending"));


async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){ //jitne news utne hi templates
    const cardContainer = document.querySelector(".card-container");
    const newsCardTemplate = document.querySelector("template");

    cardContainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) {
            return;
        }
            
        const cardClone = newsCardTemplate.content.cloneNode(true); //pura content aana chahiye
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);

    });

}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector(".news-img");
    const newsTitle = cardClone.querySelector(".news-title");
    const newsSource = cardClone.querySelector(".news-source");
    const newsDesc = cardClone.querySelector(".news-description");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name}  .  ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });

}

let selectedNavItem = null;
function onNavItemClick(id){
    fetchNews(id);
    
    const navItem  = document.getElementById(id);

    selectedNavItem?.classList.remove("active");
    selectedNavItem = navItem;
    selectedNavItem.classList.add("active");

}

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click",()=>{
    const query = searchInput.value;
    if(!query){
        return;
    }

    fetchNews(query);
    selectedNavItem?.classList.remove("active");
    selectedNavItem=null;

});

function reload(){
    window.location.reload();
}

//light and dark mode
const lightDarkModeIcon = document.querySelector(".light-dark-mode-img");

lightDarkModeIcon.onclick = function(){
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        lightDarkModeIcon.src = "./images/moon.png";
    }
    else{
        lightDarkModeIcon.src = "./images/sun.png";
    }

};