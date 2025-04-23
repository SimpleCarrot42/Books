// Initialize the counters for each website (can be fetched from local storage if available)
let likeCounters = JSON.parse(localStorage.getItem('likeCounters')) || { site1: 15, site2: 8, site3: 22, site4: 5, site5: 11, site6: 3, site7: 18, site8: 7 };
let dislikeCounters = JSON.parse(localStorage.getItem('dislikeCounters')) || { site1: 2, site2: 1, site3: 0, site4: 4, site5: 1, site6: 3, site7: 0, site8: 2 };

function updateCountersInLocalStorage() {
    // Save the updated counters to localStorage
    localStorage.setItem('likeCounters', JSON.stringify(likeCounters));
    localStorage.setItem('dislikeCounters', JSON.stringify(dislikeCounters));
}

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hamburgerMenu = document.querySelector('#no-hover');
    if (sidebar.style.display === 'none') {
        sidebar.style.display = 'flex';
        hamburgerMenu.style.display = 'none'; // hide hamburger menu
    } else {
        sidebar.style.display = 'none';
        hamburgerMenu.style.display = 'block'; // show hamburger menu
    }
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hamburgerMenu = document.querySelector('#no-hover');
    if (sidebar.style.display === 'flex') {
        sidebar.style.display = 'none';
        hamburgerMenu.style.display = 'block'; // show hamburger menu
    } else {
        sidebar.style.display = 'flex';
        hamburgerMenu.style.display = 'none'; // hide hamburger menu
    }
}

// document.addEventListener('click', (event) => {
//     const sidebar = document.querySelector('.sidebar');
//     const hamburgerMenu = document.querySelector('.hamburger-menu');
//     if (!sidebar.contains(event.target) && sidebar.style.display === 'block') {
//         hideSidebar();
//     }
// });

updateCountersInLocalStorage();

// On page load, initialize counters
window.onload = function () {
    // Update localStorage counters to make sure it's current
    updateCountersInLocalStorage();

    // Get all elements that have a like-count (or dislike-count) class or ID
    const likeElements = document.querySelectorAll('[id^="like-count-site"]');
    const dislikeElements = document.querySelectorAll('[id^="dislike-count-site"]');

    // Loop over all likeElements (assuming siteIds are consecutive: site1, site2, site3)
    likeElements.forEach((likeElement) => {
        const siteId = likeElement.id.replace('like-count-site', '');  // Extract siteId (1, 2, 3, ...)
        if (likeCounters[`site${siteId}`] !== undefined) {
            likeElement.textContent = likeCounters[`site${siteId}`] || 0;  // Set like count from localStorage or default to 0
        }
    });

    // Loop over all dislikeElements and update similarly
    dislikeElements.forEach((dislikeElement) => {
        const siteId = dislikeElement.id.replace('dislike-count-site', '');  // Extract siteId (1, 2, 3, ...)
        if (dislikeCounters[`site${siteId}`] !== undefined) {
            dislikeElement.textContent = dislikeCounters[`site${siteId}`] || 0;  // Set dislike count from localStorage or default to 0
        }
    });

    // Disable buttons on load if there's a count greater than 0
    for (const siteId in likeCounters) {
        if (likeCounters[siteId] > 0 || dislikeCounters[siteId] > 0) {
            disableBothButtonsOnLoad(siteId);
        }
    }
};

function disableButton(buttonElement) {
    if (buttonElement) {
        buttonElement.style.cursor = 'auto';
        buttonElement.style.pointerEvents = 'none';
    }
}

function enableButton(buttonElement) {
    if (buttonElement) {
        buttonElement.style.cursor = 'pointer';
        buttonElement.style.pointerEvents = 'auto';
    }
}

function disableBothButtonsOnLoad(siteId) {
    const dislikeButton = document.getElementById(`dislike-site${siteId}`);
    const likeButton = document.getElementById(`like-site${siteId}`);
    disableButton(likeButton);
    disableButton(dislikeButton);
}

function addLike(siteId) {
    // Increment like count
    likeCounters[`site${siteId}`]++;

    console.log(siteId);

    // Update the like count on the page
    document.getElementById(`like-count-site${siteId}`).textContent = likeCounters[`site${siteId}`];

    // Disable both like and dislike buttons
    const dislikeButton = document.getElementById(`dislike-site${siteId}`);
    const likeButton = document.getElementById(`like-site${siteId}`);
    disableButton(likeButton);
    disableButton(dislikeButton);

    // Change opacity of the clicked button
    likeButton.style.opacity = '0.5';

    // Save the updated counters in localStorage
    updateCountersInLocalStorage();
}

function addDislike(siteId) {
    // Increment dislike count
    dislikeCounters[`site${siteId}`]++;

    // Update the dislike count on the page
    document.getElementById(`dislike-count-site${siteId}`).textContent = dislikeCounters[`site${siteId}`];

    // Disable both like and dislike buttons
    const dislikeButton = document.getElementById(`dislike-site${siteId}`);
    const likeButton = document.getElementById(`like-site${siteId}`);
    disableButton(dislikeButton);
    disableButton(likeButton);

    // Change opacity of the clicked button
    dislikeButton.style.opacity = '0.5';

    // Save the updated counters in localStorage
    updateCountersInLocalStorage();
}

// TODO: SQL database this is the js alter it alter this script so when one like/dislike button is pressed both of them are disabled
