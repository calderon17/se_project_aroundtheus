class Section {
  constructor({ renderer, items }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }

  // renderItems() {
  //   this._items.forEach((item) => {
  //     this._renderer(item);
  //   });
  // }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
