const scrollTop = () => {
  const scrollBtn = document.querySelector('.smooth-scroll'),
        secondSection = document.getElementById('services');

  window.addEventListener('scroll', () => {
    const secondSectionCoor = secondSection.getBoundingClientRect().top;

    if (secondSectionCoor <= 0) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  });
};

export default scrollTop;
