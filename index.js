function imageListener() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('click', event => {
            listenToAllImageClicks(event, img);
        });
      if (!img.classList.contains('musician-image')) {
        img.addEventListener('mouseover', (event) => {
            imageExpand(event, img); 
        });
        img.addEventListener('mouseout', (event) => {
            resetImageExpand(event, img); 
        });
      }
      else{
        img.addEventListener('mouseover', (event) => {
            imageLighten(event, img); 
        });
        img.addEventListener('mouseout', (event) => {
            imageDarken(event, img); 
        });
      }
    });

}

function listenToAllImageClicks(event, image){
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '1000';
    overlay.style.animation = 'fadeIn 0.3s ease';

    // Create image
    const enlargedImg = document.createElement('img');
    enlargedImg.src = image.src;
    enlargedImg.alt = image.alt;
    enlargedImg.style.maxWidth = '90%';
    enlargedImg.style.height= '70vh';
    enlargedImg.style.borderRadius = '10px';
    enlargedImg.style.boxShadow = '0 0 20px rgba(255,255,255,0.4)';
    enlargedImg.style.transition = 'transform 0.3s ease';
    enlargedImg.style.transform = 'scale(1.05)';

    // Bar for caption

    const captionBar = document.createElement('div');
    captionBar.id= 'caption-bar';

    //caption stuff
    const caption = document.createElement('p');
    caption.textContent = image.alt; //Get the alt text for the specific image
    caption.style.color = 'wheat';
    caption.style.marginTop = '20px';
    caption.style.fontSize = '2em';
    captionBar.appendChild(caption);

    // put to the overlay
    overlay.appendChild(enlargedImg);
    overlay.appendChild(captionBar);

    // Close on overlay click
    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    document.body.appendChild(overlay);
};

function imageExpand(event, image) {
    image.style.transition = 'transform 0.3s ease';
    image.style.transform = 'scale(1.2)';
}

function resetImageExpand(event, image) {
    image.style.transition = 'transform 0.3s ease';
    image.style.transform = 'scale(1)';
}

function imageLighten(event, image) {
    image.style.transition = 'filter 0.3s ease';
    image.style.transform = 'brightness(1.2)';
}

function imageDarken(event, image) {
    image.style.transition = 'filter 0.3s ease';
    image.style.transform = 'brightness(0.8)';
}


// Call the imageListener to set up the event listeners
imageListener();