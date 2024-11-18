document.querySelectorAll('.menu a').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('menu-toggle').checked = false;
    });
});
