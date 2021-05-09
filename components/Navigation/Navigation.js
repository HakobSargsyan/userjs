import UrlListener from '../../helpers/UrlListener.js';
/**
 * Navigation Component
 */
export default class Navigation {
    /**
     *
     * @param urlListener
     */
    constructor(urlListener) {
        this.list = [];
        this.activeTab = null;
        this.setActiveColor('white');
        this.setUrlListener((urlListener) ? urlListener : new UrlListener());
    }

    /**
     * setup url listener
     * @param urlListener
     */
    setUrlListener(urlListener){
        this.urlListener = urlListener;
    }

    /**
     *
     * @returns {*}
     */
    getUrlListener(){
        return this.urlListener;
    }

    /**
     *
     * @returns {Array.<T>|*|Array}
     */
    getNavigationItems(){
        return this.list;
    }

    /**
     * setup active tab, by default target is false for each item
     * @param target
     */
    setActiveTab(target){
        this.activeTab = target;
    }

    /**
     *
     * @returns {null|*}
     */
    getActiveTab(){
        return this.activeTab;
    }

    /**
     *
     * @returns {*}
     */
    getActiveColor(){
        return this.activeColor;
    }

    /**
     * setup active tab color , by default is white
     * @param activeColor
     */
    setActiveColor(activeColor){
        this.activeColor = activeColor;
    }

    /**
     * setup navigaion items, change env.js file if you want have more tabs
     * @param items
     * @returns {Array.<T>|*|Array}
     */
    setNavigationItems(items = []){
        if (items.length) {
            this.list = this.list.concat(items);
        }
        return this.list;
    }

    /**
     * rendering navigation
     */
    renderNavigation(){
        let list = document.createElement('ul');
        // add tab event listener
        list.addEventListener('click', (e) => this.itemClick(e) );
        // create dynamic menu
        this.getNavigationItems().forEach(item => {
            let element = document.createElement('li'),
                link = document.createElement('a');
            element.classList.add('navigation-item');
            link.setAttribute('href','javascript:void(0)');
            link.setAttribute('data-nav', item.title);
            link.setAttribute('data-className', item.classname);
            // if item have main attribute then setup active color
            if(item.main) {
                link.setAttribute('data-active', item.main);
                link.style.color = this.getActiveColor();
            }
            link.textContent = item.title;
            element.appendChild(link);
            list.appendChild(element);
        });
        let nav = document.createElement('nav');
            nav.classList.add('menu');
            nav.appendChild(list);
        // append to body
        document.body.appendChild(nav);
    }

    /**
     * tab click event
     * @param e
     */
    itemClick(e) {
        // if class name defined in the env configuration file then `
        // othwerise it will not work
        if(e.target.dataset.classname) {
            if(this.getActiveTab() && e.target !== this.getActiveTab()){
                this.getActiveTab().style.color = 'black';
                e.target.style.color = 'white';
            }else{
                e.target.style.color = 'white';
            }
            this.setActiveTab(e.target);
            // activate listener when tab clicked
            this.getUrlListener().navigationListener(e.target.dataset.classname);


        }

    }
}