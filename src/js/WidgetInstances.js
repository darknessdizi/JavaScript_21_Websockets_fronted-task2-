export default class WidgetInstances {
  constructor(conteiner) {
    this.conteiner = conteiner;
    this.field = null;
    this.createListeners = [];
    this.deleteListeners = [];
  }

  init() {
    // Добавляем обработчики событий для элементов
    this.field = this.conteiner.querySelector('.instances-content');
    const link = this.conteiner.querySelector('.instances-link');
    link.addEventListener('click', (event) => this.onClickCreate(event));
    this.field.addEventListener('click', (event) => this.onClickDelete(event));
  }

  addInstance(obj) {
    // Отрисовывает новый instance
    console.log('новый instance', obj);
    const div = WidgetInstances.addTagHTML(this.field, 'instance');
    div.setAttribute('id', obj.id);
    const title = WidgetInstances.addTagHTML(div, 'instance-title');
    title.textContent = obj.id;

    const status = WidgetInstances.addTagHTML(div, 'instance-status');
    const span = WidgetInstances.addTagHTML(status, 'status-header', 'span');
    span.textContent = 'Status:';
    const state = WidgetInstances.addTagHTML(status, 'status-img');
    state.classList.add(obj.state.toLowerCase());
    const spanState = WidgetInstances.addTagHTML(status, 'status-state', 'span');
    spanState.textContent = obj.state;

    const actions = WidgetInstances.addTagHTML(div, 'instance-actions');
    const spanHeader = WidgetInstances.addTagHTML(actions, 'actions-header', 'span');
    spanHeader.textContent = 'Actions:';
    const btnPlay = WidgetInstances.addTagHTML(actions, 'action-run');
    if (obj.state === 'Stopped') {
      btnPlay.classList.add('play');
    } else {
      btnPlay.classList.add('pause');
    }
    WidgetInstances.addTagHTML(actions, 'action-delete');
  }

  deleteInstace(id) {
    // Удаление элементов по id
    const element = document.getElementById(id);
    element.remove();
  }

  static addTagHTML(parent, className = null, type = 'div') {
    // Создает заданный тег и добавляет его в parent
    const div = document.createElement(type);
    div.classList.add(className);
    parent.append(div);
    return div;
  }

  onClickCreate(event) {
    // Нажали кнопку создать instance
    event.preventDefault();
    this.createListeners.forEach((o) => o.call(null, event));
  }

  addClickCreate(callback) {
    // Сохраняет callback создания instance
    this.createListeners.push(callback);
  }

  onClickDelete(event) {
    // Нажали кнопку удалить instance
    event.preventDefault();
    this.deleteListeners.forEach((o) => o.call(null, event));
  }

  addClickDelete(callback) {
    // Сохраняет callback удаления instance
    this.deleteListeners.push(callback);
  }
}
