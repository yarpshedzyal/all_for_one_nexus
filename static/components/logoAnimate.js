function logoAnimate() {
  let animFolder = document.querySelector(".animFolder");
  let animText = document.querySelector(".animText");
  let shadowAnim = document.querySelector(".shadowAnim");

    // Проверка, прошло ли 7 часов с момента последнего выполнения
    const lastExecutionTime = localStorage.getItem('lastExecutionTime');
    const currentTime = new Date().getTime();
    const oneHourInMilliseconds = 1 * 60 * 60 * 1000;
    // const sevenHoursInMilliseconds = 30 * 1000; // 30сек
  
    if (!lastExecutionTime || currentTime - lastExecutionTime >= oneHourInMilliseconds) {
      // Добавление класса .SVGanimate
      animFolder.setAttribute('data-set', 'SVGanim');
      animText.setAttribute('data-set', 'SVGanim');
      shadowAnim.setAttribute('data-set', 'SVGanim');
  
      // Обновление времени последнего выполнения
      localStorage.setItem('lastExecutionTime', currentTime);
    }
}

export default logoAnimate;