const {returnGroceryList, addItem, updateItem, deleteItem} = require("../src/app");

//mock a sample cart

const sampleCart  = [
    {id:1, itemName: "Ice-cream", price: 5.99, quantity: 1, purchased: false},
    {id:2, itemName: "Pizza", price: 15.99, quantity: 2, purchased: false},
    {id:3, itemName: "Chips", price: 4.99, quantity: 1, purchased: false},
    {id:4, itemName: "Apples", price: 5.99, quantity: 1, purchased: false},
];

const newItem = {
    id:1, 
    itemName: "Ice-cream",
    price: 5.99,
    quantity: 1,
    purchased: false
};

describe("Http tests", () => {
  describe("GET Tests", () => {
    test('Should get list', () => {
        let data = returnGroceryList();
        let results = JSON.parse(data);

        expect(results.length).toBeGreaterThan(0);
        expect(results[0]).toStrictEqual({
            id:1, 
            itemName: "Ice-cream",
            price: 5.99,
            quantity: 1,
            purchased: false
        });
       
        });
    });
    describe("POST Test", () => {
        test('Should add a new item to cart', () => {
            let results  = addItem(newItem);
            
            expect(results.message).toBe('Resource Created Successfully!');
            expect(results.data).toStrictEqual({
                id:1, 
                itemName: "Ice-cream",
                price: 5.99,
                quantity: 1,
                purchased: false
            });
        });
    });

    describe("UPDATE Test", () => {
        let updatedItem = {
            "id": 4,
            "itemName": "Apples",
            "price": 10.99,
            "quantity": 2,
            "purchased": true
        };
        test('Should update a existing item in cart', () => {
            let results = updateItem(updatedItem);
            
            expect(results.data).toStrictEqual({
                "id": 4,
                "itemName": "Apples",
                "price": 10.99,
                "quantity": 2,
                "purchased": true
            });
        });
    });

    describe("DELETE Test", () => {
        test('Should remove existing item in cart', () => {
            let results = deleteItem(4);

            expect(results.message).toBe('Resource Deleted Successfully!');
         })
    })
   
 


    

    

    

    

}) 