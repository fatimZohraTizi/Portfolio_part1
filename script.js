window.onload = fetchData;

function fetchData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                displayBooks(JSON.parse(this.responseText));
            } else {
                console.error("Error fetching data");
            }
        }
    };
    xhr.open("GET", "api.php", true);
    xhr.send();
}

function displayBooks(books) {
    var bookList = document.getElementById("bookList");
    bookList.innerHTML = "<h2>Book List:</h2>";

    // Display books as a table
    if (books.length > 0) {
        var tableHTML = "<table>";
        tableHTML += "<tr><th>Title</th><th>Author</th><th>Price</th><th>Genre</th><th>Year</th></tr>";
        
        books.forEach(function(book) {
            tableHTML += `<tr><td>${book.title}</td><td>${book.author}</td><td>${book.price}</td><td>${book.genre}</td><td>${book.year}</td></tr>`;
        });

        tableHTML += "</table>";
        bookList.innerHTML += tableHTML;
    } else {
        bookList.innerHTML += "<p>No books available.</p>";
    }
}

function addBook() {
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var price = document.getElementById("price").value;
    var genre = document.getElementById("genre").value;
    var year = document.getElementById("year").value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                fetchData(); // Refresh the displayed books
            } else {
                console.error("Error adding book");
            }
        }
    };
    xhr.open("POST", "api.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`title=${title}&author=${author}&price=${price}&genre=${genre}&year=${year}`);
}
