const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

// Create
// addGroceryItem function
function addGroceryItem(grocery_item_id, name, quantity, price, category){

    const params = {
        TableName: 'grocery_items',
        Item: {
            grocery_item_id,
            name,
            quantity,
            price,
            category
        }
    }

    return docClient.put(params).promise();
};

// Read
// retrieve by id
function retrieveGroceryItemById(grocery_item_id){
    const params = {
        TableName: 'grocery_items',
        Key: {
            grocery_item_id
        }
    }

    return docClient.get(params).promise();
}

// retrieve a list
// scan operation
// this operation is inefficient as it will go through the entire list
// Do not use this often

function retrieveAllGroceryItems(){
    const params = {
        TableName: 'grocery_items'
    }

    return docClient.scan(params).promise();
}

// O(N)
function retrieveGroceryItemsByCategory(category){
    const params = {
        TableName: 'grocery_items',
        FilterExpression: '#c = :value',
        ExpressionAttributeNames: {
            '#c': 'category'
        },
        ExpressionAttributeValues: {
            ':value': category
        },
        Limit: 1
    };

    return docClient.scan(params).promise();
}

// O(1)
//  This requires you to setup your local secondary index using the same partition key
// but different sort key on the category
// function retrieveGroceryItemByCategory(){
//     const params = {
//         TableName: 'grocery_items',
//         IndexName: 'category-index',
//         KeyConditionExpression: '#c = :value',
//         ExpressionAttributeNames: {
//             '#c': 'category'
//         },
//         ExpressionAttributeValues: {
//             ':value': category
//         }
//     }

//     return docClient.query(params).promise();
// }

// Update

function updateGroceryNameById(grocery_item_id, newName){
    const params = {
        TableName: 'grocery_items',
        Key: {
            grocery_item_id
        },
        UpdateExpression: 'set #n = :value',
        ExpressionAttributeNames:{
            '#n': 'name'
        },
        ExpressionAttributeValues:{
            ':value': newName
        }
    }

    return docClient.update(params).promise();
}

// Delete
function deleteGroceryItemById(grocery_item_id){
    const params = {
        TableName: 'grocery_items',
        Key: {
            grocery_item_id
        }
    }

    return docClient.delete(params).promise();
}


module.exports = {
    addGroceryItem,
    retrieveGroceryItemById,
    retrieveAllGroceryItems,
    retrieveGroceryItemsByCategory,
    updateGroceryNameById,
    deleteGroceryItemById
};