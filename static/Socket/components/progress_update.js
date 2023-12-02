import SocketGet from "../modules/SocketGet.js";
import ui_progress from "../UI/ui_progress.js";
function progress_update(socket, url, text) {
  socket.on(url, async (res) => {
    let ProgressInformation = document.querySelector("#ProgressInformation"); 
    if (res.progress) {
      if (ProgressInformation.children.length === 0) {
        ui_progress(res, text);
      } else {
        let progressBlock = document.querySelectorAll(".progressBlock"); 

        // Используем флаг для отслеживания, найден ли существующий блок
        let blockFound = false;

        progressBlock.forEach((thisBlock) => {
          if (thisBlock.dataset.category === res.category) {
            blockFound = true;

            let textProgress = document.querySelectorAll(".textProgress");
            let progressBar = document.querySelectorAll(".progressBar");
            textProgress.forEach((thisText) => {
              if (thisText.dataset.category === res.category) {
                thisText.textContent = (res.message !== undefined ? `${res.message}` : `${res.progress}%`);
              }
            });

            progressBar.forEach((thisBar) => {
              if (thisBar.dataset.category === res.category) {
                if (res.progress !== 100) {
                  thisBar.classList.add("progress-bar-animated");
                  thisBar.classList.remove("bg-success");
                }
                if (thisBar.role === "progressbar") {
                  thisBar.style.width = `${res.progress}%`;
                  thisBar.ariaValueNow = res.progress;
                  if (res.progress >= 100) {
                    thisBar.classList.add("bg-success");
                  } else if (res.progress <= 0) {
                    thisBar.attributes.style.value = `"width: 0%"`;
                    thisBar.ariaValueNow = 0;
                  }
                }
              }
            });
          }
        });

        // Если не найден существующий блок, создаем новый
        if (!blockFound) {
          ui_progress(res, text);
        }
      }
    }
  });
}


export default progress_update;