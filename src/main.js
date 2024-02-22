import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from './js/pixabay-api';
import { galleryTemplate } from './js/render-functions';

const refs = {
    formElem: document.querySelector(".form"),
    galleryElem: document.querySelector(".gallery"),
    loaderElem: document.querySelector(".loader"),
    loadMoreBtnElem: document.querySelector(".load-more-btn"),
}
let userQuery;
let page;
let maxPage;

const lightbox = new SimpleLightbox(".gallery-link", { captionsData: "alt", captionDelay: 250 });

refs.formElem.addEventListener("submit", onFormSubmit);
refs.loadMoreBtnElem.addEventListener("click", onLoadMoreBtnClick);

async function onFormSubmit(event) {
    event.preventDefault();
    refs.galleryElem.innerHTML = "";
    page = 1;
    maxPage = 0;
    checkBtnVisibleStatus();
    userQuery = event.target.elements.query.value.trim();
    event.target.reset();
    if (!userQuery) {
        showError("Please enter a search query");
        return;
    }
    showLoader();
    try {
        const data = await fetchImages(userQuery, page);
        if (data.hits.length === 0) {
            showError("Sorry, there are no images matching your search query. Please try again!"); 
        }
        maxPage = Math.ceil(data.totalHits / 15);
        renderGallery(data.hits);
    } catch (err) {
        showError(err.message);
        maxPage = 0;
        refs.galleryElem.innerHTML = "";
    }
    hideLoader();
    checkBtnVisibleStatus()
}

async function onLoadMoreBtnClick() {
    page += 1;
    hideLoadMoreBtn();
    showLoader();
    const data = await fetchImages(userQuery, page);
    renderGallery(data.hits);
    hideLoader();
    checkBtnVisibleStatus();

    const height = refs.galleryElem.firstElementChild.getBoundingClientRect().height * 2;
    scrollBy({
        behavior: "smooth",
        top: height,
    });
}

function renderGallery(data) {
    const markup = galleryTemplate(data);
    refs.galleryElem.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
}
function showLoadMoreBtn() {
    refs.loadMoreBtnElem.classList.remove("visually-hidden");
}
function hideLoadMoreBtn() {
    refs.loadMoreBtnElem.classList.add("visually-hidden");
}
function checkBtnVisibleStatus() {
    if (page === maxPage) {
        showMessage("We're sorry, but you've reached the end of search results.");
        hideLoadMoreBtn();
    } else if (page >= maxPage) {
        hideLoadMoreBtn();
    } else {
        showLoadMoreBtn();
    }
}
function showLoader() {
    refs.loaderElem.classList.remove("visually-hidden");
}
function hideLoader() {
    refs.loaderElem.classList.add("visually-hidden");
}
function showError(err) {
    iziToast.error({
        title: "",
        message: err,
        position: 'topCenter',
    });
}
function showMessage(message) {
    iziToast.show({
        title: "",
        message: message,
        position: 'bottomCenter',
    });
}