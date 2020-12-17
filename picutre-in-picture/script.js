const videoElement = document.getElementById('video');
const button = document.getElementById('button');

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadeddata = () => {
      videoElement.hidden = false;
      videoElement.play();
    }
  }
  catch(error) {
    console.log(error);
  }
}


button.addEventListener('click', async () => {
  button.disabled = true;
  await videoElement.requestPictureInPicture();
  button.disabled = false;
});

// On load
selectMediaStream();
