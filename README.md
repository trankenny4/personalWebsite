**This is a personal website project that I have built utilizing various learned web development technologies including HTML/CSS, Javascript, Node, and Express.**  

(NOTE: This a work in progress and will be updated periodically as I continue to learn more about web devlopment. Future topics to include React and MongoDB usage.)   




A navigational system has been built to access various pages on the website:

**Home**:   
An overview of the technologies and skills being learned and implemented across the site

**Gallery**:   
An image gallery to learn how to use images in HTML. Text, captions, and image borders were further customized with CSS styles.

**Order/Contact**:  
(NOTE: Unfortunately, for the order form to be submitted properly, the project must be run locally with Node modules installed via "npm i" -> "npm start" -> "localhost:3000" as URL. Github does not allow for node_modules to be uploaded due to its large file sizes.)

These pages are sample forms to learn how to accept user input in a web page. This includes input boxes, radio buttons, quantity sliders, and text boxes for user inputs. In the HTML and CSS, further quality of life improvements for the user has been implemented. The improvements include input boxes changing colors when focused, highlighting red for required entries, red asterisks for required entries, and highlighting red for valid entries. For certain entries, particularly the email address, regular expressions are used to parse for errors.  

This page also uses the Express server to listen for the user's order form request. Their inputs are read and returned to the user in complete sentence responses.  

**Staff**:  
(NOTE: Unfortunately, for the staff form to be submitted properly, the project must be run locally with Node modules installed via "npm i" -> "npm start" -> "localhost:3000" as URL. Github does not allow for node_modules to be uploaded due to its large file sizes.)

The staff page utilizes two different methods of generating a random staff member from the Random User Generator API. One way is to through the browser itself making requests while the other is the Express server making requests.  

In my 'random.js' file, event listeners to register for a user click have been implemented. The buttons are the conditionals in the asynchronous getRandomUser function, determining whether to perform a browser request or Express server request. If a browser request is selected, Document Object Model (DOM) manipulation is used to append the innerHTML into the table of employees. If a server request is selected, the 'app.get' asynchronous function in my 'index.mjs' file will target the ID of the requested button, await a response, and fetch the data with the Fetch API.  

Error handling haas also been implemented should a response not be received from the server.








