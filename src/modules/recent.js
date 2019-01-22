/** Store module to handle recent artwork history **/

import Vue from 'vue'
import Artwork from '../models/ArtworkModel'
import axios from 'axios';
import _ from 'lodash';

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
    mutations: {},
    // ----------------------------------------------------------------------------------
    actions: {
        // Search for a artwork matching an Object Number string.
        add: async (context, artwork) => {
            if (artwork instanceof Artwork) {
                // Remove artwork from list if it already exists.
                let added = _.remove(context.state.recent, function(item) {
                    return item.object_number !== artwork.object_number;
                });
                // Add artwork to front of array.
                added.unshift(artwork);
                // Limit final list size to 25 items
                context.state.recent = added.slice(0,25);
            }
        }
    }

}