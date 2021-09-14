class Carousel {
  constructor({
    main,
    wrap,
    prev,
    next,
    slidesToShow = 3,
    position = 0,
    infinity = false,
    responsive = []
  }) {
    // элементы:
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = this.wrap.children;
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    // опции:
    this.slidesToShow = slidesToShow;
    this.slideWidth = Math.floor(100 / this.slidesToShow);
    this.maxPosition = this.slides.length - this.slidesToShow;
    this.position = position;
    this.infinity = infinity;
    this.responsive = responsive;
  }

  init() {
    this.addStyleClass();
    this.addStyle();
    this.controlSlider();
    if (this.responsive) {
      this.responseInit();
    }
  }

  addStyleClass() {
    this.main.classList.add('glo-carousel');
    this.wrap.classList.add('glo-carousel_wrap');
    for (const item of this.slides) {
      item.classList.add('glo-carousel_item');
    }
  }

  addStyle() {
    let style = document.getElementById('carousel-style');
    
    if (!style) {
      style = document.createElement('style');
      style.id = 'carousel-style';
    }
    style.textContent = `
      .glo-carousel {
        overflow: hidden;
        position: relative;
      }
      .glo-carousel_wrap {
        display: flex;
        transition: transform 0.5s;
        will-change: transform;
      }
      .glo-carousel_item {
        display: flex;
        align-items: center;
        flex-direction: column;
        max-width: 100%;
      }
    `;
    document.head.append(style);

    for (const item of this.slides) {
      item.style.flex = `0 0 ${this.slideWidth}%`;
    }
  }

  prevSlide() {
    if (this.infinity || this.position > 0) {
      --this.position;
      if (this.position < 0) {
        this.position = this.maxPosition;
      }
      this.wrap.style.transform = `translateX(-${this.position * this.slideWidth}%)`;
    }
  }

  nextSlide() {
    if (this.infinity || this.position < this.maxPosition) {
      ++this.position;
      if (this.position > this.maxPosition) {
        this.position = 0;
      }
      this.wrap.style.transform = `translateX(-${this.position * this.slideWidth}%)`;
    }
  }

  controlSlider() {
    this.prev.addEventListener('click', this.prevSlide.bind(this));
    this.next.addEventListener('click', this.nextSlide.bind(this));
  }

  responseInit() {
    const slidesToShowDefault = this.slidesToShow,
          allResponse = this.responsive.map(item => item.breakpoint),
          maxResponse = Math.max(...allResponse);

    const renderResponse = slToShow => {
      this.slideWidth = Math.floor(100 / slToShow);
      this.addStyle();
      this.maxPosition = this.slides.length - slToShow;
    };

    const checkResponse = () => {
      const widthWindow = document.documentElement.clientWidth;

      if (widthWindow < maxResponse) {
        for (let i = 0; i < allResponse.length; i++) {
          if (widthWindow < allResponse[i]) {
            this.slidesToShow = this.responsive[i].slidesToShow;
            renderResponse(this.slidesToShow);
          }
        }
      } else {
        this.slidesToShow = slidesToShowDefault;
        renderResponse(this.slidesToShow);
      }
    };

    checkResponse();
    window.addEventListener('resize', checkResponse);
  }
}

export default Carousel;
