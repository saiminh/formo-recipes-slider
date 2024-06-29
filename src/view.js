const formoRecipeSliders = document.querySelectorAll('.formo-recipe-slider');
formoRecipeSliders.forEach((formoSlider) => {
  const sliderNav = formoSlider.querySelector('.recipe-slider-sliderNav');
  const slides = formoSlider.querySelectorAll('.formo-recipe-slide');
  const duration = formoSlider.getAttribute('data-delay');
  
  slides[0].classList.add('active');
  const delay = duration * 1000;
  let goToNextWithDelay = setInterval(goToNextSlide, delay);

  function goToNextSlide() {
    const activeSlide = formoSlider.querySelector('.active');
    const activeNavButton = formoSlider.querySelector('.button-active');
    let nextSlide = activeSlide.nextElementSibling;
    if ( nextSlide.classList.contains('formo-recipe-slide') === false ) {
      nextSlide = null;
    }
    const nextNavButton = activeNavButton.nextElementSibling;
    if (nextSlide) {
      activeSlide.classList.remove('active');
      nextSlide.classList.add('active');
      activeNavButton.classList.remove('button-active');
      nextNavButton.classList.add('button-active');
    } else {
      activeSlide.classList.remove('active');
      slides[0].classList.add('active');
      activeNavButton.classList.remove('button-active');
      sliderNav.firstElementChild.classList.add('button-active');
    }
  }
  
  slides.forEach((slide, index) => {
    const recipeSliderNavButton = document.createElement('button');
    recipeSliderNavButton.classList.add('recipeSliderNavButton');
    if (index === 0) {
      recipeSliderNavButton.classList.add('button-active');
    }
    recipeSliderNavButton.addEventListener('click', () => {
      clearInterval(goToNextWithDelay);
      goToNextWithDelay = setInterval(goToNextSlide, delay);
      formoSlider.querySelector('.button-active')?.classList.remove('button-active');
      recipeSliderNavButton.classList.add('button-active');
      slides.forEach((slide) => {
        slide.classList.remove('active');
      });
      slide.classList.add('active');
    });
    sliderNav.appendChild(recipeSliderNavButton);
  });
})