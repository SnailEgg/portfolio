document.getElementsByTagName("form")[0].addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const clearForm = () => {
        for (child of event.target.querySelectorAll('input, textarea')) {
            child.value = "";
        }
        event.target.querySelector('.success-message').style.display = "block";
        event.target.querySelector('.fail-message').style.display = "none";
    }

    try {
        const response = await fetch("https://formspree.io/f/xvkggydd", {
            method: "POST",
            body: data,
            mode: "cors"
        }
        );
        if (response) {
            clearForm();
        } else {
            event.target.querySelector('.fail-message').style.display = "block";
            event.target.querySelector('.success-message').style.display = "none";
        }
    } catch (error) {
        // the fetch request returns an error on successful form submission, so treat this as a success
        clearForm();
    }
});