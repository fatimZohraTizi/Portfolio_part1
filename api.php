<?php
header("Content-Type: application/json");

// Function to read data from JSON file
function readData() {
    $file = "data.json";
    if (file_exists($file)) {
        $data = file_get_contents($file);
        return json_decode($data, true);
    }
    return [];
}

// Function to write data to JSON file
function writeData($data) {
    $file = "data.json";
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

// Handle POST request to add new book
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = $_POST["title"];
    $author = $_POST["author"];
    $price = $_POST["price"];
    $genre = $_POST["genre"];
    $year = $_POST["year"];

    // Validate data (add more validation if needed)
    if (empty($title) || empty($author) || empty($price) || empty($genre) || empty($year)) {
        http_response_code(400);
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }
    // Read existing data
    $data = readData();
    // Add new book
    $book = [
        "title" => $title,
        "author" => $author,
        "price" => $price,
        "genre" => $genre,
        "year" => $year
    ];
    $data[] = $book;
   // Write updated data back to the file
    writeData($data);
    // Respond with the added book
    echo json_encode($book);
    exit;
}

// Read and return all books for GET request
echo json_encode(readData(), JSON_PRETTY_PRINT);
?>
