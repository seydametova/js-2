const products = [
    { id: 1, title: 'Notebook', price: 2000, image: "img/Notebook.png" },
    { id: 2, title: 'Mouse', price: 20, image: "img/Mouse.png" },
    { id: 3, title: 'Keyboard', price: 200, image: "img/Keyboard.png" },
    { id: 4, title: 'Gamepad', price: 50, image: "img/Gamepad.png" },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product-item">
                <img class="product-img" src="${item.image}">
                <h3 class="product-heading">${item.title}</h3>
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join("");
};

renderPage(products);