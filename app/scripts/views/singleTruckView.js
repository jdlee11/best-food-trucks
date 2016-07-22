import $ from 'jquery';
import Backbone from 'backbone';
import store from '../store';

const SingleTruck = Backbone.View.extend({
  initialize: function (id) {
    if (!store.trucksCollection.get(id)) {
      store.trucksCollection.add({id: id}
      );
      //if a user visits the page directly, it will be added to collection so that they may
      //the content of that model
    }
    this.model = store.trucksCollection.get(id);
    console.log(this.model);
    this.model.fetch();
    this.model.on('change', () => {
      //use change when adding
      this.render();
    });
  },

  tagName: 'div',
  className: 'single-truck',
  template: function () {
    return `
    <h2 class="single-truck-name">${this.model.get('name')}</h2>
    <div class="single-truck-container">
    <img class="single-truck-photo" src="${this.model.get('truck_pic')}">
    <div class="single-truck-copy">
    <p class="single-truck-cuisine"><span>Cuisine: </span>${this.model.get('cuisine')}</p>
    <p class="single-truck-dish"><span>Signature Dish: </span>${this.model.get('signature_item')}</p>
    <a href="${this.model.get('yelp_url')}" class="single-truck-yelp"><i class="fa fa-yelp"></i></a>
    </div>
    </div>`;
  },

  //comment section to be added
  // <span class="single-truck-dish">Signature Dish: ${this.model.get('comment')}</span>


  //need to add events for like/vote, delete, editTruck
  //need to add functions for each
  //need icons for each --pull from truck feed view


  render: function () {
    this.$el.html(this.template());
    return this;
  }
});

export default SingleTruck;
