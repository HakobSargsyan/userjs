import Search from '../Search/Search.js';
import Pagination from '../Pagination/Pagination.js';
import History from '../../helpers/History.js';

/**
 * Repository Component
 */
export default class Repository {
    /**
     * constructor
     */
    constructor(){
        this.apiUrl = 'https://api.github.com/search/repositories';
        this.searchClass =  '.default-repos';
        this.search = new Search(this.fetchRepoData, this, this.searchClass ,this.apiUrl, 'Search for Repos');
        this.paginator = new Pagination(this.search, 25, 80 );
        this.repowrapper = null;
        this.history = new History();
    }

    /**
     * callback ,data comming from search
     * @param data
     * @param context
     */
    fetchRepoData(data, context){
        context.render(data);
        if(data.total_count > 10) {
            context.paginator.render('#2e69bd','top');
            context.paginator.render('#26b9bd','bottom');
        }
    }

    /**
     * init hook
     * @param state
     */
    init(state){
        this.search.destroy(false);
        if(!document.querySelector(this.searchClass)){
            this.search.render();
        }

    }

    /**
     *
     * @returns {*|null}
     */
    getRepoWrapper(){
        return this.repowrapper;
    }

    /**
     * setup repository wrapper
     * @param repowrapper
     */
    setRepoWrapper(repowrapper){
        this.repowrapper = repowrapper;
    }

    /**
     * detail click handler
     * @param e
     */
    detailClick(e){
        const closest = e.target.closest('.repo-gadget');
    }

    /**
     * render view
     * @param data
     */
    render(data){
        const wrapper = document.querySelector('.repo-wrapper');

        //if we not data and have not user wrapper then create it otherwise remove content of wrapper
        if(data !== null && !wrapper){
            let wrapper = document.createElement('div');
            wrapper.classList.add('repo-wrapper');
            this.setRepoWrapper(wrapper);

            wrapper.addEventListener('click', (e) => this.detailClick(e), {});
        }else {
            // remove content
            wrapper.innerHTML = "";
        }


        // show items, create element content
        if(data['items']) {
            data['items'].forEach((item, index) => {
                let element = document.createElement('div');
                element.setAttribute('data-item', item.id);
                element.classList.add('repo-gadget');
                let textEl = document.createElement('p');
                textEl.textContent = item.description;
                element.appendChild(textEl);
                // add avatar
                this.getRepoWrapper().appendChild(element);

            });
        }

        //remove search input then open user info wrapper
        if(document.querySelector(this.searchClass)){
            document.querySelector(this.searchClass).remove();
            document.body.appendChild(this.getRepoWrapper());
        }
    }

    /**
     * component destroy
     * @param searchInput
     */
    destroy(searchInput = true){
        if(document.querySelector('.repo-wrapper')){
            //remove search element
            // remove wrapper
            document.querySelector('.repo-wrapper').remove();
            //create a wrapper
            let wrapperEl = document.createElement('div');
            wrapperEl.classList.add('repo-wrapper');
            this.setRepoWrapper(wrapperEl);
            // remove paginator
            this.paginator.destroy();
            // remove evenet listener
            this.getRepoWrapper().removeEventListener('click', this.detailClick);
        }

        if(searchInput){
            this.search.destroy(searchInput);
        }
    }
}