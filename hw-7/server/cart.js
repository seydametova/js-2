const statsFilePath = 'server/db/stats.json';

let add = (cart, req) => {
    cart.contents.push(req.body);

    return { newCart: JSON.stringify(cart, null, 4), cartItem: req.body };
};

let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    // find.quantity = find.quantity + req.body.quantity;
    return { newCart: JSON.stringify(cart, null, 4), cartItem: find };
};

let remove = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    if (find.quantity > 1) {
        find.quantity--;
    } else {
        cart.contents.splice(cart.contents.indexOf(find), 1);
    }
    return { newCart: JSON.stringify(cart, null, 4), cartItem: find };
}

module.exports = {
    add,
    change,
    remove
};