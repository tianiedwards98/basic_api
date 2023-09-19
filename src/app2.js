const express = require('express');
const app = express();
const PORT = 3000;

const myRouter = require('../routes/router_file');

app.use('/', myRouter);
// app.get('/', (req,res) => {
//     res.send("Hello World");
// });



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})