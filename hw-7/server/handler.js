const cart = require('./cart');
const fs = require('fs');
const statsFilePath = 'server/db/stats.json';

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove
};
//HANDLER отвечает за изменение данных в самом файле
let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            let { newCart, cartItem } = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
                } else {
                    res.send(JSON.stringify({ result: 1 }))
                    stats(action, cartItem);
                }
            })
        }
    })
};

let stats = (action, cartItem) => {
    fs.readFile(statsFilePath, "utf-8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push({
                action,
                date: new Date().toISOString(),
                product_name: cartItem.product_name,
                id_product: cartItem.id_product
            });
            fs.writeFile(statsFilePath, JSON.stringify(parsedData, null, 4), err => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

module.exports = handler;