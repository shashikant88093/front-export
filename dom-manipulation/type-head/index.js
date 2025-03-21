const API_URL = 'https://api.frontendexpert.io/api/fe/glossary-suggestions';

// Reusable debounce function
function debounce(func, delay) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => func.apply(this, args), delay);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const typehead = document.getElementById("typehead");
    const suggestionsList = document.getElementById("suggestions-list");

    if (!typehead || !suggestionsList) {
        console.error('Required DOM elements not found!');
        return;
    }

    const debouncedFetchSuggestions = debounce(handleApi, 500); // Wrap API call in debounce

    typehead.addEventListener('input', () => {
        if (typehead.value.length === 0) {
            clearSuggestions();
        } else {
            debouncedFetchSuggestions(typehead.value); // Pass input value to debounced API handler
        }
    });

    async function handleApi(query) {
        try {
            const url = new URL(API_URL);
            url.searchParams.set('text', query);

            const response = await fetch(url);
            if (!response.ok) throw new Error(`API error: ${response.statusText}`);

            const suggestions = await response.json();
            renderSuggestions(suggestions);
        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    function renderSuggestions(suggestions) {
        clearSuggestions();
        const fragment = document.createDocumentFragment();

        suggestions.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;

            li.addEventListener('click', () => {
                typehead.value = item; // Set input to selected suggestion
                clearSuggestions();
            });

            fragment.appendChild(li);
        });

        suggestionsList.appendChild(fragment);
    }

    function clearSuggestions() {
        suggestionsList.innerHTML = ""; // Clear suggestions
        clearTimeout(timerId)
    }
});
