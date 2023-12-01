function ui_progress(data) { 
  let ProgressInformation = document.querySelector('#ProgressInformation');
  ProgressInformation.insertAdjacentHTML("beforeend", ` 
  <div class="d-flex flex-column progressBlock" data-category="${data.category}">
    <div>
      <p>
        <strong>Progress</strong>
        Parse: <b class="textProgress" data-category="${data.category}">${data.progress}%</b>
      </p>
    </div>
    <div class="progress progress-bar-striped bg-warning progressBar progress-bar-animated" data-category="${data.category}">
      <div class="progress-bar progress-bar-striped progressBar progress-bar-animated" data-category="${data.category}" role="progressbar"
        aria-valuenow="${data.progress}" aria-valuemin="0" aria-valuemax="100" style="width: ${data.progress}%"></div>
    </div>
  </div>
  `);
}

export default ui_progress;