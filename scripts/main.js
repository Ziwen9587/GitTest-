
contentDiv = document.getElementById("content-container");
clientBtn = document.getElementById('clientBtn');
productsBtn = document.getElementById('productsBtn');
var contentDiv2 = document.getElementById('content-container-search');
var contentDiv3 = document.getElementById('content-container-search-result');
var breadcrumbsDiv = document.getElementById("breadcrumbs-container");

clientBtn.addEventListener("click",clientClick);
productsBtn.addEventListener("click",productsClick);

let maxPriceValue = 0;

const category = {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    lactoseFree: false,
    organic: false,
    nonOrganic: false
}

let productList = [
    {
        name: "Carrot",
        price: 1.1,
        vegan: true,
        vegetarian: true,
        image: 'images/carrot.png'
    },
    {
        name: "Eggs",
        price: 2.5,
        vegetarian: true,
        image: 'images/eggs.png'
    },
    {
        name: "Apple",
        price: 3.8,
        vegan: true,
        vegetarian: true,
        nonOrganic: true,
        image: 'images/apple.png'
    },
    {
        name: "Organic Apple",
        price: 5.0,
        organic: true,
        image: 'images/apple.png'
    },
    {
        name: "Tomato",
        price: 3.0,
        organic: true,
        image: 'images/tomato.png'
    },
    {
        name: "Banana",
        price: 2.2,
        vegetarian: true,
        vegan: true,
        image: 'images/banana.png'
    },
    {
        name: "Zucchini",
        price: 6.6,
        glutenFree: true,
        vegetarian: true,
        vegan: true,
        image: 'images/zucchini.png'
    },
    {
        name: "Sweet Potatoes",
        price: 1.2,
        glutenFree: true,
        lactoseFree: true,
        image: 'images/sweet_potato.png'
    },
    {
        name: "Broccoli",
        price: 2.4,
        vegan: true,
        vegetarian: true,
        image: 'images/broccoli.png'
    },
    {
        name: "Cheese",
        price: 8.8,
        glutenFree: true,
        image: 'images/cheese.png'
    },
    {
        name: "Bread",
        price: 1.5,
        glutenFree: false,
        image: 'images/bread.png'
    },
    {
        name: "Whole Wheat Bread",
        price: 1.8,
        glutenFree: true,
        image: 'images/whole_wheat_bread.png'
    },
    {
        name: "Walnuts",
        price: 3.8,
        lactoseFree: true,
        vegan: true,
        image: 'images/walnuts.png'
    },
    {
        name: 'Ham',
        price: 5.5,
        vegan: false,
        vegetarian:false,
        image: 'images/ham.png'
    },
    {
        name: 'Milk',
        price: 3.5,
        lactoseFree:false,
        vegetarian: true,
        image: 'images/milk.png'
    },
    {
        name: 'Lactose-Free Milk',
        price: 3.5,
        lactoseFree:true,
        vegetarian: true,
        image: 'images/lactos_free_milk.png'
    }
]

var cart = []

// Added cartSearchList for searchFunction()
var cartSearchList = []

//gets the maxPrice from the product list
function getMaxPrice(){
    maxPrice = 0
    for(let product of productList){
        if(product['price'] > maxPrice){
            maxPrice = product['price']
        }
    }
    return maxPrice
}
function clientClick(){    
    //clear the content div first
    const maxPrice = Math.ceil(getMaxPrice());

    contentDiv.innerHTML = ""
    
    contentDiv.innerHTML = `
    <ul class="breadcrumb">
        <li>Client</li>
    </ul>
    <h3>Client Information</h3>
    <p>Choose a category.</p>
    <label>Category</label>
    <select id="categorySelect">
        <option value="noPreference">No Preference</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
    </select>
    <br>
    <p>Select Product Preference</p>
    <input type="checkbox" id="glutenCheckbox" name="GlutenFree" value="glutenFree">
    <label for="GlutenFree">Gluten Free</label><br>
    <input type="checkbox" id="lactoseCheckbox" name="LactoseFree" value="lactoseFree">
    <label for="LactoseFree">Lactose Free</label><br>
    <input type="checkbox" id="organicCheckbox" name="Organic" value="organic">
    <label for="Organic">Organic</label><br>
    <input type="checkbox" id="nonOrganicCheckbox" name="NonOrganic" value="nonOrganic">
    <label for="NonOrganic">Non-Organic</label><br>
    <br>
    <p>Maximum Product Price</p>
    <input id="priceSlider" type="range" name="priceSlider" min="0" max="${maxPrice}" value="0">
    <label id="priceSliderLabel" for="priceSlider">Max product price: $0</label>
    `

    const priceSlider = document.getElementById('priceSlider');

    //update the max price
    priceSlider.addEventListener('change', () => {
        document.getElementById('priceSliderLabel').innerHTML = `Max product price: $${priceSlider.value}`;
        maxPriceValue = priceSlider.value;
    });


    //reset category to default values
    for(let elem in category){
        category[elem] = false;
    }

    //get the select and add an event listenr to listen for change
    selectCategory = document.getElementById("categorySelect");

    //get the value of the checkboxes
    glutenCheckbox = document.getElementById("glutenCheckbox");
    lactoseCheckbox = document.getElementById("lactoseCheckbox");
    organicCheckbox = document.getElementById("organicCheckbox");
    nonOrganicCheckbox = document.getElementById("nonOrganicCheckbox");

    //listen for change in select
    selectCategory.addEventListener('change', () => {
        if(selectCategory.value != "noPreference"){
            category[selectCategory.value] = true;
        }
    });

    //listen for change in checkboxes
    glutenCheckbox.addEventListener('change',()=>{
        category[glutenCheckbox.value] = glutenCheckbox.checked
    });
    
    lactoseCheckbox.addEventListener('change',()=>{
        category[lactoseCheckbox.value] = lactoseCheckbox.checked
    });

    organicCheckbox.addEventListener('change',()=>{
        category[organicCheckbox.value] = organicCheckbox.checked
    });

    nonOrganicCheckbox.addEventListener('change',()=>{
        category[nonOrganicCheckbox.value] = nonOrganicCheckbox.checked
    });

    contentDiv3.innerHTML=``;
    contentDiv2.innerHTML=``;
    breadcrumbsDiv.innerHTML=``;
}

function productsClick(){
    console.log(category)

    let a = ""
    cart.forEach(item => {
        a += item.name + ", "
    });

    // -----Added breadcrumbs starts
    breadcrumbsDiv.innerHTML = `<ul class="breadcrumb">
                                    <li><a href="#" onclick="clientClick()">Client</a></li>
                                    <li>Products</li>
                                </ul>`
    contentDiv.innerHTML = `<h3>Products Tab info</h3><br><h4 id="currentCart">Current Cart: ${a}</h4>`
    // -----Added breadcrumbs ends

    let filtered = false
    for(var i = 0; i < Object.entries(category).length; i++){
        if (Object.entries(category)[i][1] === true) {
            filtered = true;
        }
    }

    let filteredList = []
    let addToCart = [] 

    if (filtered === true) {
    filteredList = productList.filter(function(item) {
        console.log(item)
        for (var key in category) {
          if (item[key] == category[key])
            return true;
        }
        return false;
      });
    } else {
        filteredList = productList
    }

    filteredList = filteredList.sort(function(itemA,itemB) { return itemA.price - itemB.price})

    for(let product of filteredList){

        const numInput = document.createElement("input");
        numInput.type= "number";
        numInput.classList.add("numInputs")
        contentDiv.appendChild(numInput)

        var label = document.createElement('label')
        label.appendChild(document.createTextNode(product.name + ", $" + product.price.toFixed(2)));
        contentDiv.appendChild(label);

        var picture = document.createElement('img');
        picture.setAttribute("src", product.image);
        picture.setAttribute("height", "80");
        picture.setAttribute("width", "80");
        picture.setAttribute("alt", "Image of product");
        contentDiv.appendChild(picture);

        addToCart.push(numInput);
        
        contentDiv.appendChild(document.createElement("br"));
    }

    var add = document.createElement("BUTTON");
    add.onclick = function() {selectedItems(addToCart, filteredList)};
    add.textContent = "Add selected items to cart";
    contentDiv.appendChild(add); 

    // *********** Added search bar function for Lab3 - Owen ***********
    // Pass cart list to a session variable for other HTML page
    localStorage.setItem('cart', JSON.stringify(cart));
    // Pass cart item text to a session variable for other HTML page
    localStorage.setItem('cartItemText', JSON.stringify(a));

    cartSearchList = filteredList.slice();
    contentDiv2.innerHTML = ``;
    contentDiv2.innerHTML += `<br>
                            <form id="searchForm" class="search-container" onsubmit="searchFunction(); return false;">
                                <input type="text" id="searchInput" class="search-input" placeholder="Enter on product name...">
                                <button type="submit" id="searchBtn" class="search-button">Search</button>
                            </form>`
    // ***************************************************
    
}

function selectedItems(addToCart, filteredList){

    if (cart.length >0) { cart = []; }

    for (let i = 0; i < addToCart.length; i++) {
        
        itemQuantity = addToCart[i].value;

        for (let j=0; j< itemQuantity; j++){
            cart.push(filteredList[i])
        }
    }
    console.log(cart)
    productsClick()
}


// *********** Added search bar function for Lab3 - Owen ***********
function searchFunction() {
    contentDiv3.innerHTML = ``;
    let searchInput = document.getElementById("searchInput");
    let searchTerm = searchInput.value.toLowerCase();
    let searchedItemList = [];
    let serachedElementList = [];
    let findProduct =false;
    console.log("Search Term:", searchTerm);

    for (let i = 0; i < cartSearchList.length; i++) {
        let currentProductName = cartSearchList[i].name.toLowerCase();
        if (currentProductName == searchTerm){
            findProduct = true;
            contentDiv3.innerHTML += `<h4>The Matched Product:</h4>`
            console.log("find product matched:", currentProductName);
            // Added product object to list searchedItemList
            searchedItemList.push(cartSearchList[i])
            
            var input = document.createElement("input");
            input.type= "number";
            input.classList.add("numInputs")
            contentDiv3.appendChild(input)
            // Added DOM element to list serachedElementList
            serachedElementList.push(input);

            let label = document.createElement('label')
            label.htmlFor = "numInput" + i;
            label.innerText = cartSearchList[i].name + ", $" + cartSearchList[i].price.toFixed(2);
            contentDiv3.appendChild(label);
            contentDiv3.appendChild(document.createElement("br"));
            contentDiv3.appendChild(document.createElement("br"));
        }
    };
    
    if (findProduct==false) {
        contentDiv3.innerHTML += `<h4>No Matched Product</h4><br><br>`
    } else {
        var add = document.createElement("button");
        add.id = "searchAddBtn";
        add.textContent = "Add selected items to cart";
        add.onclick = function() {selectedSearchedItems(searchedItemList, serachedElementList)}
        contentDiv3.appendChild(add);
        contentDiv3.appendChild(document.createElement("br"));
        contentDiv3.appendChild(document.createElement("br"));
    }

    console.log("Check cart after clicking search: " + cart.length);
    
}


function selectedSearchedItems(searchedItemList, serachedElementList){
    
    console.log ("------------------------------------");
    console.log ("Check searchedItemList: ", searchedItemList[0]);
    console.log ("Check serachedElementList: ", serachedElementList[0]);
    console.log ("Check serachedElementList[0]'s value: ", serachedElementList[0].value);
    var checkItemName = "";
    for (let i = 0; i < serachedElementList.length; i++) {
        let itemQuantity = serachedElementList[i].value;
        for (let j=0; j< itemQuantity; j++){
            checkItemName += searchedItemList[i].name + ", ";
            cart.push(searchedItemList[i])
        }
    }

    // Updated cart in the session between HTMLs
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Retrieve cart item text from session var cartItemText
    var cartItemText = JSON.parse(localStorage.getItem('cartItemText'))
    console.log("Check session var cartItemText: ", cartItemText);
    cartItemText += checkItemName;
    localStorage.setItem('cartItemText', JSON.stringify(cartItemText));

    var totalCartElement = document.getElementById("currentCart");
    totalCartElement.innerHTML = cartItemText;
    

    console.log ("Check cart: ", cart);
    console.log ("------------------------------------");
}



var cartCheck = false;
function cartClick(){
    cartSearchList=[];
    console.log(cartCheck);
    if (cartCheck==true) {
        return;
    }

    var cartInStorage = JSON.parse(localStorage.getItem('cart')) || []
    console.log(cartInStorage)

    var totalPrice = 0;

    var productTable = document.getElementById("SelectedItems").getElementsByTagName('tbody')[0];
    var cartInStorageCopied = cartInStorage.slice();
    var nameSet = new Set();

    // Create a set for product name. Every item is unique
    for (let i=0; i<cartInStorage.length; i++) {
        nameSet.add(cartInStorage[i].name);
    }

    // Generate table rows
    for (let i=0; i<cartInStorageCopied.length; i++) {
        var itemName = cartInStorageCopied[i].name;
        var itemPrice = cartInStorageCopied[i].price;
        var quantity = 1;
        if (nameSet.has(itemName)) {
            for (let j=i+1; j<cartInStorageCopied.length; j++ ) {
                if (cartInStorageCopied[j].name == itemName) {
                    quantity++;
                }
            }
            nameSet.delete(itemName)
            var itemTotalPrice = itemPrice * quantity;
            
            totalPrice += itemTotalPrice;
            var newRow = productTable.insertRow(productTable.rows.length);
            var productName = newRow.insertCell(0);
            productName.innerHTML = itemName;
            var productPrice = newRow.insertCell(1);
            productPrice.innerHTML = itemPrice.toFixed(2);
            var productQuantity = newRow.insertCell(2);
            productQuantity.innerHTML = quantity;
        }
    }
    cartCheck = true;

    var totalPriceInfo = document.createElement("p");
    totalPriceInfo.innerHTML = "<h5> The total price is: " + totalPrice.toFixed(2) + "</h5>";
    contentDiv.appendChild(totalPriceInfo);
    
}
// ***************************************************
