const currentPage = window.location.pathname;

// GSAP Plugin Register
gsap.registerPlugin(ScrollTrigger);

function initializeNavigationAndAnimations() {
    // NAVIGATION SCROLL BEHAVIOR
    window.addEventListener("scroll", function () {
        const nav = document.querySelector(".myNavigation");
        const navOffset = nav.offsetTop;
        nav.classList.add("fixed");
    });

    ScrollTrigger.create({
    trigger: "body",
    start: "top-=10 top",
    onEnter: () => {
        gsap.to(".myNavigation", { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" });
    },
    onLeaveBack: () => {
        gsap.to(".myNavigation", { y: "-100%", opacity: 1, duration: 0.5, ease: "power2.out" });
    }
    });


    // GSAP Animations for Navigation Links
    document.addEventListener("DOMContentLoaded", function () {
        const menuButton = document.querySelector(".menu-button");
        const nav = document.querySelector(".myNavigation");
        const desktopNavContainer = document.getElementById("desktopNavContainer");
        const body = document.body;
        const backgroundContainer = document.getElementById("backgroundContainer");
        const icons = menuButton.querySelector(".icons");
        const icon1 = menuButton.querySelector(".icon1");
        const icon2 = menuButton.querySelector(".icon2");
        const icon3 = menuButton.querySelector(".icon3");

        menuButton.addEventListener("click", function () {
            menuButton.classList.toggle("close");
            body.classList.toggle("menu-open");

            if (menuButton.classList.contains("close")) {
                // Show background images
                backgroundContainer.classList.add("visible");
                nav.classList.add("navanimation");

                // Load desktop.html content
                fetch("desktop.html")
                    .then(response => response.text())
                    .then(data => {
                        desktopNavContainer.innerHTML = data;
                        desktopNavContainer.classList.remove("d-none");
                        document.getElementById("desktopNav").classList.add("active");

                        // Add event listener for close button in desktop.html
                        const closeButton = document.querySelector("#desktopNav .close-button");
                        closeButton.addEventListener("click", function () {
                            document.getElementById("desktopNav").classList.remove("active");
                            menuButton.classList.remove("close");
                            body.classList.remove("menu-open");
                            desktopNavContainer.classList.add("d-none");
                            backgroundContainer.classList.remove("visible");

                            // Restore Original Icon
                            icons.style.transform = "rotate(-45deg)";
                            icon1.style.width = "8px";
                            icon1.style.transform = "none";
                            icon2.style.opacity = "1";
                            icon3.style.width = "9px";
                            icon3.style.transform = "none";
                        });

                        // GSAP Animations for Navigation Links
                        gsap.from("#desktopNav .left-nav .nav-links li", {
                            opacity: 0,
                            x: 100,
                            ease: "power4.out",
                            duration: 3,
                        });
                    });

                // Change to Close Icon
                icons.style.transform = "rotate(0deg)";
                icon1.style.width = "20px";
                icon1.style.transform = "rotate(45deg) translate(5px, 6px)";
                icon2.style.opacity = "0";
                icon3.style.width = "20px";
                icon3.style.transform = "rotate(-45deg) translate(5px, -7px)";
            } else {
                // GSAP Animations for Navigation & Desktop Nav
                gsap.set(["#desktopNav", "#backgroundContainer"], { y: "-150%", autoAlpha: 0 });

                

                // Hide desktop.html content and background images
                document.getElementById("desktopNav").classList.remove("active");
                body.classList.remove("menu-open");
                desktopNavContainer.classList.add("d-none");
                backgroundContainer.classList.remove("visible");
                nav.classList.remove("navanimation");

                // Restore Original Icon
                icons.style.transform = "rotate(-45deg)";
                icon1.style.width = "8px";
                icon1.style.transform = "none";
                icon2.style.opacity = "1";
                icon3.style.width = "9px";
                icon3.style.transform = "none";
            }
        });
    });

    // DYNAMIC BACKGROUND IMAGES
    let currentImageIndex = 0;
    const backgroundImages = document.querySelectorAll("#backgroundContainer .background-image");

    setInterval(() => {
        backgroundImages[currentImageIndex].classList.remove("active");
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        backgroundImages[currentImageIndex].classList.add("active");
    }, 3000);
}

// BOTTOM LAST SLIDERS
function setupBottomLastSliders() {
    gsap.to(".BottomLastSliders .innerSlider", {
        xPercent: -100,
        duration: 15,
        ease: "none",
        repeat: -1,
        yoyo: true
    });
}

if (currentPage.includes("index.html") || currentPage === "/") {
    let myHeader = document.getElementById("header");

    window.addEventListener("scroll", function() {
    if (window.pageYOffset > 695) {
        myHeader.classList.remove("header");
    } else {
        myHeader.classList.add("header");
    }
    });



    // Duplicate Images for Infinite Loop
    function duplicateImages() {
        let sliders = document.querySelectorAll(".slider");
        sliders.forEach(slider => {
            slider.innerHTML += slider.innerHTML; 
        });
    }
    duplicateImages();

    // ✅ Infinite Vertical Scroll for Side Sliders
    gsap.to("#imageSlider", {
        y: "-50%", 
        duration: 25,
        ease: "linear",
        repeat: -1
    });

    gsap.from("#imageSlider2", {
        y: "-50%", 
        duration: 25,
        ease: "linear",
        repeat: -1
    });

    gsap.to("#imageSlider3", {
        y: "-50%", 
        duration: 25,
        ease: "linear",
        repeat: -1
    });

    // Infinite Scroll Effect for Center Slider (Moves Down with Scroll)
    gsap.to("#centerSlider", {
        y: "210%", 
        ease: "linear",
        scrollTrigger: {
            trigger: "#centerSlider",
            start: "top 0",
            end: "bottom 0", 
            scrub: true,  
        }
    });


    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
    // **For Large Screens (Tablets & Desktops)**
    const tl = gsap.timeline({
        scrollTrigger: {
        trigger: ".sliderBottom",
        start: "top bottom",  
        end: "bottom top",
        scrub: 1,
        }
    });

    tl.to({}, { duration: 1.2 });

    tl.fromTo(
        ".sliderBottom h2",
        { scale: 1, autoAlpha: 0, y: -200, ease: "power4.in" },
        { scale: 2.5, autoAlpha: 1, y: 100, ease: "power4.out", duration: 5 }
    );
    });

    mm.add("(max-width: 767px)", () => {
    // **For Small Screens (Mobile Devices)**
    const tl = gsap.timeline({
        scrollTrigger: {
        trigger: ".sliderBottom",
        start: "top bottom",  
        end: "bottom top",
        scrub: 1,
        }
    });

    tl.to({}, { duration: 1 });

    tl.fromTo(
        ".sliderBottom h2",
        { scale: 1, autoAlpha: 0, y: -100, ease: "power4.in" },  // कम height shift
        { scale: 1.7, autoAlpha: 1, y: 50, ease: "power4.out", duration: 3 }  // कम scale और duration
    );
    });

    
    // logo section
    // **GSAP Media Query Setup**

    // **Logo Animation Function**
    function setupLogoAnimation() {
        mm.add("(min-width: 701px)", () => {
            // **Large screen - 400px x 400px**
            return gsap.timeline({
                scrollTrigger: {
                    trigger: ".sliderBottom",
                    start: "top bottom",
                    end: "bottom center",
                    scrub: true
                }
            })
            .to("#logoSection", { autoAlpha: 0, ease: "power3.out", y: 0 }, .3)
            .to("#logoSection img", { width: "400px", height: "400px", ease: "power3.out" }, 0);
        });

        mm.add("(max-width: 700px)", () => {
            // **Small screen - 250px x 250px**
            return gsap.timeline({
                scrollTrigger: {
                    trigger: ".sliderBottom",
                    start: "top bottom",
                    end: "bottom center",
                    scrub: true
                }
            })
            .to("#logoSection", { autoAlpha: 0, ease: "power3.out", y: 0 }, .3)
            .to("#logoSection img", { width: "250px", height: "250px", ease: "power3.out" }, .3);
        });
    }

    // **Run the animation for the first time**
    setupLogoAnimation();

    // **Refresh ScrollTrigger on Resize Event**
    window.addEventListener("resize", function () {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);
    });


    // NAVIGATION SCROLL BEHAVIOR
    window.addEventListener("scroll", function () {
        const nav = document.querySelector(".myNavigation");
        const navOffset = nav.offsetTop;

        if (window.pageYOffset > 1400) {
            nav.classList.add("fixed");
        } else {
            nav.classList.remove("fixed");
        }
    });

    gsap.set(".myNavigation", { y: "-150%", opacity: 0 });

    ScrollTrigger.create({
    trigger: "body",
    start: "top+=1200 top",
    onEnter: () => {
        gsap.to(".myNavigation", { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" });
    },
    onLeaveBack: () => {
        gsap.to(".myNavigation", { y: "-100%", opacity: 0, duration: 0.5, ease: "power2.out" });
    }
    });


    // GSAP Animations for Navigation Links
    document.addEventListener("DOMContentLoaded", function () {
        const menuButton = document.querySelector(".menu-button");
        const nav = document.querySelector(".myNavigation");
        const desktopNavContainer = document.getElementById("desktopNavContainer");
        const body = document.body;
        const backgroundContainer = document.getElementById("backgroundContainer");
        const icons = menuButton.querySelector(".icons");
        const icon1 = menuButton.querySelector(".icon1");
        const icon2 = menuButton.querySelector(".icon2");
        const icon3 = menuButton.querySelector(".icon3");

        menuButton.addEventListener("click", function () {
            menuButton.classList.toggle("close");
            body.classList.toggle("menu-open");

            if (menuButton.classList.contains("close")) {
                // Show background images
                backgroundContainer.classList.add("visible");
                nav.classList.add("navanimation");

                // GSAP Animations for Navigation & Desktop Nav
                gsap.set([".myNavigation", "#desktopNav", "#backgroundContainer"], { y: "-150%", opacity: 0 });

                ScrollTrigger.create({
                trigger: "body",
                start: "top+=1200 top",
                onEnter: () => {
                    gsap.to(".myNavigation", { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" });
                    gsap.to(["#desktopNav", "#backgroundContainer"], { opacity: 1, y: "0%", duration: 0.5, ease: "power2.out" });
                },
                onLeaveBack: () => {
                    gsap.to(".myNavigation", { y: "-100%", opacity: 0, duration: 0.5, ease: "power2.out" });
                    gsap.to(["#desktopNav", "#backgroundContainer"], { opacity: 0, y: "-100%", duration: 0.5, ease: "power2.out" });
                }
                });

                // Load desktop.html content
                fetch("desktop.html")
                    .then(response => response.text())
                    .then(data => {
                        desktopNavContainer.innerHTML = data;
                        desktopNavContainer.classList.remove("d-none");
                        document.getElementById("desktopNav").classList.add("active");

                        // Add event listener for close button in desktop.html
                        const closeButton = document.querySelector("#desktopNav .close-button");
                        closeButton.addEventListener("click", function () {
                            document.getElementById("desktopNav").classList.remove("active");
                            menuButton.classList.remove("close");
                            body.classList.remove("menu-open");
                            desktopNavContainer.classList.add("d-none");
                            backgroundContainer.classList.remove("visible");

                            // Restore Original Icon
                            icons.style.transform = "rotate(-45deg)";
                            icon1.style.width = "8px";
                            icon1.style.transform = "none";
                            icon2.style.opacity = "1";
                            icon3.style.width = "9px";
                            icon3.style.transform = "none";
                        });

                        // GSAP Animations for Navigation Links
                        gsap.from("#desktopNav .left-nav .nav-links li", {
                            opacity: 0,
                            x: 100,
                            ease: "power4.out",
                            duration: 3,
                        });
                    });

                // Change to Close Icon
                icons.style.transform = "rotate(0deg)";
                icon1.style.width = "20px";
                icon1.style.transform = "rotate(45deg) translate(5px, 6px)";
                icon2.style.opacity = "0";
                icon3.style.width = "20px";
                icon3.style.transform = "rotate(-45deg) translate(5px, -7px)";
            } else {
                // GSAP Animations for Navigation & Desktop Nav
                gsap.set(["#desktopNav", "#backgroundContainer"], { y: "-150%", autoAlpha: 0 });

                

                // Hide desktop.html content and background images
                document.getElementById("desktopNav").classList.remove("active");
                body.classList.remove("menu-open");
                desktopNavContainer.classList.add("d-none");
                backgroundContainer.classList.remove("visible");
                nav.classList.remove("navanimation");

                // Restore Original Icon
                icons.style.transform = "rotate(-45deg)";
                icon1.style.width = "8px";
                icon1.style.transform = "none";
                icon2.style.opacity = "1";
                icon3.style.width = "9px";
                icon3.style.transform = "none";
            }
        });
    });

    // DYNAMIC BACKGROUND IMAGES
    let currentImageIndex = 0;
    const backgroundImages = document.querySelectorAll("#backgroundContainer .background-image");

    setInterval(() => {
        backgroundImages[currentImageIndex].classList.remove("active");
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        backgroundImages[currentImageIndex].classList.add("active");
    }, 3000);




    // ABOUT US SLIDER START HERE
    gsap.from("#about .col-lg-5 img", {
    autoAlpha: 0,
    y: 300,
    duration: 2,
    scrollTrigger: {
        trigger: "#about .col-lg-5 img",
        start: "top 80%",  
        toggleActions: "play none none none"
    }
    });

    gsap.to("#about .myProducts", {
    autoAlpha: 1,
    x: 0,
    duration: 2,
    delay: .5,
    scrollTrigger: {
        trigger: "#about .myProducts",
        start: "top 100%",  
        toggleActions: "play none none none"
    }
    });

    // WHO WE ARE SECTION SLIDER START HERE
    gsap.from(".whoWeAre .textcontnt", {
    autoAlpha: 0,
    y: 100,
    duration: 2,
    delay: .5,
    scrollTrigger: {
        trigger: ".whoWeAre .textcontnt",
        start: "top 70%",
        toggleActions: "play none play none"
    }
    });

    // WHAT WE DO SECTION SLIDER START HERE
    gsap.from(".whatWeDo .sideContent h2, .whatWeDo .sideContent p", {
    y:100,
    autoAlpha: 0,
    duration: 2,
    stagger: .6
    });

    gsap.from(".whatWeDo .sideContent .icon-item", {
    y:100,
    autoAlpha: 0,
    duration: 1,
    delay: .5,
    stagger: .3,
    scrollTrigger: {
        trigger: ".whatWeDo .sideContent .icon-item",
        start: "top 80%",
        toggleActions: "play none play none"
    }
    });



    // LEFT TO RIGHT SLIDER ON SCROLL UP AND DOWN
    ScrollTrigger.matchMedia({

    // ✅ Large devices (Desktop + Tablet)
    "(min-width: 768px)": function () {
        // Horizontal Scroll animation
        gsap.to(".items-container", {
            x: "-220vw",
            ease: "power5.inOut",
            scrollTrigger: {
                trigger: ".whatWeAre",
                start: "top top",
                end: "+=4500",
                scrub: 1.4,
                pin: true,
            }
        });

        // Vertical animation for col1 and col2
        const col1 = document.querySelector(".imageContnt3 .col1");
        const col2 = document.querySelector(".imageContnt3 .col2");

        if (col1 && col2) {
        col1.innerHTML += col1.innerHTML;
        col2.innerHTML += col2.innerHTML;

        const moveDistance = col1.offsetHeight / 2;

        gsap.from(col1, {
                y: `-=${moveDistance}`,
                ease: "none",
                duration: 15,
                repeat: -1,
                modifiers: {
                y: (y) => gsap.utils.unitize(val => parseFloat(val) % moveDistance)(y)
            }
        });

        gsap.to(col2, {
                y: `-=${moveDistance}`,
                ease: "none",
                duration: 15,
                repeat: -1,
                modifiers: {
                y: (y) => gsap.utils.unitize(val => parseFloat(val) % moveDistance)(y)
            }
        });
        }
    },

    // ✅ Small devices
    "(max-width: 767px)": function () {
        // Horizontal Scroll animation
        gsap.to(".items-container", {
            x: "-490vw",
            ease: "power5.inOut",
            scrollTrigger: {
                trigger: ".whatWeAre",
                start: "top top",
                end: "+=4000",
                scrub: 2,
                pin: true,
            }
        });

        // Vertical animation for col1 and col2
        const col1 = document.querySelector(".imageContnt3 .col1");
        const col2 = document.querySelector(".imageContnt3 .col2");

        if (col1 && col2) {
            col1.innerHTML += col1.innerHTML;
            col2.innerHTML += col2.innerHTML;

            const moveDistance = col1.offsetHeight / 2;

            gsap.from(col1, {
                y: `-=${moveDistance}`,
                ease: "none",
                duration: 15,
                repeat: -1,
                modifiers: {
                y: (y) => gsap.utils.unitize(val => parseFloat(val) % moveDistance)(y)
                }
            });

            gsap.to(col2, {
                y: `-=${moveDistance}`,
                ease: "none",
                duration: 15,
                repeat: -1,
                modifiers: {
                y: (y) => gsap.utils.unitize(val => parseFloat(val) % moveDistance)(y)
                }
            });
        }
    }
    });



    // We represent the next generation of housewares SECTION ANIMATION START HERE

    gsap.timeline({
    scrollTrigger: {
        trigger: ".headingContent",
        start: "top 80%",  
        end: "bottom 35%",    
        scrub: true
        }
    })
    .fromTo(".headingContent p span", 
    { opacity: 0, scale: 1 }, 
    { opacity: 1, scale: 1.1, duration: 1, stagger: 0.2 }
    )
    .to(".headingContent p span", 
    { opacity: 0, duration: 1, stagger: 0.2 },
    ">");  


    // BOTTOM SECOND LAST SLIDER

    // Register the GSAP ModifiersPlugin (and ScrollTrigger)
    gsap.registerPlugin(ModifiersPlugin);

    const innerSlider = document.getElementById("innerSlider");

    const originalNodes = Array.from(innerSlider.children);
    originalNodes.forEach(node => {
    const clone = node.cloneNode(true);
    innerSlider.appendChild(clone);
    });

    const originalWidth = innerSlider.offsetWidth / 2;


    gsap.to(innerSlider, {
    x: `-=${originalWidth}`,  
    ease: "none",
    duration: 10,              
    repeat: -1,                
    modifiers: {
        x: (x) => {
        const xNum = parseFloat(x);
        
        return gsap.utils.wrap(-originalWidth, 0, xNum) + "px";
        }
    }
    });


    // BOTTOM LAST SLIDERS
    setupBottomLastSliders();


    // Desktop.html CODE START HERE
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".modal-link").forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
            });
        });
    });

    document.getElementById("searchToggle").addEventListener("click", function(event) {
        event.preventDefault();
        
        // Show Search Overlay
        document.getElementById("searchOverlay").style.display = "flex";
        
        // Hide Logo & Search Icon
        document.getElementById("logoContainer").style.display = "none";
        document.getElementById("searchIconContainer").style.display = "none";
    });
    
    document.getElementById("closeSearch").addEventListener("click", function() {
        // Hide Search Overlay
        document.getElementById("searchOverlay").style.display = "none";
        
        // Show Logo & Search Icon Again
        document.getElementById("logoContainer").style.display = "block";
        document.getElementById("searchIconContainer").style.display = "block";
    });

} else if (currentPage.includes("/our_brands.html")) {
    // NAVIGATION SCROLL BEHAVIOR
    initializeNavigationAndAnimations();

    // BOTTOM LAST SLIDERS
    setupBottomLastSliders();

} else if (currentPage.includes("/innovation.html")) {
    // NAVIGATION SCROLL BEHAVIOR
    initializeNavigationAndAnimations();

    gsap.from("#innovation .content-background h2", {
        y: 100,
        duration: 1,
    });

} else if (currentPage.includes("/contact.html")) {
    // NAVIGATION SCROLL BEHAVIOR
    initializeNavigationAndAnimations();

    gsap.from("#contactUs .content-background h2", {
        y: 100,
        duration: 1,
    });
} else {
    document.getElementById("goBack").addEventListener("click", function(event) {
        event.preventDefault();
        history.back();
    });

    // Get elements
    const modal = document.querySelector('.gallery-modal');
    const mainImage = document.querySelector('.gallery-modal-main-image');
    const galleryImages = document.querySelectorAll('.gallery .wrap img'); // Select all gallery images
    const prevButton = document.querySelector('.gallery-modal-prev');
    const nextButton = document.querySelector('.gallery-modal-next');
    const closeButton = document.querySelector('.gallery-modal-close');
    const thumbnailsContainer = document.querySelector('.gallery-modal-thumbnails');

    let currentImageIndex = 0;
    let images = Array.from(galleryImages).map(img => img.src);

    // Open modal when clicking on any gallery image
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            currentImageIndex = index;
            openModal();
        });
    });

    // Open the modal
    function openModal() {
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        updateModal();
        modal.classList.add('active');
    }

    // Close modal
    function closeModal() {
        document.body.style.overflow = ''; // Re-enable scrolling
        modal.classList.remove('active');
    }

    // Close modal when clicking on close button
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking outside of content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navigate to the previous image
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateModal();
    });

    // Navigate to the next image
    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateModal();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch (e.key) {
            case 'ArrowLeft':
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateModal();
                break;
            case 'ArrowRight':
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateModal();
                break;
            case 'Escape':
                closeModal();
                break;
        }
    });

    // Update modal content (main image and thumbnails)
    function updateModal() {
        mainImage.src = images[currentImageIndex];
        mainImage.alt = galleryImages[currentImageIndex].alt || 'Gallery image';

        // Update thumbnails
        thumbnailsContainer.innerHTML = '';
        images.forEach((src, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = src;
            thumbnail.classList.add('gallery-modal-thumbnail');
            if (index === currentImageIndex) {
                thumbnail.classList.add('active');
            }
            thumbnail.addEventListener('click', (e) => {
                e.stopPropagation();
                currentImageIndex = index;
                updateModal();
            });
            thumbnailsContainer.appendChild(thumbnail);
        });
    }
    
    
    // BOTTOM LAST SLIDERS
    setupBottomLastSliders();
}