function imgTemplate(image) {
    const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
    return `<li class="gallery-item">
        <a class="gallery-link"
            href="${largeImageURL}">
            <img class="gallery-image"
                src="${webformatURL}"
                alt="${tags}" />
        </a>
        <div class = "gallery-item-info">
                <ul>Likes<li>${likes}</li></ul>
                <ul>Views<li>${views}</li></ul>
                <ul>Comments<li>${comments}</li></ul>
                <ul>Downloads<li>${downloads}</li></ul>
        </div>
    </li>`
}

export function galleryTemplate(images) {
    return images.map(imgTemplate).join("");
}