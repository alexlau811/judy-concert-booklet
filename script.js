// Wait for DOM to be ready
$(document).ready(function() {
    // Initialize flipbook on page load
    initFlipbook();

    // Initialize flipbook
    function initFlipbook() {
        const flipbook = $('#flipbook');

        // Check if turn.js is available
        if (typeof $.fn.turn === 'function') {
            // Disable auto-centering to prevent jumping
            flipbook.turn({
                width: getFlipbookWidth(),
                height: getFlipbookHeight(),
                elevation: 50,
                gradients: true,
                autoCenter: false,  // 防止跳動
                duration: 800,
                display: 'single',  // 單頁模式
                acceleration: true,
                pages: flipbook.children().length,
                when: {
                    turning: function(event, page, view) {
                        // Prevent page jump during turn
                        $('#flipMode').css('min-height', $('#flipbook').height() + 100);
                    },
                    turned: function(event, page) {
                        updatePageNumber(page);
                    }
                }
            });

            // Set minimum height to prevent content shift
            $('#flipMode').css('min-height', $('#flipbook').height() + 150);

            // Initial page number
            updatePageNumber(1);

            // Navigation buttons
            $('#prevPage').click(function() {
                flipbook.turn('previous');
            });

            $('#nextPage').click(function() {
                flipbook.turn('next');
            });

            // Update page number display
            function updatePageNumber(page) {
                const totalPages = flipbook.turn('pages');
                $('#pageNumber').text(page + ' / ' + totalPages);

                // Disable/enable navigation buttons
                $('#prevPage').prop('disabled', page === 1);
                $('#nextPage').prop('disabled', page === totalPages);
            }

            // Handle swipe gestures for mobile
            let touchStartX = 0;
            let touchEndX = 0;

            flipbook.on('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });

            flipbook.on('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Swipe left - next page
                    flipbook.turn('next');
                }
                if (touchEndX > touchStartX + swipeThreshold) {
                    // Swipe right - previous page
                    flipbook.turn('previous');
                }
            }

            // Handle window resize
            $(window).resize(function() {
                const newWidth = getFlipbookWidth();
                const newHeight = getFlipbookHeight();

                flipbook.turn('size', newWidth, newHeight);
            });
        } else {
            console.error('turn.js is not loaded');
            alert('Page flip effect could not be loaded. Please check your internet connection.');
        }
    }

    // Get responsive flipbook dimensions (4:5 ratio to match cover 1080x1350)
    function getFlipbookWidth() {
        const viewportWidth = $(window).width();
        if (viewportWidth < 768) {
            return Math.min(viewportWidth * 0.9, 480);
        }
        return 640;
    }

    function getFlipbookHeight() {
        const viewportWidth = $(window).width();
        if (viewportWidth < 768) {
            // 4:5 ratio: 480 * 1.25 = 600
            return 600;
        }
        // 4:5 ratio: 640 * 1.25 = 800
        return 800;
    }

    // Prevent right-click on flipbook (optional, for a more book-like experience)
    $('#flipbook').on('contextmenu', function(e) {
        e.preventDefault();
    });

    // Handle keyboard navigation
    $(document).keydown(function(e) {
        const flipbook = $('#flipbook');

        // Left arrow or Page Up
        if (e.keyCode === 37 || e.keyCode === 33) {
            flipbook.turn('previous');
            e.preventDefault();
        }
        // Right arrow or Page Down
        else if (e.keyCode === 39 || e.keyCode === 34) {
            flipbook.turn('next');
            e.preventDefault();
        }
        // Home key
        else if (e.keyCode === 36) {
            flipbook.turn('page', 1);
            e.preventDefault();
        }
        // End key
        else if (e.keyCode === 35) {
            flipbook.turn('page', flipbook.turn('pages'));
            e.preventDefault();
        }
    });

    // Loading animation (optional)
    $('body').css('opacity', '0').animate({ opacity: 1 }, 600);
});

// Fallback for browsers without jQuery or turn.js
window.addEventListener('error', function(e) {
    if (e.message.includes('$ is not defined') || e.message.includes('turn')) {
        console.warn('Some libraries failed to load. Page flip effect may not work properly.');
    }
});
