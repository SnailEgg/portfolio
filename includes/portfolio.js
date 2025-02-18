window.addEventListener("load", () => {
    // on page load uncheck each filter checkbox and add listeners to update search criteria when any filter checkbox is pressed
    for (let checkbox of document.querySelectorAll(".portfolio-filter")) {
        checkbox.checked = false;
        checkbox.addEventListener("change", updateSearch);
    }
});

const updateSearch = (() => {
    // track state of filters over every call of function
    let filters = {
        gamedev: false,
        design: false,
        webdev: false,
        model: false
    }

    return (event) => {
        // update filters object to reflect change in clicked checkbox's state
        filters[event.target.getAttribute("data-filter-name")] = event.target.checked;

        // check if any filters are selected
        let usingFilters = false;
        for (let filterName in filters) {
            if (filters[filterName] === true) {
                usingFilters = true;
                break;
            }
        }

        // loop through each portfolio item
        for (let item of document.querySelectorAll(".portfolio-item")) {1
            // if no filters selected, display every item
            if (!usingFilters) {
                item.classList.remove("hidden");
                continue;
            }

            // otherwise, hide item unless one of its categories' filter is selected
            item.classList.add("hidden");
            for (let category of item.getAttribute("data-portfolio-category").split(" ")) {
                if (filters[category]) {
                    item.classList.remove("hidden");
                }
            }
        }
    }
})();