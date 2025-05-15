// Larger font mode toggle functionality

document.addEventListener('DOMContentLoaded', function() {
    // Create the accessibility toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'accessibility-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle larger font mode');
    toggleButton.setAttribute('title', 'Toggle larger font mode');
    toggleButton.setAttribute('tabindex', '0');
    toggleButton.setAttribute('role', 'switch');
    toggleButton.setAttribute('aria-checked', localStorage.getItem('largeFontMode') === 'enabled' ? 'true' : 'false');

    // Add icon to the button
    toggleButton.innerHTML = '<span aria-hidden="true">Aa</span><span class="tooltip-text">Larger Font Mode</span>';

    // Add the button to the body
    document.body.appendChild(toggleButton);

    // Check if larger font mode was previously enabled
    if (localStorage.getItem('largeFontMode') === 'enabled') {
        document.body.classList.add('large-font');
    }

    // Add click event listener to toggle larger font mode
    toggleButton.addEventListener('click', function() {
        if (document.body.classList.contains('large-font')) {
            // Disable larger font mode
            document.body.classList.remove('large-font');
            localStorage.setItem('largeFontMode', 'disabled');
            toggleButton.querySelector('.tooltip-text').textContent = 'Larger Font Mode';
            toggleButton.setAttribute('aria-checked', 'false');
            // Announce to screen readers
            announceToScreenReader('Larger font mode disabled');
        } else {
            // Enable larger font mode
            document.body.classList.add('large-font');
            localStorage.setItem('largeFontMode', 'enabled');
            toggleButton.querySelector('.tooltip-text').textContent = 'Normal Font Size';
            toggleButton.setAttribute('aria-checked', 'true');
            // Announce to screen readers
            announceToScreenReader('Larger font mode enabled');
        }
    });

    // Also add keyboard support for the toggle button
    toggleButton.addEventListener('keydown', function(e) {
        // Toggle on Enter or Space key
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleButton.click();
        }
    });

    // Function to announce changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('role', 'status');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);

        // Remove the announcement after it's been read
        setTimeout(function() {
            document.body.removeChild(announcement);
        }, 1000);
    }
});
