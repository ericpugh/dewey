/** Store module to handle recent artwork history **/

import Vue from "vue";
import Artwork from "../models/ArtworkModel";
import _ from "lodash";

export default {
    namespaced: true,
    // ----------------------------------------------------------------------------------
    state: {
        recent: []
    },
    // ----------------------------------------------------------------------------------
    getters: {
        recent: state => state.recent
    },
    // ----------------------------------------------------------------------------------
    mutations: {
        // Add an artwork to recent artworks list.
        ADD: (state, artwork) => {
            if (artwork instanceof Artwork) {
                // Remove artwork from list if it already exists.
                let list = _.remove(state.recent, function(item) {
                    return item.object_number !== artwork.object_number;
                });
                // Add artwork to front of array.
                list.unshift(artwork);
                // Limit final list size to 35 items
                Vue.set(state, 'recent', list.slice(0,35));
                // context.state.recent = added.slice(0,35);
            }
        }
    },
    // ----------------------------------------------------------------------------------
    actions: {}
}