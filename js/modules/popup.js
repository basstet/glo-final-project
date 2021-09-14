const togglePopup = () => {
  const openPopup = event => {
    if (!event.target.matches('.fancyboxModal')) {
      return;
    }
    event.preventDefault();
    const modalBtn = event.target,
          popupContent = document.querySelector(modalBtn.getAttribute('href')),
          popup = popupContent.closest('.modal--opened'),
          overlay = document.querySelector('.overlay');

    popup.style.display = 'block';
    overlay.style.display = 'block';
    popupContent.style.display = 'block';

    const closePopup = event => {
      if (!event.target.matches('.modal__close, .overlay')) {
        return;
      }
      popup.style.display = 'none';
      overlay.style.display = 'none';
      popupContent.style.display = 'none';
      document.body.removeEventListener('click', closePopup);
    };

    document.body.addEventListener('click', closePopup);
  };
  
  document.body.addEventListener('click', openPopup);
};

export default togglePopup;
