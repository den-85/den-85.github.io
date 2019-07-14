import Config from './config'

class Repository {
  static fetch(url) {
    return fetch(url)
      .then((response) => response.json())
  }

  static update(url, payload) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload), // тип данных в body должен соответвовать значению заголовка "Content-Type"
    })
  }
}
