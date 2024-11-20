function toggleContent(element) {
    const content = element.previousElementSibling;
    content.classList.toggle('collapsed');
    content.classList.toggle('expanded');
    element.textContent = content.classList.contains('collapsed') ? 'See More' : 'See Less';
}
