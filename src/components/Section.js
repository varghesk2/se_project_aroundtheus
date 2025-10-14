export default class Section {
  constructor({items, renderer}, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._class = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._class.prepend(element);
  }
}
