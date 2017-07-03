const SERVER_URL = `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody`;
const USER_NAME = `xukapy`;

export default class Loader {

  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then((response)=>{
        return response.json();
      });
  }

  static loadResults() {
    return fetch(`${SERVER_URL}/stats/${USER_NAME}`)
      .then((response)=>{
        return response.json();
      })
      .catch(()=>[]);
  }

  static saveResults(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${USER_NAME}`, requestSettings);
  }

}
