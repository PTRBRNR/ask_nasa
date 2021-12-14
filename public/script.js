let mediaContainer;
let galleryLink;
let galleryContainer;

function fetchNasaApod(search) {
  let fetchURL = `https://api.nasa.gov/planetary/apod?${search.toString()}`;
  return fetch(fetchURL).then(function (response) {
    return response.json();
  });
}

function fetchNasaApodByDate(date) {
  let search = new URLSearchParams();
  search.append("api_key", "6Akv8Fkeubaate5xteBV7UbPMg76c9mR5gSb2aps");
  search.append("date", date);
  return fetchNasaApod(search);
}

function fetchNasaApodByStartDate(startDate) {
  let search = new URLSearchParams();
  search.append("api_key", "6Akv8Fkeubaate5xteBV7UbPMg76c9mR5gSb2aps");
  search.append("start_date", startDate);
  return fetchNasaApod(search);
}

function renderNasaImageFromApi(date) {
  let universalCurrentDate = convertDate(date);
  fetchNasaApodByDate(universalCurrentDate).then(displayMedia);
}

function renderNasaGalleryFromApi(startDate) {
  let universalDate = convertDate(startDate);
  fetchNasaApodByStartDate(universalDate).then(displayGallery);
}

function displayGallery(medias) {
  galleryContainer.innerHTML = "";
  for (let i = 0; i < Math.min(5, medias.length); i++) {
    let img = document.createElement("img");
    img.src = medias[i].hdurl;
    galleryContainer.append(img);
  }
  /*
  for (let media of medias) {
    let img = document.createElement("img");
    img.src = media.hdurl;
    galleryContainer.append(img);
  }*/
}

function displayMedia(media) {
  let mediaTag;
  mediaContainer.innerHTML = "";
  let explanation = document.createElement("div");
  explanation.innerText = media.explanation;

  if (media.media_type === "image") {
    mediaTag = document.createElement("img");
    mediaTag.src = media.hdurl;
  } else {
    mediaTag = document.createElement("iframe");
    mediaTag.type = "text/html";
    mediaTag.width = "640";
    mediaTag.height = "360";
    mediaTag.src = media.url;
  }

  mediaContainer.append(mediaTag, explanation);
}

function convertDate(date) {
  let baseDate = new Date(date);
  return baseDate.toISOString().split("T")[0];
}

function main() {
  galleryLink = document.getElementById("gallery-link");
  galleryContainer = document.getElementById("gallery");
  mediaContainer = document.getElementById("media-container");

  let date = document.getElementById("date");
  date.addEventListener("change", function () {
    renderNasaImageFromApi(Date.parse(date.value));
  });
  galleryLink.addEventListener("click", function (event) {
    event.preventDefault();
    renderNasaGalleryFromApi(Date.parse("2021-12-01"));
  });
  renderNasaImageFromApi(Date.now());
}

window.addEventListener("load", main);
