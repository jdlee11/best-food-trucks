import $ from 'jquery';
import Backbone from 'backbone';
import router from '../router';
import users from '../collections/users';

const Session = Backbone.Model.extend({
    urlRoot: `https://warm-brook-49316.herokuapp.com/sign-in`,
    defaults: {
        username: '',

    },

    // parse: function(response) {
    //   //when data is returned from server, keep track of the things below to pull later
    //   if (response) {
    //     return {
    //       username: response.username,
    //       // edit by James, set authtoken, userId, and favorites array for this session
    //       authtoken: response._kmd.authtoken,
    //       userId: response._id,
    //       favorites: response.favorites
    //
    //     };
    //   }
    // },

    // will change when BE-FE connection is established
    login: function(username, password) {
        this.save({
            username: username,
            password: password
        }, {
            success: (model, response) => {
                this.unset('password');
                window.localStorage.setItem('authtoken', '906aafeeb8f54577bc398fbcbcb39b77');
                router.navigate('truckfeed', {trigger: true});
                console.log("YOU ARE LOGGED IN BIATCH");
            }

        });

    },
    signup: function(username, password) {
        // console.log(`new user: ${username} new password: ${password}`);
        // creating a new user model and saving it to collection (.create)
        
    },

});

export default Session;
