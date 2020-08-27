export class CardList {

  constructor(container, callbackCard) {

    this.container = container;
    this.callbackCard = callbackCard;

  }

  addCard(name, link, id, owner) {
    const instance = this.callbackCard(name, link, id, owner);

    this.container.append(instance);

  }

  render(array) {

    array.forEach(item => {

      this.addCard(item.name, item.link, item._id, item.owner._id)

    })

  }

}
