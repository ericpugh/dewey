/** Store module to handle artwork **/

import Vue from 'vue'
import Artwork from '../models/ArtworkModel'
import axios from 'axios';
// @TODO: a better way to include lodash in entire project? see: https://vuejsdevelopers.com/2017/04/22/vue-js-libraries-plugins/
import _ from "lodash";

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
        // Search for a artwork matching an Object Number string.
        fetch: async (context, searchString) => {
            if (!searchString) {
                context.commit('setArtwork', {})
                return Promise.resolve({})
            }
            axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';
            axios.defaults.headers.common['X-Api-Key'] = process.env.VUE_APP_API_KEY;
            // TODO: Set endpoint URL in a dev/production .env file without the CORS workaround.
            var endpoint = 'https://cors-anywhere.herokuapp.com/https://api.si.edu/saam/v1/artworks';
            // TODO: install "devour" inorder to include relationships like default_image?
            // TODO: get the full "artist" relationship, maybe a seperate Class/API request?
            var filters = '?' +
                // 'fields[artworks]=id,title,exhibition_label,gallery_label' +
                '&include=default_image,artists,institutions,locations,audio' +
                '&filter[filter-group][group][conjunction]=AND' +
                '&filter[object-number-filter][condition][path]=object_number' +
                '&filter[object-number-filter][condition][operator]=%3D' +
                '&filter[object-number-filter][condition][value]=' + searchString +
                '&filter[object-number-filter][condition][memberOf]=filter-group' +
                '&page[limit]=1';

            await axios.get(endpoint + filters)
                .then((response) => {
                    // Convert response data to Artwork class.
                    let attributes = _.has(response.data, 'data') ?_.head(response.data.data) : {};
                    let included = _.has(response.data, 'included') ? response.data.included : {};
                    let artwork = new Artwork(attributes, included);
                    window.console.log(artwork);
                    // uses Vue.set to be sure to be deeply reactive
                    context.commit('setArtwork', artwork);
                    return Promise.resolve(context.state.artwork);
                })
                .catch(error => {
                    // in case of error, empties the Artwork
                    context.commit('setArtwork', {})
                    return Promise.reject(error)
                });
        },
        // Update the artwork with "nearby" artworks matching a Location ID.
        updateNearbyArtworks: async (context) => {
            let parent_artwork_id = context.state.artwork.id;
            let location_id = context.state.artwork.on_view_location.id;
            if (location_id) {
                axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';
                axios.defaults.headers.common['X-Api-Key'] = process.env.VUE_APP_API_KEY;
                var endpoint = 'https://cors-anywhere.herokuapp.com/https://api.si.edu/saam/v1/artworks';
                var filters = '?' +
                    '&include=default_image,artists,institutions,locations,audio' +
                    '&filter[location-filter][condition][path]=locations.id' +
                    '&filter[location-filter][condition][operator]=%3D' +
                    '&filter[location-filter][condition][value]=' + location_id +
                    '&page[limit]=6';
                await axios.get(endpoint + filters)
                    .then((response) => {
                        let data = _.has(response.data, 'data') ? response.data.data : {};
                        let included = _.has(response.data, 'included') ? response.data.included : {};
                        // Build results
                        let results = [];
                        _.each(data, function (datum) {
                            // Add artwork to "nearby" artworks if its not the parent Artwork.
                            if (datum.id !== parent_artwork_id) {
                                let artwork = new Artwork(datum, included);
                                results.push(artwork);
                            }
                        });
                        context.state.artwork.nearby_artworks = results;
                        return Promise.resolve(context.state.artwork);
                    })
                    .catch(error => {
                        return Promise.reject(error);
                    });
            }
        }

    }

}