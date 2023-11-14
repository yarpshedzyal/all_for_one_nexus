async function fetch_data() {
  try {
    // Получаем URL-адрес API 
    let Pages = window.location.search;
    let location = "";
    if(Pages !== "" && Pages.split("?").join("").split("=").indexOf("page") !== -1){
      location = `${window.location.origin}/fetch_data${Pages}`
    }else{
      location =  `${window.location.origin}/fetch_data`
    }
    const url = location;
 
    // Создаем запрос
    const request = new Request(url);

    // Отправляем запрос и ждем ответа
    const response = await fetch(request);

    // Проверяем статус ответа
    if (response.status === 200) {
      // Возвращаем данные
      const data = await response.json(); 
      console.log(data);
      return data;
    } else {
      // Возвращаем ошибку
      return Promise.reject(new Error(response.statusText));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // Можете обработать ошибку здесь и вернуть соответствующий результат
    return Promise.reject(error);
  }
} 
export default fetch_data;