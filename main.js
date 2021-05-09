import Navigation from './components/Navigation/Navigation.js';
import env from './config/env.js';
import UrlListener from './helpers/UrlListener.js';

/**
 * Initilization class
 * Used singelton pattern
 */
class Init {
    constructor() {
        if (!Init.instance) {
            Init.instance = this;
        }
        this.urlListener = new UrlListener();
        this.navigation = new Navigation(this.urlListener);
        this.navigation.setNavigationItems(env.navigationItems);
        this.navigation.renderNavigation();
        this.injectAssets(env.assets, env.assets.rootPath);
        return Init.instance;
    }

    /**
     *
     * @param assets
     * @param rootPath
     */
    injectAssets(assets, rootPath){

        if(assets.css){
            assets.css.map(item => this.injectFiles(rootPath + '/' + item));
        }
    }

    /**
     *
     * @param href
     * @returns {Promise}
     */
    injectFiles(href){
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("type", "text/css");
            link.onload = () => resolve();
            link.onerror = () => reject();
            link.setAttribute("href", href);
            document.head.appendChild(link);
        })
    }
}

const instance = new Init();
// close changes on object keys
Object.freeze(instance);

// from github https://gist.github.com/tobytailor/1164818
if(window.history && history.pushState){ // check for history api support
    window.addEventListener('load', function(){
        this.addEventListener('popstate', function(event, state){
            // check history state and fire custom events
            if(state = event.state){
                event = document.createEvent('Event');
                event.initEvent(state > 0 ? 'next' : 'previous', true, true);
                this.dispatchEvent(event);
                // reset state
                window.history.go(-state);
            }
        }, false);
    }, false);
}