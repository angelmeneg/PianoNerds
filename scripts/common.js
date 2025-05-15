/**
 * Common functionality for all pages of Piano Nerds website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Print functionality
    const printButtons = document.querySelectorAll('.print-button');
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.print();
        });
    });
});
