const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const groceryItemDao = require('../repository/grocery_item_dao');


function addItem(data){
    //uuid.v4(), 'Tomato', 30, 1.00, 'Vegetable'
   
        let grocery_item_id = uuid.v4();
        let category = data.category;
        let name = data.name;
        let price = data.price;
        let quantity = data.quantity
    
    groceryItemDao.addGroceryItem(grocery_item_id, name, quantity, price, category)
    .then((data) => {
        console.log('Adding Item Successful');
    }).catch((err) => {
        console.log('An Error Occurred!');
        console.error(err);
    });
}

function returnGroceryList(){
    groceryItemDao.retrieveAllGroceryItems()
    .then((data) => {
        console.log(data.Items);
    })
    .catch((err) => {
        console.error(err);
    });
}

router.get('/', (req,res)=>{
    //res.end(returnGroceryList());
    res.send(returnGroceryList());
});

router.post('/add', (req,res) => {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk;
    });
    console.log(body);
    req.on('end', () => {
        let data = JSON.parse(body);
        //res.writeHead(201, {'Content_Type': 'application/json'});
        res.send(addItem(data));
    });
   
});


module.exports = router;