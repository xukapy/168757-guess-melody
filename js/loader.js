const SERVER_URL = `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody`;

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then((response)=>{
        return response.json();
      });
  }
/*
  static async loadResults(name = DEFAULT_NAME) {
    const response = await fetch(`${SERVER_URL}/stats/${name}`);
    return response.json();
  }

  static async saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings);
  }
*/
}
