import History from './History.js';
import {dynamicClass} from './Classes.js';

/**
 * UrlListener Helper
 */
export default class UrlListener {
    /**
     * constructor
     */
    constructor(){
        this.classInstance = null;
        this.history = new History();
        this.stateListener();
    }

    /**
     * listen of state change
     */
    stateListener(){
        const state = this.history.getState();
        // if we have history on state
        if(state && Object.keys(state).length) {
            this.navigationListener(state['classname'] , state)
        }
    }

    /**
     *
     * @param classInstance
     */
    setInstance(classInstance){
        this.classInstance = classInstance;
    }

    /**
     *
     * @returns {null|*}
     */
    getInstance(){
        return this.classInstance;
    }

    /**
     *
     * @param url
     * @param state
     */
    navigationListener(url, state){
        const classname = dynamicClass(url);
        // create dynamic class instance when it not already created
        if(classname && !this.getInstance()) {
             this.createInstance(classname , state);
        } else {

            // set old instance, destroy old instance
            this.getInstance().destroy(true);
            // remove all references, clear garbage collector
            delete this.getInstance();
            // if we have sub clases destroy sub clases, User -> UserDetail
            (this.getInstance().userDetail) ? this.getInstance().userDetail.destroy() : null;
             (this.getInstance().paginator) ? this.getInstance().paginator.destroy() : null;
             (this.getInstance().searchInstance) ? this.getInstance().searchInstance.destroy() : null;
            // remove all references, clear garbage collector
            delete this.getInstance().userDetail;
             this.setInstance(null);
            // create a new instance
            this.createInstance(classname, state);
        }
    }

    /**
     *
     * @param classname
     * @param state
     */
    createInstance(classname, state){
        const tabClass = new classname();
        this.setInstance(tabClass);
        tabClass.init(state);
    }
}