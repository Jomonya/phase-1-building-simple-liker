// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Add event listeners to each heart icon
document.querySelectorAll(".like-glyph").forEach(heart => {
  heart.addEventListener("click", () => {
    if (heart.innerText === EMPTY_HEART) {
      // Heart is empty, try to fill it
      mimicServerCall().then(() => {
        // Success: Fill the heart and add the .activated-heart class
        heart.innerText = FULL_HEART;
        heart.classList.add("activated-heart");
      }).catch(error => {
        // Failure: Show the error message in the modal
        const modal = document.getElementById("modal");
        const modalMessage = document.querySelector("#modal .modal-message");
        modal.classList.remove("hidden");
        modalMessage.innerText = error;
        // Hide the modal after 3 seconds
        setTimeout(() => {
          modal.classList.add("hidden");
        }, 3000);
      });
    } else {
      // Heart is full, empty it
      heart.innerText = EMPTY_HEART;
      heart.classList.remove("activated-heart");
    }
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
