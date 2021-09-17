const reviews = () => {
  const errorMessage = `Что-то пошло не так...`,
        statusMessage = document.createElement('div'),
        jsonSrc = './comments.json',
        reviewsSect = document.getElementById('reviews'),
        commentsCont = reviewsSect.querySelector('.comments-container');

  // прелоадер:
  statusMessage.className = 'status-message';
  statusMessage.innerHTML = `<div class="sk-double-bounce">
      <div class="sk-child sk-double-bounce-1"></div>
      <div class="sk-child sk-double-bounce-2"></div>
    </div>`;

  commentsCont.append(statusMessage);

  // создание блоков комментариев:
  let commentColor = 'green',
      commentPosition = 'left',
      commentCounter = 0;

  const createCommentBlock = (image, author, comment) => {
    // если нет фото:
    if (!image) image = 'ava.jpg';

    // верстка блока комментария:
    const commentBlock = document.createElement('div'),
          imgHtml = `
            <div class="col-xs-3 col-sm-2">
              <div class="review-user">
                <img src="images/users/${image}" alt="" class="img-responsive avatar">
              </div>
            </div>
          `,
          textHtml = `
            <div class="col-xs-9 col-sm-9">
              <div class="review-inner review-${commentColor} review-arrow review-arrow-${commentPosition}">
                <p class="text-normal">${author}</p>
                <p>${comment}</p>
              </div>
            </div>
          `;
    commentBlock.className = 'row comment-item';

    // расположение блока:
    if (commentPosition === 'right') {
      commentBlock.innerHTML = `${textHtml}${imgHtml}`;
      commentPosition = 'left';
    } else {
      commentBlock.innerHTML = `${imgHtml}${textHtml}`;
      commentPosition = 'right';
    }

    // цвет блока:
    if (commentColor === 'green') {
      commentColor = 'gray';
    } else if (commentColor === 'gray') {
      commentColor = 'orange';
    } else if (commentColor === 'orange') {
      commentColor = 'green';
    }

    // вставка блока с комментарием:
    commentsCont.append(commentBlock);
  };

  // отправка запроса на сервер:
  fetch(jsonSrc)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('response status is not 200');
      }
      return (response.json());
    })
    .then(data => {
      commentsCont.innerHTML = '';
      data.comments.forEach((item, index) => {
        if (index < 3) {
          const {image, author, comment} = item;
          createCommentBlock(image, author, comment);
        }
      });
      commentCounter++;
    })
    .catch(error => {
      statusMessage.innerHTML = errorMessage;
      console.error(error);
    });

  // повтор запроса каждые 20 секунд:
  setInterval(() => {
    fetch(jsonSrc)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('response status is not 200');
        }
        return (response.json());
      })
      .then(data => {
        commentsCont.innerHTML = '';
        if (commentCounter > (data.comments.length - 3)) {
          commentCounter = 0;
        }
        data.comments.forEach((item, index) => {
          if (index < (3 + commentCounter) && index >= commentCounter) {
            const {image, author, comment} = item;
            createCommentBlock(image, author, comment);
          }
        });
        commentCounter++;
      })
      .catch(error => {
        statusMessage.innerHTML = errorMessage;
        console.error(error);
      });
  }, 20000);
};

export default reviews;
