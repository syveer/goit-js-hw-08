import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items.js';

const listEl = document.querySelector('.gallery');

galleryItems.forEach((item) => {
  const listItemEl = document.createElement('li');
  listItemEl.classList.add('gallery__item');
  listItemEl.innerHTML = `<a class='gallery__link' href='${item.original}'>
        <img class='gallery__image'
        src='${item.preview}'
        data-source='${item.original}'
        alt='${item.description}'/>
    </a>`;
  listEl.append(listItemEl);
});
listEl.addEventListener('click', openImageInLightbox);

function openImageInLightbox(event) {
  const clickedOn = event.target;

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  event.preventDefault();

  const imageSource = event.target.dataset.source;

  const lightbox = basicLightbox.create(
    `<img width='800' height='600' src='${imageSource}'/>`
  );

  lightbox.show();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.close();
    }
  });
}
