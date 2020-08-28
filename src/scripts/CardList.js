export class CardList {

  constructor(container, callbackCard) {

    this.container = container;
    this.callbackCard = callbackCard;

  }
 
  addCard(...args) {
    const instance = this.callbackCard(...args);    
    this.container.append(instance);

  }

  render(array) {

    array.forEach(item => {

      this.addCard(item.name, item.link, item._id, item.owner._id, item.likes)

    })

  }

}
