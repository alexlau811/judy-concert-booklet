// Wait for DOM to be ready
$(document).ready(function() {
    let flipbookInitialized = false;
    let currentMode = 'scroll'; // Start with scroll mode

    // Initialize the page
    $('#scrollMode').addClass('active');
    $('#flipMode').removeClass('active');

    // Toggle between scroll and flip modes
    $('#toggleFlip').click(function() {
        if (currentMode === 'scroll') {
            // Switch to flip mode
            currentMode = 'flip';
            $('#scrollMode').removeClass('active');
            $('#flipMode').addClass('active');
            $(this).text('返回滾動模式 / Back to Scroll');

            // Initialize flipbook if not already done
            if (!flipbookInitialized) {
                initFlipbook();
                flipbookInitialized = true;
            }
        } else {
            // Switch to scroll mode
            currentMode = 'scroll';
            $('#flipMode').removeClass('active');
            $('#scrollMode').addClass('active');
            $(this).text('啟用掀頁效果 / Enable Page Flip');
        }
    });

    // Initialize flipbook
    function initFlipbook() {
        const flipbook = $('#flipbook');

        // Check if turn.js is available
        if (typeof $.fn.turn === 'function') {
            flipbook.turn({
                width: getFlipbookWidth(),
                height: getFlipbookHeight(),
                elevation: 50,
                gradients: true,
                autoCenter: true,
                duration: 1000,
                pages: flipbook.children().length,
                when: {
                    turned: function(event, page) {
                        updatePageNumber(page);
                    }
                }
            });

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

    // Get responsive flipbook dimensions
    function getFlipbookWidth() {
        const viewportWidth = $(window).width();
        if (viewportWidth < 768) {
            return Math.min(viewportWidth * 0.9, 480);
        }
        return 600;
    }

    function getFlipbookHeight() {
        const viewportWidth = $(window).width();
        if (viewportWidth < 768) {
            return 640;
        }
        return 800;
    }

    // Smooth scroll for scroll mode
    $('a[href^="#"]').click(function(e) {
        if (currentMode === 'scroll') {
            e.preventDefault();
            const target = $(this.hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 20
                }, 600);
            }
        }
    });

    // Prevent right-click and text selection on flip mode (optional, for a more book-like experience)
    $('#flipbook').on('contextmenu', function(e) {
        if (currentMode === 'flip') {
            e.preventDefault();
        }
    });

    // Handle keyboard navigation in flip mode
    $(document).keydown(function(e) {
        if (currentMode === 'flip' && flipbookInitialized) {
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
        }
    });

    // Loading animation (optional)
    $('body').css('opacity', '0').animate({ opacity: 1 }, 600);
});

// Fallback for browsers without jQuery or turn.js
window.addEventListener('error', function(e) {
    if (e.message.includes('$ is not defined') || e.message.includes('turn')) {
        console.warn('Some libraries failed to load. Falling back to scroll mode only.');
        document.getElementById('toggleFlip').style.display = 'none';
    }
});
