/** Store module to handle artwork **/

import Vue from 'vue'
import Artwork from '../models/ArtworkClass'
import axios from 'axios';

export default {
    namespaced: true,
    // ----------------------------------------------------------------------------------
    state: {
        artwork: {}
    },
    // ----------------------------------------------------------------------------------
    getters: {
        artwork: state => state.artwork
    },
    // ----------------------------------------------------------------------------------
    mutations: {
        setArtwork: (state, artwork) => {
            Vue.set(state, 'artwork', artwork)
        }
    },
    // ----------------------------------------------------------------------------------
    actions: {
        /** Search for a artwork matching an Object Number string  **/
        search: (context, searchString) => {
            if (!searchString) {
                context.commit('setArtwork', {})
                return Promise.resolve({})
            }
            axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';
            axios.defaults.headers.common['X-Api-Key'] = process.env.VUE_APP_API_KEY;

            // TODO: Set endpoint URL in a dev/production .env file without the CORS workaround.
            var endpoint = 'https://cors-anywhere.herokuapp.com/https://api.si.edu/saam/v1/artworks';
            // TODO: install "d8-jsonapi-querystring" package and use to build querystring.
            var filters = '?' +
                'include=default_image' +
                '&filter[filter-group][group][conjunction]=AND' +
                '&filter[object-number-filter][condition][path]=object_number' +
                '&filter[object-number-filter][condition][operator]=%3D' +
                '&filter[object-number-filter][condition][value]=1968.155.8' +
                '&filter[object-number-filter][condition][value]=' + searchString +
                '&filter[object-number-filter][condition][memberOf]=filter-group' +
                //    'filter[is-on-view-filter][condition][path]=is_on_view' +
                //    '&filter[is-on-view-filter][condition][operator]=%3D' +
                //    '&filter[is-on-view-filter][condition][value]=true' +
                //    '&filter[is-on-view-filter][condition][memberOf]=filter-group' +
                '&page[limit]=1';

            axios.get(endpoint + filters)
                .then((response)  => {
                    // convert response data to Artwork class.
                    var rawData = response.data.data[0];
                    console.log(rawData);
                    const artwork = new Artwork(rawData);
                    // uses Vue.set to be sure to be deeply reactive
                    context.commit('setArtwork', artwork)
                    return Promise.resolve(context.state.artwork)
                })
                .catch(error => {
                    // in case of error, empties the Artwork
                    context.commit('setArtwork', {})
                    return Promise.reject(error)
                })
        }
    }
}
