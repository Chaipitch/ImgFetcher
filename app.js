const auth = '563492ad6f9170000100000133676561b54f48fd806f7c387055bcf6';

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

function updateInput(e){
    searchValue = e.target.value;
}


async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
        });
        const data = await dataFetch.json();
        return data;
    }

function genPic(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
            <img src=${photo.src.large}></img>
            <div class ="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
            </div>
            `;
        gallery.appendChild(galleryImg);
    }); 
}


async function curatedPhotos(){
    fetchLink = 'https://api.pexels.com/v1/curated/?page=1&per_page=15';
    const data = await fetchApi(fetchLink);
    genPic(data);
}

async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page1`;
    const data = await fetchApi(fetchLink);
    genPic(data);
}

function clear(){
    gallery.innerHTML = '';
    searchInput.value = '';
};

async function loadMore(){
    page++;
    if(currentSearch){
       fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    }else{
        fetchLink = `https://api.pexels.com/v1/curated/?page=${page}&per_page=15`;
    }
    const data = await fetchApi(fetchLink);
    genPic(data);
}

curatedPhotos();
