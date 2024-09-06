const loadCategory = () => {
    fetch('https://api.allorigins.win/raw?url=https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(json => {
            let html = '';
            json.forEach(element => {
                html += `<li class="list-group-item" id="${element}" onclick='loadProduct(this)'>${element}</li>`
            });
            document.getElementById('categories').innerHTML = html;
        })
        .catch(error => console.error('Error:', error));
}

const loadProduct = (category = null) => {
    let params = '';
    if (category) params = `category/${category.id}`;
    let loader = document.getElementById('loader');
    loader.style.display = "block";
    fetch(`https://api.allorigins.win/raw?url=https://fakestoreapi.com/products/${params}`)
        .then(res => res.json())
        .then(json => {
            let html = '';
            json.forEach(element => {
                html += `
                    <div class="col-md-4 mb-3">
                        <div class="card card-custom">
                            <img src="${element.image}" class="card-img-top card-img-custom" alt="${element.title}">
                            <div class="card-body">
                                <h5 class="card-title">${element.title.split(' ').slice(0, 4).join(' ')}</h5>
                                <p class="card-text">${element.price}</p>
                                <a href="#" class="btn btn-secondary btn-sm">View</a>
                            </div>
                        </div>
                    </div>`
            });
            document.getElementById('products').innerHTML = html;
            document.getElementById('product_category').textContent = category.id;
            setTimeout(() => {
                loader.style.display = "none";
            }, 1000);
        })
        .catch(error => console.error('Error:', error));
}

loadCategory();
loadProduct();