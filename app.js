//Logger
const {createLogger, transports, format} = require('winston');

// create the logger
const logger = createLogger({
    level: 'info', // this will log only messages with the level 'info' and above
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
    transports: [
      new transports.Console(), // log to the console
      new transports.File({ filename: 'app.log' }), // log to a file
    ],
  });

//HTTP Methods
const http = require("http");
const url = require('node:url');
const port = 3000;

const groceryList  = [
    {id:1, itemName: "Ice-cream", price: 5.99, quantity: 1, purchased: false},
    {id:2, itemName: "Pizza", price: 15.99, quantity: 2, purchased: false},
    {id:3, itemName: "Chips", price: 4.99, quantity: 1, purchased: false},
    {id:4, itemName: "Apples", price: 5.99, quantity: 1, purchased: false},
];

function editGrocery(newItem) {
  // Didn't provide an item to change
  if (!'item' in newItem) return false;

  for (groceryItem of groceryList) {
    if (groceryItem.item === newItem.item) {
      logger.info(`Old groceryItem:\n${JSON.stringify(groceryItem)}`);
      if ('quantity' in newItem) groceryItem.quantity = newItem.quantity;
      if ('price' in newItem) groceryItem.price = newItem.price;
      if ('bought' in newItem) groceryItem.bought = newItem.bought;
      logger.info(`New groceryItem:\n${JSON.stringify(groceryItem)}`);
      return true;
    }
  }
  // Item not found
  return false;
}

const server = http.createServer((req, res) => {

    //GET 
    if(req.method === 'GET' && req.url === '/api/data'){
        logger.info(`Successful GET`);
        res.writeHead(200, {'Content-Type':'application/json'});
        //const data = {message: 'This is GET Data'}
        const data = groceryList;
        res.end(JSON.stringify(data));
    
    //POST 
    }else if(req.method === 'POST' && req.url === '/api/create'){
        let body = ''
        req.on('data', (chunk) => {
            body += chunk;
        });
        console.log(body);
        req.on('end', () => {
            const data = JSON.parse(body);
            //store data 
            groceryList.push(data);
            console.log(data);

            logger.info(`Successful POST:\n${JSON.stringify(groceryList)}`);
            res.writeHead(201, {'Content_Type': 'application/json'});
            res.end(JSON.stringify({message: 'Resource Created Successfully!'}));
        });
    //PUT 
    }else if(req.method === 'PUT' && req.url === '/api/update'){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            groceryList.forEach((item) => {
                if(item.itemName === data.itemName){
                    item.purchased = true;
                }
            })
            logger.info(`Item: "${data.itemName}" purchased with PUT request`);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Resource Changed Successfully!'}));
        });
    //DELETE     
    }else if(req.method === "DELETE"){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            groceryList.forEach((item,index) => {
                if(item.itemName === data.itemName){
                    groceryList.pop(index);
                }
            })
            logger.info(`Item: "${data.itemName}" deleted with DELETE request`);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Resource Deleted Successfully!'}));
        });
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
    
    
});

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});



