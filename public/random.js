'use strict';

function showPersonTable(person){
    randomUser.innerHTML += `
        <tr>
            <td><img src="${person.picture.thumbnail}" alt="Random portrait"/></td>
            <td>
                <a href="mailto:${person.email}">
                ${person.name.first}
                ${person.name.last}</a>
                </td>
            <td>${person.phone}</td>
            <td>${person.location.city}</td>
        </tr>
    `;
}

// Async function to handle events, target ID, await response, and fetch data
async function getRandomUser(event) {
    event.preventDefault();

    const targetID = event.target.getAttribute('id');
    
    const url = targetID === 'fromBrowser' ? "https://randomuser.me/api/"
                : "/random-person"


    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status == 200){
            showPersonTable(data.results[0]);
        }   

    } catch (error) {
        console.error(error)
    }
}


// Adding the event listeners

document.addEventListener('DOMContentLoaded', () => {
    const fromBrowser = document.getElementById('fromBrowser');
    fromBrowser.addEventListener('click', getRandomUser);

    const fromServer = document.getElementById('fromServer');
    fromServer.addEventListener('click', getRandomUser);
});