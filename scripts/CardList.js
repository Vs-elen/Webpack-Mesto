class CardList {

  constructor(container, callbackCard) {

    this.container = container;
    this.callbackCard = callbackCard;

  }

  addCard(name, link) {
    const instance = this.callbackCard(name, link);

    this.container.append(instance);

  }

  render(array) {

    array.forEach(item => {

      this.addCard(item.name, item.link)

    })

  }

}
