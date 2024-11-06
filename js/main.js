const slider = document.querySelector(".slides");

const slide = document.querySelectorAll(".slide");

let currentSlide = 0;

const imgWidth = 800;

const prevBtn = document.querySelector(".btn__prev");

const nextBtn = document.querySelector(".btn__next");

const navButtons = document.querySelectorAll(".btn");

const autoBtn = document.querySelector(".btn__auto");

let lastClickTime = 0;



function updateSlider() {
    if (currentSlide >= slide.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slide.length - 1; 
    slider.style.transform = `translateX(-${currentSlide * imgWidth}px)`;

    navButtons.forEach((button, index) => {
        if (index === currentSlide) button.classList.add("active");
        else button.classList.remove("active"); 
    });
};



function nextSlide() {
    const currentTime = Date.now();
    if(currentTime - lastClickTime >= 2500) {
        currentSlide++;
        updateSlider();
        lastClickTime = currentTime; 
    };
};

function previousSlide() {
    const currentTime = Date.now();
    if(currentTime - lastClickTime >= 2500) {
        currentSlide--;
        updateSlider();
        lastClickTime = currentTime;
    };
};



nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", previousSlide);



(function autoPlay() {
    let interval = null;

    function nextSlideAuto() {
        currentSlide++;
        updateSlider();
    };
    

    function checkAutoPlay(isChecked) {
        if (isChecked) interval = setInterval(nextSlideAuto, 5000);
        else {
            clearInterval(interval);
            interval = null;
        };
    };

    autoBtn.addEventListener("change", (event) => {
        checkAutoPlay(event.target.checked);
    });
})();



document.addEventListener("keydown", (event) => {
    if(event.key === "ArrowRight" || event.key === "6") nextSlide();
    if(event.key === "ArrowLeft" || event.key === "4") previousSlide();
});



(function enableTouchNavigation() {

    let startPositionX = 0; 
    let endPositionX = 0;   

    slider.addEventListener("touchstart", (event) => {
        startPositionX = event.touches[0].clientX;
    });

    slider.addEventListener("touchmove", (event) => {
        endPositionX = event.touches[0].clientX;
    });

    slider.addEventListener("touchend", () => {
        const subtractionX = endPositionX - startPositionX; 

        if (Math.abs(subtractionX) > 100) { //Math.abs() повертає модуль числа
            if (subtractionX > 0) previousSlide();
            else nextSlide(); 
        };
        
        startPositionX = 0;
        endPositionX = 0;
    });
})();



function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
};

navButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        goToSlide(index);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    updateSlider();
});