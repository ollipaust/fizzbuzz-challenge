const cardButton = document.querySelectorAll(".card");

cardButton.forEach((card) => {
  card.onclick = function () {
        
        let content = this.nextElementSibling;

        this.classList.toggle("active");

        if (content.style.maxHeight) { // if open
            content.style.maxHeight = null;
        } else { // if closed
            content.style.maxHeight = content.scrollHeight + "px";
        }
    };
});
