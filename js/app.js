// loading api
function loadCategory() {
    const url = `https://openapi.programming-hero.com/api/news/categories`;


    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}

// display category

const displayCategory = categories => {
    try {
        const newsCategory = document.getElementById('news-category');
        categories.forEach(category => {
            // console.log(category);
            const divNewsCategory = document.createElement('div');
            divNewsCategory.classList.add('d-sm-inline');
            divNewsCategory.classList.add('container');
            divNewsCategory.classList.add('ms-5');
            divNewsCategory.innerHTML = `
        <button class="border border-0" onclick="loadCategoryNews('${category.category_id}')">${category.category_name}</button>
    `;
            newsCategory.appendChild(divNewsCategory);
        })
    }
    catch (error) {
        console.log(error);
        alert("error detected");
    }
}

// loading category news

const loadCategoryNews = id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    // console.log(url);

    toggleSpinner(true);
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data))
        .catch(error => console.log(error))
}

// display category news

const displayCategoryNews = datas => {
    const h2element = document.getElementById('category-length');
    const length = datas.length;
    if (length === 0) {
        h2element.innerText = 'No data found';
    }
    else {
        h2element.innerText = length + ' results founds in this category';
    }
    try {
        const newsContainer = document.getElementById('news-container');
        newsContainer.textContent = '';
        datas.forEach(data => {
            console.log(data);
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('col');
            newsDiv.innerHTML = `
          <div class="card h-100">
          <img src="${data.thumbnail_url}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text text-truncate">${data.details}</p>
          <div class="d-flex">
          <img class="rounded-circle"  src="${data.author.img}" style="width: 40px; hight: 40px">    
          <h5 class="card-title ms-2">Author Name: ${data.author.name === null || data.author.name === '' ? 'no name found' : data.author.name}</h5>
        </div>
        
          <p class="card-text text-truncate mt-3">Total View: <i class="fa-regular fa-eye"></i> ${data.total_view === null || data.total_view === 0 ? 'No Views found' : data.total_view}</p>

          <p class="card-text text-truncate">Rating: <i class="fa-solid fa-star-half-stroke"></i> <i class="fa-solid fa-star-half-stroke"></i> <i class="fa-solid fa-star-half-stroke"></i> <i class="fa-solid fa-star-half-stroke"></i> <i class="fa-solid fa-star-half-stroke"></i> ${data.rating.number}</p>

          <button onclick = "loadModal('${data._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
         </div>
    `;
            newsContainer.appendChild(newsDiv);
        })
        toggleSpinner(false);
    }
    catch (error) {
        console.log(error);
        alert("error detected");
    }



};

// loading modal
const loadModal = news_id => {
    toggleSpinner(true);
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    // console.log(url);


    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data[0]))
        .catch(error => console.log(error))

}

// display modal
const displayModal = data => {

    console.log(data);
    try {
        const modalTitle = document.getElementById('newsDetailModalLabel');
        modalTitle.innerText = data.title;
        const newsDetails = document.getElementById('news-details');
        newsDetails.innerHTML = `
        <h5>${data.title}</h5>
          <p>${data.details}</p>
          <img src="${data.thumbnail_url}" class="img-fluid" alt="...">
          <div class="d-flex m-3">
          <img class="rounded-circle"  src="${data.author.img}" style="width: 40px; hight: 40px">    
          <h5 class="card-title ms-2">Author Name: ${data.author.name === null || data.author.name === '' ? 'no name found' : data.author.name}</h5>
        </div>
        <p class="card-text mt-3">Total View: <i class="fa-regular fa-eye"></i> ${data.total_view === null || data.total_view === 0 ? 'No Views found' : data.total_view}</p>
          <p class="card-text text-truncate">Rating: <i class="fa-solid fa-star-half-stroke"></i> <i class="fa-solid fa-star-half-stroke"></i> <i class="fa-solid fa-star-half-stroke"></i> <i class="fa-solid fa-star-half-stroke"></i> <i class="fa-solid fa-star-half-stroke"></i> ${data.rating.number}</p>

          <p class="card-text ms-2">Punlish Date: ${data.author.published_date}</p>

    `;
        toggleSpinner(false);
    }
    catch (error) {
        console.log(error);
        alert("error detected");
    }

}

// spinner added
let toggleSpinner = isLoading => {
    let loaderSpinner = document.getElementById('loader-spinner');
    try {
        if (isLoading) {
            loaderSpinner.classList.remove('d-none');
        }
        else {
            loaderSpinner.classList.add('d-none');

        }
    }
    catch (error) {
        console.log(error);
        alert("error detected");
    }
}

loadCategory();