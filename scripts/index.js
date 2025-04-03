document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.querySelector(".main__button_edit");
  const modal = document.getElementById("editModal");
  const nameInput = document.getElementById("nameInput");
  const functionInput = document.getElementById("functionInput");
  const saveButton = document.getElementById("saveButton");
  const closeButton = document.getElementById("closeButton");

  const nameElement = document.querySelector(".main__paragraph_name");
  const functionElement = document.querySelector(".main__paragraph_job");

  const galleryContainer = document.querySelector("#gallery");
  const newImagen = document.getElementById("createImg");
  const nameImg = document.getElementById("nameImg");
  const linkImg = document.getElementById("linkImg");
  const saveButtonImg = document.getElementById("saveButtonImg");
  const closeButtonImg = document.getElementById("closeButtonImg");

  const openButton = document.querySelector("#addImg");
  const imagenes = document.querySelectorAll(".element__img");
  const popup = document.getElementById("imgLarge");
  const imagenPopup = document.getElementById("imgPopup");
  const popupParagraph = document.getElementById("paragraphPopup");
  
  const galleryData = [
    {
      title: "Valle de Yosemite",
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
      title: "Lago Louise",
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
      title: "Montañas Calvas",
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
      title: "Latemar",
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
      title: "Parque Nacional de la Vanoise",
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
      title: "Lago di Braies",
      src: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
  ];

  function openEditModal() {
    nameInput.value = nameElement.textContent;
    functionInput.value = functionElement.textContent;
    modal.style.display = "flex";
  }

  function saveProfile() {
    nameElement.textContent = nameInput.value;
    functionElement.textContent = functionInput.value;
    modal.style.display = "none";
  }

  function closeEditModal() {
    modal.style.display = "none";
  }

  function createElement({ src, title }) {
    const element = document.createElement("div");
    element.classList.add("main__gallery-card");

    const img = document.createElement("img");
    img.src =src;
    img.alt = `Imagen de ${title}`;
    img.classList.add("main__gallery-img");
    img.setAttribute("data-title", title);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("popup__button_trash");
    deleteButton.textContent = "🗑️";
    deleteButton.addEventListener("click", () => {
      element.remove();
    });

    const elementItem = document.createElement("div");
    elementItem.classList.add("main__gallery-content");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("main__gallery-paragraph");
    titleElement.textContent = title;

    const heart = document.createElement("div");
    heart.classList.add("main__button_like");
    heart.addEventListener("click", () => {
      heart.classList.toggle("main__button_like_active");
    });

    elementItem.appendChild(titleElement);
    elementItem.appendChild(heart);
    element.appendChild(deleteButton);
    element.appendChild(img);
    element.appendChild(elementItem);

    return element;
  }

  function showImageForm() {
    newImagen.style.display = "flex";
  }

  function handleSaveImageForm(event) {
    event.preventDefault();

    const imageTitle = nameImg.value;
    const imageURL = linkImg.value;

    if (imageTitle && imageURL) {
      const newCard = { title: imageTitle, src: imageURL };
      const newElement = createElement(newCard);
      galleryContainer.prepend(newElement); 
      nameImg.value = "";
      linkImg.value = "";
      newImagen.style.display = "none";
    }
  }

  function closeEditModalImg() {
    newImagen.style.display = "none";
  }

  function showPopup(event) {
    const img = event.target;
    imagenPopup.src = img.src;
    imagenPopup.alt = img.alt;
    popupParagraph.textContent = img.getAttribute("data-title");
    popup.style.display = "flex";
    popupParagraph.style.display = "flex";

    imagenes.forEach((otherImg) => {
      if (otherImg !== img) {
        otherImg.classList.add("activa");
      }
    });

    const closeButton = document.createElement("div");
    closeButton.classList.add("popup__image_close");
    closeButton.textContent = "✖";
    closeButton.addEventListener("click", closePopup);

    popup.appendChild(closeButton);
  }

  function closePopup() {
    popup.style.display = "none";
    popupParagraph.style.display = "none";
    imagenes.forEach((img) => {
      img.classList.remove("activa");
    });
  }

  editButton.addEventListener("click", openEditModal);
  saveButton.addEventListener("click", saveProfile);
  closeButton.addEventListener("click", closeEditModal);
  closeButtonImg.addEventListener("click", closeEditModalImg);
  saveButtonImg.addEventListener("click", handleSaveImageForm);
  openButton.addEventListener("click", showImageForm);

  galleryData.forEach((data) => {
    const newElement = createElement(data);
    galleryContainer.appendChild(newElement);
  });

  
  galleryContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("main__gallery-img")) {
      showPopup(event);
    }
  });

  // Cerrar el popup al hacer clic fuera de la imagen
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup();
    }
  });

  //cerrar el modal
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  //cerrar el modal nueva imagen
  newImagen.addEventListener("click", (event) => {
    if (event.target === newImagen) {
      newImagen.style.display = "none";
    }
  });

});