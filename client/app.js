/*
THIS IS THE PART WHERE WE GET THE DATA
*/

//get the html element
const quotesBox = document.getElementById("quotes");

//fetch the items from the db via server
async function getQuotes() {
  const response = await fetch("http://localhost:8080/quotes");
  const data = await response.json();
  console.log(data);

  //clear the container div
  //clear the container div
    quotesBox.innerHTML = "";

  //show the data on the page
  //loop through it all

  data.forEach(function (quotes) {
    const p = document.createElement("p");
    p.textContent = `One time, ${quote.who} ${quote.what}`;
    quotesBox.appendChild(p);
  }); /// ITEMS NOT DISPLAYING ON PAGE  YELP!!!!
}
getQuotes();
/*
THIS IS THE PART WHERE WE ADD NEW DATA
*/
const form = document.getElementById('quotes-form');

async function postQuote(){
    event.preventDefault();
    //get the info from the form
    const formData - new FormData(form);
    const data = Object.fromEntries(formData);


    //make a fetch POST request to add new data
    await fetch ("http://localhost:8080/quotes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    //reset the form
    form.reset();

    //add the new quote on the screen
    getQuotes();
}



form.addEventListener("submit", handlePostMistake);
//post the data
