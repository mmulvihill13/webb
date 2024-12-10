// const randomDog = document.getElementById("load-dog-btn");
// const pomDog = document.getElementById("load-pom-btn");

//Function for the random dog meme

//Function for the pomeranian meme
async function getPomeranian() {

    try {
        
        // Fetch a random dog image
        let response = await fetch("https://dog.ceo/api/breed/pomeranian/images/random");
        let data = await response.json();
        const dogImageUrl = data.message;

        // Get the meme caption from the backend
        const memeText = await generateCaption(dogImageUrl);

        // Update the image and caption on the page
        const imageContainer = document.getElementById("image-container");
        imageContainer.innerHTML = ""; // Clear the container first

        const img = document.createElement("img");
        img.src = dogImageUrl;
        img.alt = "Dog Meme";
        img.style.width = "500px"; // You can adjust the size
        img.style.height = "500px"; // You can adjust the size

        const caption = document.createElement("p");
        caption.textContent = memeText;

        imageContainer.appendChild(img);
        imageContainer.appendChild(caption);
    } catch (error) {
        console.error("Error fetching the dog image or generating the caption:", error);
    }
}

//Function to send over to chatGPT
async function generateCaption(imageUrl) {
    try {
        // Ensure this matches the backend's server address and port
        const response = await fetch('http://localhost:5501/generate-caption', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Important to set the content type to JSON
            },
            body: JSON.stringify({ imageUrl }), // Ensure imageUrl is included in the body as a JSON object
        });

        // Parse the response from the backend
        const data = await response.json();
        if (data.caption) {
            return data.caption;  // Return the generated caption
        } else {
            throw new Error('No caption received from backend');
        }
    } catch (error) {
        console.error('Error generating caption:', error);
        return 'Oops! Something went wrong.';
    }
}


// Event listener for the Generate Meme button
document.getElementById("load-pom-btn").addEventListener("click", getPomeranian);

