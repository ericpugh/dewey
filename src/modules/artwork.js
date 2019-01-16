/** Store module to handle artwork **/

import Vue from 'vue'
import Artwork from '../models/ArtworkClass'
import axios from 'axios';
import _ from 'lodash';

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
        // TODO: move all the response parsing to a seperate action OR "MUTATION"???
        search: (context, searchString) => {
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
                'fields[arworks]=id,title,exhibition_label,gallery_label' +
                '&include=default_image,artists,institutions,audio' +
                '&filter[filter-group][group][conjunction]=AND' +
                '&filter[object-number-filter][condition][path]=object_number' +
                '&filter[object-number-filter][condition][operator]=%3D' +
                '&filter[object-number-filter][condition][value]=' + searchString +
                '&filter[object-number-filter][condition][memberOf]=filter-group' +
                //    'filter[is-on-view-filter][condition][path]=is_on_view' +
                //    '&filter[is-on-view-filter][condition][operator]=%3D' +
                //    '&filter[is-on-view-filter][condition][value]=true' +
                //    '&filter[is-on-view-filter][condition][memberOf]=filter-group' +
                '&page[limit]=1';

            axios.get(endpoint + filters)
                .then((response)  => {
                    // Convert response data to Artwork class.
                    var artworks = response.data.data;
                    var included = response.data.included;
                    // Build results
                    var results = [];
                    _.each(artworks, function (artwork, key, list) {
                        // Create the basic artwork object.
                        var item = {
                            id: artwork.id,
                            object_number: artwork.attributes.object_number,
                            title: artwork.attributes.title,
                            long_title: artwork.attributes.long_title,
                            path: artwork.attributes.path.alias,
                            copyright: artwork.attributes.copyright,
                            credit_line: artwork.attributes.credit_line,
                            dated: artwork.attributes.dated,
                            dimensions: artwork.attributes.dimensions,
                            display_mediums: artwork.attributes.display_mediums,
                            ontology: '',
                            is_new_acquistion: artwork.attributes.is_new_acquistion,
                            is_on_view: artwork.attributes.is_on_view,
                            exhibition_label: artwork.attributes.exhibition_label ?  artwork.attributes.exhibition_label.processed : '',
                            gallery_label: artwork.attributes.exhibition_label ?  artwork.attributes.gallery_label.processed : '',
                            luce_center_label: artwork.attributes.luce_center_label ?  artwork.attributes.luce_center_label.processed : '',
                            luce_object_quote: artwork.attributes.luce_object_quote ?  artwork.attributes.luce_object_quote.processed : '',
                            new_acquisition_label: artwork.attributes.new_acquisition_label ?  artwork.attributes.new_acquisition_label.processed : '',
                            publication_label: artwork.attributes.publication_label ?  artwork.attributes.publication_label.processed : '',
                    };
                        // Parse the Ontology array items for friendly output.
                        if (artwork.attributes.ontology) {
                            var parsed = [];
                            var allowed_subjects = ['Subject Specific', 'Subject General', 'Patronage', 'Medium'];
                            _.each(artwork.attributes.ontology, function (keyword) {
                                // TODO: Test if allowed subject in keyword.
                                // Replace backslash with an em dash.
                                var keyword = keyword.replace(/\\/g, " &mdash; ");
                                parsed.push(keyword);
                            });
                            item.ontology = parsed;
                        }
                        // Get the Default Image file ID from the relationship.
                        var file_id = ((((artwork || {}).relationships || {}).default_image || {}).data || {}).id;
                        if (file_id) {
                            item.file_id = file_id;
                            // Get image url from the include.
                            _.some(included, function (include, key, list) {
                                if(include.type === 'files' && include.id === file_id) {
                                    item.original_image_url = include.attributes.uri.url;
                                    item.thumbnail_image_url = include.attributes.uri.url.replace('/files/files/', '/files/styles/max_325x325/s3/files/');
                                    item.medium_image_url = include.attributes.uri.url.replace('/files/files/', '/files/styles/max_650x650/s3/files/');
                                }
                            });
                            if (item.original_image_url !== undefined) {
                                results.push(item);
                            }
                        }
                    });

                    console.log(results);

                    const artwork = new Artwork(results[0]);
                    console.log(artwork);
                    // uses Vue.set to be sure to be deeply reactive
                    context.commit('setArtwork', artwork)
                    return Promise.resolve(context.state.artwork)
                })
                .catch(error => {
                    // in case of error, empties the Artwork
                    context.commit('setArtwork', {})
                    return Promise.reject(error)
                });
        },
    }
};
