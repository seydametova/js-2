"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];

        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
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
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item"${this.id}>
                <img class="product-img" src="${this.img}">
                <h3 class="product-heading">${this.title}</h3>
                <p>${this.price} $</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class Cart {
    constructor() {
        this.basket = null;
        this.items = [];

        this._getBasket()
            .then(data => {
                this.basket = data;
                this.items = this.basket.contents.map(item => new CartItem(new ProductItem(item), item.quantity));

                this.render();
            });
    }

    _getBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
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

    render() {
        const rows = this.items.map(item => item.render()).join("");

        const cartRender = `<table>
            <thead>
                <tr>
                    <th class="cart_cell cart_header_cell">
                        <div>Название товара</div>
                    </th>
                    <th class="cart_cell cart_header_cell">
                        <div>Количество</div>
                    </th>
                    <th class="cart_cell cart_header_cell">
                        <div>Цена за шт.</div>
                    </th>
                    <th class="cart_cell cart_header_cell">
                        <div>Итого</div>
                    </th>
                </tr>
            </thead>

            <tbody>
                ${rows}
            </tbody>

            <tfoot>
                <tr class="cart_row">
                    <td colspan="4" class="cart_cell cart_footer_cell">
                        <span>Товаров в корзине на сумму: </span>
                        <span class="total">$${this.sum()}</span>
                    </td>
                </tr>
            </tfoot>
        </table>`;

        document.getElementById("products_cart").insertAdjacentHTML("afterbegin", cartRender);
    }

    toggleCart() {
        const productCart = document.getElementById("products_cart");
        if (!productCart.style.display || productCart.style.display == "none") {
            productCart.style.display = "block";
        } else {
            productCart.style.display = "none";
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

    render() {
        return `<tr class="cart_row">
            <td class="cart_cell">${this.product.title}</td>
            <td class="cart_cell">${this.count} шт.</td>
            <td class="cart_cell">$${this.product.price.toFixed(2)}</td>
            <td class="cart_cell">$${this.sum().toFixed(2)}</td>
        </tr>`;
    }
}


let list = new ProductList();
let cart = new Cart();

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