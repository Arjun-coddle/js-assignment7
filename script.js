const data = {
    description: '',
    metadata: {},
    items: []
};

async function fetchData() {
    try {
        const response = await fetch('../data/items.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const jsonData = await response.json();
        
        data.description = jsonData.description;
        data.metadata = jsonData.metadata;
        data.items = jsonData.items;

        document.getElementById("general-description").innerText = data.description;
        displayItems(data.items);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayItems(items) {
    const itemsContainer = document.getElementById("items-container");
    itemsContainer.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>Price:</strong> $${item.price}</p>
            <p class="metadata"><strong>Author:</strong> ${data.metadata.author}</p>
            <strong>Created on:</strong> ${data.metadata.creationDate}
        `;

        itemsContainer.appendChild(card);
    });
}

//Write a JavaScript function to filter items in the array based on price (e.g., show only items over $500).
function filterItems() {
    const minPrice = parseFloat(document.getElementById("filter-price").value);
    if (!isNaN(minPrice)) {
        const filteredItems = data.items.filter(item => item.price > minPrice);
        displayItems(filteredItems);
    }
}

//Create a function to sort the array of items by name or price in ascending or descending order.
function sortItems(property, order) {
    const sortedItems = [...data.items].sort((a, b) => {
        if (a[property] < b[property]) return order === 'asc' ? -1 : 1;
        if (a[property] > b[property]) return order === 'asc' ? 1 : -1;
        return 0;
    });
    displayItems(sortedItems);
}

//Create a simple form (also add validation) to add a new items to the items array and display it immediately in the card section.
function addItem(event) {
    event.preventDefault(); 

    const name = document.getElementById("item-name").value.trim();
    const description = document.getElementById("item-description").value.trim();
    const price = document.getElementById("item-price").value;

    const errorMsg = document.getElementById("err-msg");
    errorMsg.innerHTML = ""; 

    if (!name) {
        errorMsg.innerHTML = "Please enter an item name.";
        return;
    }
    if (!description) {
        errorMsg.innerHTML = "Please enter a description.";
        return;
    }
    if (price === "" || isNaN(parseFloat(price)) || parseFloat(price) < 0) {
        errorMsg.innerHTML = "Please enter a price.";
        return;
    }

    const newItem = {
        name: name,
        description: description,
        price: parseFloat(price)
    };

    data.items.push(newItem);
    displayItems(data.items);

    document.getElementById("item-form").reset();
    errorMsg.innerHTML = "";
}

//Write a function to retrieve and display the author and creation date from the nested metadata object in the JSON file.
function displayMetadata(){
    const author = data.metadata.author;
    const creationDate = data.metadata.creationDate;

    document.getElementById('id-author').innerHTML = `author : ${author}`;
    document.getElementById('id-creation').innerHTML = `creation date : ${creationDate}`
}

fetchData().then(() => {
    displayMetadata(); 
});
