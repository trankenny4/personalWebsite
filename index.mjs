'use strict';

import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import asyncHandler from 'express-async-handler';
import { products } from './products.js';

const app = express();
const PORT = process.env.PORT;
const catalog = products;

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

// Staff randomization requests
const counter = 10;
let apiCount = 0;

app.get('/random-person', asyncHandler(async (req, res, next) => {
    apiCount += 1;

    if (apiCount % counter === 0);
        console.log(`Total staff requested: ${apiCount}`)

    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    res.send(data);
    next();

}));

app.use((error, req, res, next) => {
    console.error(error.stack)
    res.status(500).send(`The site is currently down. Please come back later.`)
});


// Contact form requests
app.post("/contact", (req, res) => {
    const person = req.body.firstlast;
    const visit = req.body.visit;
    const country = req.body.country;
    const attractions_checkbox = req.body.attractions_checkbox.join(`, `);
    const message = req.body.message;
   

    // console.log(req.body);
    res.send(`
        ${htmlTop}
        <h2>Hi <strong>${person}</strong>,</h2>
        <p>
            After viewing the Gallery photos, the country you are more likely to visit is <strong>${visit}</strong> and 
            the country's photos that you liked the most is from <strong>${country}</strong>. 
        </p>
        
        <p>
            The attactions that you would like to go see from the Gallery are:
            <strong>${attractions_checkbox}</strong>.
        </p>


        <p>
            Here are the other thoughts that you left in a message: <br>
            <strong>${message}</strong>.
        </p>
        ${htmlBottom}
    `);
});


// Order form requests
app.post("/order", (req, res) => {
    const person = req.body.firstlast;
    const choice = req.body.orderselection;
    const quantity = req.body.quantity;
    const email = req.body.email;
    const address = req.body.address;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const country = req.body.country;
    const deliveryInstruction = req.body.delivery;
   
    // Function to compare the user input with the product.js object to return the chosen item
    function userInput(choice){
        for (let item of catalog){
            if (choice === item["product"]){
                return item["product"]
                }
            }
        }

    // Function to calculate the quantity and price and covert to US Currency
    function price(choice){
        for (let item of catalog){
            if (choice === item["product"]){
    
                let price = quantity * item["price"]
                return `$${price.toLocaleString()}`
                }
            }
        }
        
    // console.log(req.body);
    res.send(`
        ${htmlTopOrdering}
        <h2>Hi <strong>${person}</strong>,</h2>

        <p> 
            The item that you would like to order is a <strong>${userInput(choice)}</strong>. The quantity of this item 
            that you would like to order is <strong>${quantity}</strong>. Thus, the total for your order is: <strong>${price(choice)}</strong>. 
        </p>

        <p>
            Your email is <strong>${email}</strong>. 
        </p>

        <p>
            The address that you would like your order sent to is: 
            <strong><br>${person}</strong>
            <br><strong>${address}</strong>
            <br><strong>${address2}</strong> 
            <br><strong>${city}</strong>, <strong>${state}</strong>, <strong>${zip}</strong>
            <br><strong>${country}</strong>
        </p>

        <p>
            Here are the special instructions you left for your order: <br>
            <strong>${deliveryInstruction}</strong>.
        </p>
        ${htmlBottomOrdering}
    `);
});



let htmlTop = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Kenny Tran</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
        <script src='main.js'></script>
    </head>

    <body>
        <header> 
            <h1>Kenny Tran</h1>
        </header>

        <nav>
            <a href="index.html">Home</a>
            <a href="gallery.html">Gallery</a>
            <a href="order.html">Order</a>
            <a href="contact.html">Contact</a>
        </nav>

        <main>
            <section>
                <h2>Contact</h2>
                <article id="contact">
`

let htmlBottom = `
             </article>  
        </section>
    </main>

    <footer>
        <p>&copy; 2023 Kenny Tran</p>
    </footer>

    </body>
    </html>
`

let htmlTopOrdering = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Kenny Tran</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
        <script src='main.js'></script>
    </head>


    <body>
        <header> 
            <h1>Kenny Tran</h1>
        </header>

        <nav>
            <a href="index.html">Home</a>
            <a href="gallery.html">Gallery</a>
            <a href="order.html">Order</a>
            <a href="contact.html">Contact</a>
        </nav>

        <main>
            <section>
                <h2>Order</h2>
                <article id="order">
`

let htmlBottomOrdering = `
                </article>
            </section>
        </main>

        <footer>
        <p>&copy; 2023 Kenny Tran</p>
        </footer>

    </body>

    </html>  

`


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});


