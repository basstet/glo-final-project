const docsGallery = () => {
  const docsBlock = document.getElementById('documents');

  const toggleGalleryPopup = event => {
    if (!event.target.closest('.sertificate-document')) {
      return;
    }
    event.preventDefault();

    const modalBtn = event.target.closest('.sertificate-document'),
          imgSrc = modalBtn.getAttribute('href'),
          overlay = document.querySelector('.overlay'),
          popupContent = document.getElementById('docsGallery'),
          imgContainer = popupContent.querySelector('.modal-content'),
          popup = popupContent.closest('.modal--opened');

    imgContainer.innerHTML = `<img src="${imgSrc}" class="img-responsive" alt="">`;
    popup.style.display = 'block';
    overlay.style.display = 'block';
    popupContent.style.display = 'block';

    const closeGalleryPopup = event => {
      if (!event.target.matches('.modal__close, .overlay')) {
        return;
      }
      popup.style.display = 'none';
      overlay.style.display = 'none';
      popupContent.style.display = 'none';
      document.body.removeEventListener('click', closeGalleryPopup);
    };

    document.body.addEventListener('click', closeGalleryPopup);
  };

  docsBlock.addEventListener('click', toggleGalleryPopup);
};

export default docsGallery;
