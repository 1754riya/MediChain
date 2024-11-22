 // Sample doctors data
 const doctors = [
    {
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        experience: 15,
        rating: 4.8,
        image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
        name: "Dr. Michael Chen",
        specialty: "Pediatrician",
        experience: 12,
        rating: 4.9,
        image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
        name: "Dr. Emily Clark",
        specialty: "Neurologist",
        experience: 10,
        rating: 4.7,
        image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
        name: "Dr. James Wilson",
        specialty: "Dentist",
        experience: 8,
        rating: 4.6,
        image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    },
    {
        name: "Dr. Maria Rodriguez",
        specialty: "ENT Specialist",
        experience: 20,
        rating: 4.9,
        image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
    }
];

// Updated search functionality
function searchDoctors(searchTerm) {
    return doctors.filter(doctor => {
        return doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No doctors found</p>';
        return;
    }

    const tableHTML = `
        <table class="doctors-table">
            <thead>
                <tr>
                    <th>Doctor</th>
                    <th>Specialty</th>
                    <th>Experience</th>
                    <th>Rating</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${results.map(doctor => `
                    <tr>
                        <td>
                            <div class="doctor-info">
                                <img src="${doctor.image}" alt="${doctor.name}">
                                <span>${doctor.name}</span>
                            </div>
                        </td>
                        <td>${doctor.specialty}</td>
                        <td>${doctor.experience} years</td>
                        <td>⭐ ${doctor.rating}</td>
                        <td><button class="book-btn" onClick="window.location.href = '/Doctor/index.html'" >Book Now</button></td>
                    ;
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    resultsContainer.innerHTML = tableHTML;
}

// Add click handlers for specialty tags
document.querySelectorAll('.specialty-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        const specialty = tag.textContent.trim();
        document.querySelector('.search-input').value = specialty;
        const results = searchDoctors(specialty);
        displayResults(results);
    });
});

// Add search functionality
const searchInput = document.querySelector('.search-input');
const locationInput = document.querySelector('.location-input');
const specialtyTags = document.querySelectorAll('.specialty-tag');

searchInput.addEventListener('input', (e) => {
    const results = searchDoctors(e.target.value);
    displayResults(results);
});

// Add this script at the end of body
document.addEventListener('DOMContentLoaded', () => {
    const specialtyTags = document.querySelectorAll('.specialty-tag');

    specialtyTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            specialtyTags.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tag
            tag.classList.add('active');

            // Extract the specialty name (assuming it's the last word)
            const specialty = tag.textContent.trim();

            // Perform the search and display results
            const results = searchDoctors(specialty);
            displayResults(results);
        });
    });
});