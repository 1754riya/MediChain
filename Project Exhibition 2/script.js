document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    const icon = document.getElementById('toggle-theme');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.textContent = '🌙 '; // Sun icon for light mode
    } else {
        icon.textContent = '🌞'; // Moon icon for dark mode
    }
}); 