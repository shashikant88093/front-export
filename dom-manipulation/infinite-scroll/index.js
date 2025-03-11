const API_BASE_URL = 'https://api.frontendexpert.io/api/fe/testimonials?';

const container = document.getElementById('testimonial-container');

let hasNext = false;
let id = '';
let canFetch = true;

const addToDom = (res) => {
    if (res && res.testimonials) {
        const fragment = document.createDocumentFragment();
        res.testimonials.forEach((item, index) => {
            const p = document.createElement("p");
            p.textContent = item.message;
            p.classList.add("testimonial");
            fragment.appendChild(p);

           
            if (index === res.testimonials.length - 1) {
                id = item.id;
            }
        });

        container.appendChild(fragment);
        hasNext = res.hasNext;
        canFetch = true; 
    }
};

const fetchAPI = async () => {
    if (!canFetch) return; // Prevent multiple fetches

    canFetch = false; // Block further requests until this completes
    const URL = id ? `${API_BASE_URL}limit=5&after=${id}` : `${API_BASE_URL}limit=5`;

    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        addToDom(data);
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        canFetch = true; // Allow retrying in case of failure
    }
};

function scrollListener() {
    if (!canFetch || !hasNext) return;

    const spaceLeftToScroll = container.scrollHeight - container.scrollTop - container.clientHeight;
    if (spaceLeftToScroll <= 0) {
        fetchAPI();
    }
}

container.addEventListener("scroll", scrollListener);
fetchAPI();
