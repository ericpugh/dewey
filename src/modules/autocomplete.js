/** Store module to handle search autocomplete **/

import Vue from "vue";
import _ from "lodash";
import axios from 'axios';
axios.interceptors.request.use(
    (config) => {
        config.headers['Accept'] = 'application/vnd.api+json';
        config.headers['X-Api-Key'] = process.env.VUE_APP_API_KEY;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default {
    namespaced: true,
    // ----------------------------------------------------------------------------------
    state: {
        results: []
    },
    // ----------------------------------------------------------------------------------
    getters: {
        results: state => state.results
    },
    // ----------------------------------------------------------------------------------
    mutations: {
        SET: (state, results) => {
            Vue.set(state, 'results', results)
        }
    },
    // ----------------------------------------------------------------------------------
    actions: {
        // Get autocomplete results based on a search query.
        FETCH: async (context, query) => {
            // TODO: Can I retrieve ALL object numbers in one request?
            // TODO: Include thumbnail images in autocomplete results?
            var endpoint = 'https://cors-anywhere.herokuapp.com/https://api.si.edu/saam/v1/artworks';
            var filters = '?' +
                'fields[artworks]=object_number' +
                '&filter[filter-group][group][conjunction]=AND' +
                '&filter[object-number-filter][condition][path]=object_number' +
                '&filter[object-number-filter][condition][operator]=STARTS_WITH' +
                '&filter[object-number-filter][condition][value]=' + query +
                '&filter[object-number-filter][condition][memberOf]=filter-group' +
                '&filter[is-on-view-filter][condition][path]=is_on_view' +
                '&filter[is-on-view-filter][condition][operator]=CONTAINS' +
                '&filter[is-on-view-filter][condition][value]=1' +
                '&filter[is-on-view-filter][condition][memberOf]=filter-group' +
                '&sort=object_number' +
                '&page[limit]=10';
            await axios.get(endpoint + filters)
                .then((response) => {
                    let items = response.data.data;
                    // Filter results.
                    let results = [];
                    _.each(items, function (item) {
                        results.push(item.attributes.object_number)
                    });
                    context.commit('SET', results);
                    return Promise.resolve(context.state.autocomplete);
                })
                .catch(error => {
                    return Promise.reject(error);
                });
        }
    },
}