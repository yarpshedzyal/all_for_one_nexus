import FETCH from "./FETCH.js";
import SocketGet from "../Socket/modules/SocketGet.js";
import SocketPost from "../Socket/modules/SocketPost.js";

// Assuming you have the correct socket instance
// Assuming you have the correct socket instance
function ProgressBar(socket) {
  let progressBlock = document.querySelector("#progressBlock");
  let progressBar = document.querySelector("#progressBar");
  let textProgress = document.querySelector("#textProgress");
  document.querySelector("#parse-all-delivery-prices-button").addEventListener("click", () => { 
    progressBar.ariaValueNow = 0; 
    textProgress.textContent = `0%`;
    progressBar.attributes.style.value = `"width: 0%"`;
    progressBlock.classList.add("progress-bar-animated");
    progressBar.classList.add("progress-bar-animated");
    progressBar.classList.remove("bg-success");
 
    // FETCH("/test_progress");
    SocketPost(socket,"test_progress");
  }); 
  socket.on('progress_update', (res) => {
    if (progressBar.classList.contains('progress-bar-animated') === false && progressBlock.classList.contains('progress-bar-animated') === false) {
      progressBlock.classList.add("progress-bar-animated");
      progressBar.classList.add("progress-bar-animated");
    }
    if(res.progress === 100){ 
      progressBar.classList.add("bg-success");
    }
    progressBar.ariaValueNow = res.progress;
    textProgress.textContent = `${res.progress}%`; 
    progressBar.style.width = `${res.progress}%`;
  }); 
}



export default ProgressBar;