import '../src/pages/index.css'
import { Api } from './scripts/Api.js';
import { Card } from './scripts/Card.js';
import { CardList } from './scripts/CardList.js';
import { FormValidator } from './scripts/FormValidator.js';
import { Popup } from './scripts/Popup.js';
import { UserInfo } from './scripts/UserInfo.js';


(function () {
  const list = document.querySelector('.places-list');
  const inputName = document.querySelector('.popup__input_type_name');
  const inputLink = document.querySelector('.popup__input_type_link-url');
  const userInfoName = document.querySelector('.user-info__name');
  const jobInfoName = document.querySelector('.user-info__job');
  const inputUserInfoName = document.querySelector('[name="user-name"]');
  const inputUserInfoJob = document.querySelector('[name="job"]');
  const popupImage = document.querySelector('.popup__content-image');
  const placePopup = document.querySelector('.popup_type_place');
  const profilePopup = document.querySelector('.popup_type_profile-edit');


  const errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка',
  }

  // const URL_ENV = process.env.NODE_ENV === "development" ? 'https://nomoreparties.co/cohort11' : 'https://nomoreparties.co/cohort11';





  const placeForm = document.querySelector('.popup__form_type_place');
  const editForm = document.querySelector('.popup__form_type_profile-edit');

  const popupBtn = document.querySelector('.popup__button_add');
  const placeValidator = new FormValidator(placeForm, popupBtn, errorMessages);
  const saveBtn = document.querySelector('.popup__button_save');
  const editValidator = new FormValidator(editForm, saveBtn, errorMessages);

  function handlePlacePopupClose() {
    placeValidator.clearError();
    placeForm.reset();
  }


  function handleEditPopupClose() {
    editValidator.clearError();
    editForm.reset();

  }

  const popupPlace = new Popup(placePopup, handlePlacePopupClose);
  const popupEdit = new Popup(profilePopup, handleEditPopupClose);
  const popupImageFrame = new Popup(document.querySelector('.popup_type_image-popup'));


 const api = new Api();

  function imagePopupCallback(imageLink) {
    popupImage.src = imageLink;
    popupImageFrame.open();
  }

  function createCardCallback(name, link, id, owner) {
    const newCardElem = new Card(name, link, id, owner, imagePopupCallback, api);
    return newCardElem.create();
  }


  const cardList = new CardList(list, createCardCallback);
 

  api.getCards().then(res => {
    cardList.render(res);
  })
    .catch((err) => {
      console.log(err);
    });

  const userInfo = new UserInfo(userInfoName, jobInfoName);





  api.getProfileInfo()
    .then((obj) => {
      userInfo.setUserInfo(obj.name, obj.about);
      userInfo.updateUserInfo();
    })
    .catch((err) => {
      console.log(err);
    });;




  placeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    api.postCards(inputName.value, inputLink.value)
    .then (obj => {
    cardList.addCard(obj.name, obj.link, obj._id, obj.owner._id);
    popupPlace.close();
    })
    .catch((err) => {
      console.log(err);
    });;
  })

  editForm.addEventListener('submit', function (event) {
    event.preventDefault();

    api.editProfileInfo(inputUserInfoName.value, inputUserInfoJob.value)
      .then((obj) => {
        userInfo.setUserInfo(obj.name, obj.about);
        userInfo.updateUserInfo();
        popupEdit.close();

      })
      .catch((err) => {
        console.log(err);
      });;


  })

  // api.deleteCards()
  // .then(() => {
  //   console.log('удоли')
  //   newCardElem.remove();
  // })
  // .catch((err) => {
  //   console.log(err);
  // });;


  document.querySelector('.user-info__menu-button').addEventListener('click', function (event) {

    event.preventDefault();
    const getUserInfo = userInfo.getUserInfo();
    inputUserInfoName.value = getUserInfo.name;
    inputUserInfoJob.value = getUserInfo.job;
    editValidator.setSubmitButtonState(true);
    popupEdit.open();

  })

  document.querySelector('.user-info__button').addEventListener('click', function (event) {
    event.preventDefault();
    placeValidator.setSubmitButtonState();
    popupPlace.open();
  })

  

})();




