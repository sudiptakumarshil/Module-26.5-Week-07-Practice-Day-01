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
                                <div class="text-center"><button type="button" onclick="loadProductDetail(${element.id})" class="btn btn-secondary btn-sm">View</button></div>
                            </div>
                        </div>
                    </div>`
            });
            document.getElementById('products').innerHTML = html;
            document.getElementById('product_category').textContent = category ? category.id : 'Products';
            setTimeout(() => {
                loader.style.display = "none";
            }, 1000);
        })
        .catch(error => console.error('Error:', error));
}

const loadProductDetail = (product_id) => {
    let loader = document.getElementById('loader');
    loader.style.display = "block";
    
    fetch(`https://api.allorigins.win/raw?url=https://fakestoreapi.com/products/${product_id}`)
        .then(res => res.json())
        .then(json => {
            loadProductHtml(json)

        }).catch(error => console.error('Error:', error));
}


const loadProductHtml = (data) => {
    let html = '';
    html += `
          <div class="container mt-4">
            <div class="row">
                <div class="col-md-6">
                    <img src="${data.image}" alt="${data.image}" class="product-image img-fluid">
                </div>

                <div class="col-md-6 product-details">
                    <h2 class="product-title">${data.title}</h2>
                    <p class="text-muted">Category: ${data.category}</p>
                    <h4 class="product-price text-danger">$${data.price}</h4>
                    <div class="product-description">
                        <h5>Description</h5>
                        <p>${data.description}</p>
                    </div>
                </div>
            </div>
        </div>`;
    setTimeout(() => {
        document.getElementById('product_info').innerHTML = html;
        $('#exampleModal').modal('show');
        loader.style.display = "none";
    }, 500);

}

loadCategory();
loadProduct();