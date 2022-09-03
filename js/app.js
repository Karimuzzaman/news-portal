function loadCategory() {
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}

const displayCategory = categories => {
    const newsCategory = document.getElementById('news-category');
    categories.forEach(category => {
        console.log(category);
        const divNewsCategory = document.createElement('div');
        divNewsCategory.classList.add('d-sm-inline');
        divNewsCategory.classList.add('container');
        divNewsCategory.classList.add('ms-5');
        divNewsCategory.innerHTML = `
        <button class="border border-0" onclick="categoryNews('${category.category_id}')">${category.category_name}</button>
    `;
        newsCategory.appendChild(divNewsCategory);
    })
}

const categoryNews = id => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    console.log(url);

}


loadCategory();