/**
 * History helper
 */
export default class History {
    /**
     *
     * @param param
     * @param value
     * @param state
     * @param title
     */
    setState(param, value, state, title){
        let url = new URL(window.location);
        url.searchParams.set(param, value);
        window.history.pushState(state, title, url);
    }

    /**
     *
     * @returns {Object}
     */
    getState(){
        return window.history.state;
    }
}