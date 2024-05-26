class Section {
  constructor({ renderer /*, items*/ }, containerSelector) {
    this._renderer = renderer;
    // this._items = items;
    this._container = document.querySelector(`.${containerSelector}`);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

export default Section;
