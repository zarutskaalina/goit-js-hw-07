import { galleryItems } from "./gallery-items.js";
// // Change code below this line

const galleryContainer = document.querySelector(".gallery");
const markupItem = createMarkupItem(galleryItems);

function createMarkupItem(item) {
  return item
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
          <img
            class="gallery__image-original"
            src="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    )
    .join("");
}

galleryContainer.insertAdjacentHTML("beforeend", markupItem);

galleryContainer.addEventListener("click", onClick);

function onClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") return;

  const isItemImage = e.target.classList.contains("gallery__image");
  if (!isItemImage) return;

  const imgUrl = e.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${imgUrl}" width="1280" />`,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscKeyPress);
      },
    }
  );
  instance.show();

  function onEscKeyPress(e) {
    const ESC_KEY_CODE = "Escape";
    const isEscKey = e.code === ESC_KEY_CODE;
    if (!isEscKey) return;
    instance.close();
  }
}
