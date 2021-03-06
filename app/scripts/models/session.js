import $ from 'jquery';
import Backbone from 'backbone';
import router from '../router';
// import users from '../collections/users';
import store from '../store';

const Session = Backbone.Model.extend({
    urlRoot: `https://warm-brook-49316.herokuapp.com/sign-in`,
    defaults: {
        username: ''

    },

    parse: function(response) {
      //when data is returned from server, keep track of the things below to pull later
      if (response) {
        return {
          // username: response.username,
          // edit by James, set authtoken, userId, and favorites array for this session
          authtoken: response.auth_token,
          // userId: response._id,
          // favorites: response.favorites

        };
      }
    },

    // will change when BE-FE connection is established
    login: function(username, password) {
        this.save({
            username: username,
            password: password
        }, {
            success: (model, response) => {
                this.unset('password');
                window.localStorage.setItem('authtoken', response.auth_token);
                console.log(localStorage.authtoken);
                router.navigate('truckfeed', {
                    trigger: true
                });
            }
        });
    },
    signup: function(username, password) {
        store.userCollection.create({
            username: username,
            password: password
        }, {
            url: `https://warm-brook-49316.herokuapp.com/sign-up`,
            success: (model, response) => {
                this.unset('password');
                window.localStorage.setItem('authtoken', response.auth_token);
                console.log(response);
                console.log('YOU DID IT!! YOU SIGNED UP!!!');
                router.navigate('truckfeed', {
                    trigger: true
                });
            },
            error: (response) => {
                console.log(response);
                console.log('FAILED TO SIGN UP');
            }
        });
    }
});

export default Session;
