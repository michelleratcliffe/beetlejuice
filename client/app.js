/*
THIS IS THE PART WHERE WE GET THE DATA
*/

//get the html element
const quotesBox = document.getElementById("quotesBox");

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
    const quoteElement = document.createElement("div");
    quoteElement.id = `quotes-${quotes.id}`;

    const p = document.createElement("p");
    p.textContent = `${quotes.who} ${quotes.what}`;
    quotesBox.appendChild(p);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
      await deleteQuote(quotes.id);
      removeQuote(quotes.id);
    });

    quoteElement.appendChild(deleteBtn);
    quotesBox.appendChild(deleteBtn);
  });
}
getQuotes();

async function deleteQuote(id) {
  await fetch(`http://localhost:8080/quotes/${id}`, {
    method: "DELETE",
  });
}

function removeQuote(id) {
  const quoteElement = document.getElementById(`quotes-${id}`);
  if (quoteElement) {
    quoteElement.remove();
  }
}
/*
THIS IS THE PART WHERE WE ADD NEW DATA
*/
const form = document.getElementById("quotes-form");

async function postQuote() {
  event.preventDefault();
  //get the info from the form
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  //make a fetch POST request to add new data
  await fetch("http://localhost:8080/quotes", {
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

form.addEventListener("submit", postQuote);
//post the data
