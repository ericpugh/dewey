/** Model definition file for the Artist Class **/

import store from '../store'

export default class Artist {
    constructor (data = {}) {
        this.id = data.id;
        this.title = data.title;
    }
}
