//array to store books
let myLibrary = [];
let cardID = 0;

//constructor
function Book(bookID, title, author, pages, read){
    this.bookID = bookID;   //same as cardID
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        return (`${this.title} by ${this.author}, ${pages} pages, ${read}.`);
    }
}




function popOrHideForm(){
    const formDiv = document.querySelector(".book-add-form");
    if (formDiv.style.display == "block"){
        formDiv.style.display = "none";
    }
    else{
        formDiv.style.display = "block";
        formDiv.style.position = "absolute";
        formDiv.style.top = "50%";
        formDiv.style.left = "50%";
        formDiv.style.transform = "translate(-50%, -50%)";
    }
}


// function that removes book from array and re-renders display by calling displayAllBookCards()
function deleteBook(){

    const cardToBeDelted = this.parentNode.parentNode;
    const cardID = cardToBeDelted.getAttribute("id");
    // this ID is same as the BookID that needs to be deleted from array

    console.log(`card to delete: ${cardID}`);

    let tempLibrary = [];
 
    // find that BookID in array
    myLibrary.forEach((book) => {
        if (book.bookID != cardID){
            tempLibrary.push(book);
        }
    });

    myLibrary = tempLibrary;

    //clear display
    // clearing the existing book cards
    const bookContainer = document.querySelector(".cards-container");
    bookContainer.textContent = "";

    displayAllBookCards();
}


// for UI
function displayAllBookCards(){

    myLibrary.forEach((book) => {
        const card1 = document.createElement("div");
        card1.classList = "card";
        card1.setAttribute("id", book.bookID);
        
        // cross button
        const crossBtnContainer = document.createElement("div");
        crossBtnContainer.classList = "card-delete-btn-container";
        const crossBtn = document.createElement("button");
        crossBtn.classList = "card-delete-btn";
        crossBtn.textContent = "X";
        crossBtnContainer.appendChild(crossBtn);
        card1.appendChild(crossBtnContainer);
    
        //adding eventListener to cross button
        // DELETE CARD AND REMOVE FROM ARRAY
        // just remove from array and it is automatically removed from display as the display renders after clicking cross (remeber to call it!)
        crossBtn.addEventListener("click", deleteBook);
    
        // paras
        const p1 = document.createElement("p");
        p1.textContent = "Title: ";
        p1.textContent += book.title;
        card1.appendChild(p1);
    
        const p2 = document.createElement("p");
        p2.textContent = "Author: ";
        p2.textContent += book.author;
        card1.appendChild(p2);
    
        const p3 = document.createElement("p");
        p3.textContent = "Pages: ";
        p3.textContent += book.pages;
        card1.appendChild(p3);
    
        // read button
        const readBtnContainer = document.createElement("div");
        readBtnContainer.classList = "card-read-btn-container";
        const readButton = document.createElement("input");
        readButton.setAttribute("type", "checkbox");
        readButton.setAttribute("name", "read");
        readButton.setAttribute("value", "read");
        if (book.read == "read"){
            readButton.setAttribute("checked", "true");
        }
        readBtnContainer.appendChild(readButton);
        const readText = document.createTextNode("Read");
        readBtnContainer.appendChild(readText);
        card1.appendChild(readBtnContainer);
    
        // appending card
        const cardContainer = document.querySelector(".cards-container");
        cardContainer.appendChild(card1);
    });

}



// Add Book button
const addBookBtn = document.querySelector(".add-book-btn");
addBookBtn.addEventListener("click", popOrHideForm);

// Form cross button
const formCrossBtn = document.querySelector(".cross-button");
formCrossBtn.addEventListener("click", popOrHideForm);




// function where only a new book object is created and added to array
document.querySelector(".my-form").addEventListener("submit", function(event){
    event.preventDefault();
    
    // clearing the existing book cards
    const bookContainer = document.querySelector(".cards-container");
    bookContainer.textContent = "";

    // making a new book object
    let title1 = document.querySelector("#title").value;
    let author1 = document.querySelector("#author").value;
    let pages1 = document.querySelector("#pages").value;
    let read1 = document.querySelector("input[name='read']:checked").value;

    let bookID = "a"+cardID;
    cardID++;
    let book = new Book(bookID, title1, author1, pages1, read1);
    
    // pushing new book obj to array
    myLibrary.push(book);
    
    // clearing fields of form
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    if (read1 == "read") {
        // then set it to default 'not read yet'
        document.querySelector("input[value='read']").checked = false;
        document.querySelector("input[value='not read yet']").checked = true;
        
    }
    
    // hiding the form
    popOrHideForm();
    
    // displaying all books (UI part)
    displayAllBookCards();
    
});
