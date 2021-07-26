class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000, img: "img/Notebook.png" },
            { id: 2, title: 'Mouse', price: 20, img: "img/Mouse.png" },
            { id: 3, title: 'Keyboard', price: 200, img: "img/Keyboard.png" },
            { id: 4, title: 'Gamepad', price: 50, img: "img/Gamepad.png" },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //           block.innerHTML += item.render();
        }
    }

    sum() {
        let productSum = 0;
        this.goods.forEach(element => {
            productSum += element.price;
        });

        return productSum;
    }
}

class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.img;
    }

    render() {
        return `<div class="product-item">
                <img class="product-img" src="${this.img}">
                <h3 class="product-heading">${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class Cart {
    constructor(items) {
        this.items = items;
    }

    sum() {
        let result = 0;
        this.items.forEach(element => {
            result += element.sum();
        });

        return result;
    }

    add(product, count) {
        const item = this.items.find(item => item.product.id === product.id);
        if (item != null) {
            item.add(count)
        } else {
            this.items.push(new CartItem(product, count));
        }
    }

    remove(product, count) {
        const item = this.items.find(item => item.product.id === product.id);
        if (item != null) {
            item.remove(count);
            if (item.count <= 0) {
                this.items = this.items.filter(item => item.product.id !== product.id);
            }
        }
    }
}

class CartItem {
    constructor(product, count) {
        this.product = product;
        this.count = count;
    }

    add(count) {
        this.count += count;
    }

    remove(count) {
        this.count -= count;
    }

    sum() {
        return this.product.price * this.count;
    }
}

let list = new ProductList();





// const products = [
    // { id: 1, title: 'Notebook', price: 2000, image: "img/Notebook.png" },
    // { id: 2, title: 'Mouse', price: 20, image: "img/Mouse.png" },
    // { id: 3, title: 'Keyboard', price: 200, image: "img/Keyboard.png" },
    // { id: 4, title: 'Gamepad', price: 50, image: "img/Gamepad.png" },
// ];
// //Функция для формирования верстки каждого товара
// //Добавить в выводе изображение
// const renderProduct = (item) => {
//     return `<div class="product-item">
//                 <img class="product-img" src="${item.image}">
//                 <h3 class="product-heading">${item.title}</h3>
//                 <p>${item.price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };

// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item));
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList.join("");
// };

// renderPage(products);