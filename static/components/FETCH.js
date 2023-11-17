async function FETCH(url, data) {
  const URL = `${window.location.origin}${url}`
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const json = await response.json(); 
    console.log('POST request successful:', json);
    return json;
  } catch (error) {
    console.error('POST request failed:', error);
  }
}

export default FETCH;