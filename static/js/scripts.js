/*!
* Start Bootstrap - Coming Soon v6.0.7 (https://startbootstrap.com/theme/coming-soon)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-coming-soon/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
function handleDragEnter(event) {
    event.preventDefault();
    const uploadZone = document.getElementById("upload-zone");
    uploadZone.classList.add("drag-over");
}

function handleDragLeave(event) {
    event.preventDefault();
    const uploadZone = document.getElementById("upload-zone");
    uploadZone.classList.remove("drag-over");
}

function handleDrop(event) {
    event.preventDefault();
    const uploadZone = document.getElementById("upload-zone");
    uploadZone.classList.remove("drag-over");

    const fileInput = document.getElementById("document");
    if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        if (event.dataTransfer.items[0].kind === "file") {
            const file = event.dataTransfer.items[0].getAsFile();
            fileInput.files = event.dataTransfer.files;
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        fileInput.files = event.dataTransfer.files;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const uploadZone = document.getElementById("upload-zone");
    uploadZone.addEventListener("dragenter", handleDragEnter);
    uploadZone.addEventListener("dragleave", handleDragLeave);
    uploadZone.addEventListener("drop", handleDrop);
});



