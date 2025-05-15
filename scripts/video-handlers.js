/**
 * Video handlers for Piano Nerds website
 * Handles both HTML5 video and YouTube iframe videos
 */

// Common function to check if an element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -rect.height / 2 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight + rect.height / 2 &&
    rect.right <= window.innerWidth
  );
}

// Throttle function to limit how often a function runs
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// HTML5 Video Handler
document.addEventListener('DOMContentLoaded', function () {
  // Get the HTML5 video element
  const videoElement = document.querySelector('video');

  if (videoElement) {
    // Function to check visibility and pause video if needed
    function checkVideoVisibility() {
      if (!isInViewport(videoElement) && !videoElement.paused) {
        videoElement.pause();
      }
    }

    // Add scroll event listener with throttling
    window.addEventListener('scroll', throttle(function () {
      window.requestAnimationFrame(checkVideoVisibility);
    }, 250), { passive: true });
  }
});

// YouTube Video Handler
// Load YouTube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Store YouTube players
var players = {};

// Called when YouTube API is ready
function onYouTubeIframeAPIReady() {
  // Get all YouTube iframes
  const youtubeIframes = document.querySelectorAll('iframe[src*="youtube.com/embed"]');

  youtubeIframes.forEach((iframe, index) => {
    // Get the video ID from the src attribute
    const src = iframe.src;
    const match = src.match(/embed\/([^?]+)/);

    if (match && match[1]) {
      const videoId = match[1];
      const playerId = 'youtube-player-' + index;

      // Set an ID on the iframe for the YouTube API to target
      iframe.id = playerId;

      // Create a YouTube player for this iframe
      players[playerId] = new YT.Player(playerId, {
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
    }
  });

  // Initial check for videos in viewport
  checkVisibility();
}

// Handle player state changes
function onPlayerStateChange(event) {
  // If a video starts playing, pause any other videos that might be playing
  if (event.data === YT.PlayerState.PLAYING) {
    const currentPlayerId = event.target.getIframe().id;

    Object.keys(players).forEach(playerId => {
      if (playerId !== currentPlayerId && players[playerId].getPlayerState() === YT.PlayerState.PLAYING) {
        players[playerId].pauseVideo();
      }
    });
  }
}

// Function to check visibility and pause/play videos accordingly
function checkVisibility() {
  Object.keys(players).forEach(playerId => {
    const iframe = document.getElementById(playerId);

    if (iframe && players[playerId]) {
      if (!isInViewport(iframe)) {
        // If the player exists and is playing, pause it
        if (players[playerId].getPlayerState && players[playerId].getPlayerState() === YT.PlayerState.PLAYING) {
          players[playerId].pauseVideo();
        }
      }
    }
  });
}

// Add scroll event listener with throttling
window.addEventListener('scroll', throttle(function () {
  window.requestAnimationFrame(checkVisibility);
}, 250), { passive: true });

// Also check on window resize
window.addEventListener('resize', throttle(function () {
  window.requestAnimationFrame(checkVisibility);
}, 250), { passive: true });
