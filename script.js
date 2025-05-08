document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const giftBox = document.getElementById('gift-box');
    const giftElement = document.querySelector('.gift');
    const cardContainer = document.getElementById('card-container');
    const bookCover = document.querySelector('.book-cover');
    const spreads = document.querySelectorAll('.book-spread');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    
    // Track current page spread
    let currentSpreadIndex = 0;
    // Track if we're in mobile view
    const isMobile = window.innerWidth < 768;
    
    // If we're on mobile, create additional mobile spreads
    if (isMobile) {
        setupMobileView();
    }
    
    // Open gift box
    giftElement.addEventListener('click', function() {
        // Add animation class to gift
        giftElement.classList.add('gift-open');
        
        // Wait for animation to complete then show the card
        setTimeout(function() {
            // Hide gift box with animation
            giftBox.classList.add('animate__animated', 'animate__fadeOut');
            
            // Wait for gift box to fade out
            setTimeout(function() {
                giftBox.classList.add('d-none');
                
                // Show card container with animation
                cardContainer.classList.remove('d-none');
                cardContainer.classList.add('animate__animated', 'animate__zoomIn');
            }, 500);
        }, 1000);
    });
    
    // Open the book when clicking on it
    bookCover.addEventListener('click', function() {
        // Toggle the opened class to animate the book cover
        bookCover.classList.toggle('opened');
        
        // Add page turning sound effect
        playPageTurnSound();
    });
    
    // Page navigation - Next
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling to card
            
            // Get all visible spreads (standard or mobile based on screen size)
            const visibleSpreads = isMobile ? 
                document.querySelectorAll('.book-spread, .mobile-spread') : 
                document.querySelectorAll('.book-spread');
                
            if (currentSpreadIndex < visibleSpreads.length - 1) {
                // Hide current spread
                visibleSpreads[currentSpreadIndex].classList.add('d-none');
                
                // Show next spread with animation
                currentSpreadIndex++;
                visibleSpreads[currentSpreadIndex].classList.remove('d-none');
                visibleSpreads[currentSpreadIndex].classList.add('page-transition');
                
                // Play page turn sound
                playPageTurnSound();
            }
        });
    });
    
    // Page navigation - Previous
    prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling to card
            
            // Get all visible spreads (standard or mobile based on screen size)
            const visibleSpreads = isMobile ? 
                document.querySelectorAll('.book-spread, .mobile-spread') : 
                document.querySelectorAll('.book-spread');
                
            if (currentSpreadIndex > 0) {
                // Hide current spread
                visibleSpreads[currentSpreadIndex].classList.add('d-none');
                
                // Show previous spread with animation
                currentSpreadIndex--;
                visibleSpreads[currentSpreadIndex].classList.remove('d-none');
                visibleSpreads[currentSpreadIndex].classList.add('page-transition');
                
                // Play page turn sound
                playPageTurnSound();
            }
        });
    });
    
    // Function to play page turning sound
    function playPageTurnSound() {
        const audio = new Audio();
        audio.src = 'https://www.soundjay.com/page-flip-sounds/page-flip-1.mp3';
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Remove animation class after animation completes
    document.querySelectorAll('.book-spread, .mobile-spread').forEach(spread => {
        spread.addEventListener('animationend', function() {
            spread.classList.remove('page-transition');
        });
    });
    
    // Setup mobile view
    function setupMobileView() {
        // Add mobile view class to all spreads
        spreads.forEach(spread => {
            spread.classList.add('mobile-view');
        });
        
        // Create mobile spreads for right pages
        let mobileSpreadContainer = document.querySelector('.book-inner-pages');
        
        // For spread 1 - right page becomes its own mobile spread
        const rightPage1 = document.querySelector('#spread-1 .book-page-right').cloneNode(true);
        createMobileSpread(rightPage1, mobileSpreadContainer, 'mobile-spread-1');
        
        // For spread 2 - right page becomes its own mobile spread
        const rightPage2 = document.querySelector('#spread-2 .book-page-right').cloneNode(true);
        createMobileSpread(rightPage2, mobileSpreadContainer, 'mobile-spread-2');
        
        // Add navigation buttons to mobile spreads
        addNavigationToMobileSpreads();
    }
    
    // Create a mobile spread from a right page
    function createMobileSpread(rightPage, container, id) {
        const mobileSpread = document.createElement('div');
        mobileSpread.classList.add('mobile-spread', 'd-none');
        mobileSpread.id = id;
        
        const mobilePage = document.createElement('div');
        mobilePage.classList.add('book-page-left');
        mobilePage.appendChild(rightPage.querySelector('.page-content').cloneNode(true));
        
        mobileSpread.appendChild(mobilePage);
        container.appendChild(mobileSpread);
    }
    
    // Add navigation buttons to mobile spreads
    function addNavigationToMobileSpreads() {
        // Add navigation to the first mobile spread
        const mobileSpread1 = document.getElementById('mobile-spread-1');
        if (mobileSpread1) {
            const pageContent = mobileSpread1.querySelector('.page-content');
            const navDiv = document.createElement('div');
            navDiv.classList.add('page-nav');
            
            const prevBtn = document.createElement('button');
            prevBtn.classList.add('btn-prev');
            prevBtn.textContent = '← Previous';
            
            const nextBtn = document.createElement('button');
            nextBtn.classList.add('btn-next');
            nextBtn.textContent = 'Next Page →';
            
            navDiv.appendChild(prevBtn);
            navDiv.appendChild(nextBtn);
            pageContent.appendChild(navDiv);
        }
        
        // Add navigation to the second mobile spread
        const mobileSpread2 = document.getElementById('mobile-spread-2');
        if (mobileSpread2) {
            const pageContent = mobileSpread2.querySelector('.page-content');
            const navDiv = document.createElement('div');
            navDiv.classList.add('page-nav');
            
            const prevBtn = document.createElement('button');
            prevBtn.classList.add('btn-prev');
            prevBtn.textContent = '← Previous';
            
            navDiv.appendChild(prevBtn);
            pageContent.appendChild(navDiv);
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth < 768;
        
        // If mobile state changed, reload the page
        if (newIsMobile !== isMobile) {
            location.reload();
        }
    });
    
    // Preload Animation Classes
    const preloadClasses = [
        'animate__fadeOut',
        'animate__zoomIn',
        'page-transition'
    ];
    
    // Create a temporary element to preload animations
    preloadClasses.forEach(function(className) {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.opacity = '0';
        tempDiv.style.pointerEvents = 'none';
        tempDiv.classList.add(className);
        document.body.appendChild(tempDiv);
        
        // Remove after forcing a reflow
        setTimeout(function() {
            document.body.removeChild(tempDiv);
        }, 10);
    });
}); 