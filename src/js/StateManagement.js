export default class StateManagement {
  constructor(instance, worklog, port) {
    this.editorInstance = instance;
    this.editorWorklog = worklog;
    this.urlServer = `http://localhost:${port}`;
    this.ws = new WebSocket(`ws://localhost:${port}`);
  }

  init() {
    this.editorInstance.init();
    this.editorWorklog.init();

    this.editorInstance.addClickCreate(this.onClickCreate.bind(this));
    this.getInstances();

    this.ws.addEventListener('message', (e) => {
      const obj = JSON.parse(e.data);
      if (obj.status === 'Received') {
        // отрисовать получение команды виджет справа
        this.editorWorklog.drawLog(obj);
      }
      if (obj.status === 'Created') {
        this.editorInstance.addInstance(obj.data);
        this.editorWorklog.drawLog(obj);
      }
    });
  }

  onClickCreate() {
    // Callback - событие click нажатия на создание instance
    this.ws.send(JSON.stringify({ command: 'Create command' }));
  }

  async getInstances() {
    // Получение списка instances от сервера
    const url = `${this.urlServer}/instances/`;
    const response = await fetch(url, {
      method: 'GET',
    });
    const array = await response.json();
    console.log('получили ответ', array);
    for (const obj of array) {
      this.editorInstance.addInstance(obj);
      this.editorWorklog.drawLog(obj);
    }
  }

  getNewFormatDate(timestamp) {
    // возвращает новый формат даты и времени
    let start = new Date(timestamp);
    const year = String(start.getFullYear()).slice(2);
    const month = this._addZero(start.getMonth());
    const date = this._addZero(start.getDate());
    const hours = this._addZero(start.getHours());
    const minutes = this._addZero(start.getMinutes());
    const time = `${date}.${month}.${year} ${hours}:${minutes}`;
    return time;
  }
}
