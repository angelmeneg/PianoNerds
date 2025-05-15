/**
 * Game functionality for GuessTheComposer page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Score checking functionality
    const checkScoreBtn = document.getElementById('checkScoreBtn');
    if (checkScoreBtn) {
        checkScoreBtn.addEventListener('click', () => {
            const correct = ['rachmaninoff', 'ravel', 'liszt'];
            let score = 0;
            correct.forEach((ans, i) => {
                const sel = document.querySelector(`input[name="composer${i + 1}"]:checked`);
                if (sel?.value === ans) score++;
            });

            // Update the bubble text
            const scoreBubble = document.getElementById('scoreBubble');
            document.getElementById('scoreText').textContent = `You scored ${score} out of ${correct.length}!`;

            // Show the bubble
            scoreBubble.classList.remove('d-none');

            // Ensure the button is visible in viewport when bubble appears
            const rect = checkScoreBtn.getBoundingClientRect();

            // If button is near the bottom of viewport, scroll to make it more centered
            if (rect.bottom > window.innerHeight - 100) {
                window.scrollBy({
                    top: 100,
                    behavior: 'smooth'
                });
            }

            // Hide the bubble after 5 seconds
            setTimeout(() => {
                scoreBubble.classList.add('d-none');
            }, 5000);
        });
    }

    // Carousel audio control
    const myCarousel = document.getElementById('composerCarousel');
    if (myCarousel) {
        myCarousel.addEventListener('slide.bs.carousel', function () {
            const audios = myCarousel.querySelectorAll('audio');
            audios.forEach(audio => {
                audio.pause();
                audio.currentTime = 0; // (optional) rewind to start
            });
        });
    }
});
