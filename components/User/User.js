import Pagination from '../Pagination/Pagination.js';
import Search from '../Search/Search.js';
import History from '../../helpers/History.js';
import UserDetail from '../UserDetail/UserDetail.js';

/**
 * User Component
 */
export default class User {
    /**
     * Constructor
     */
    constructor() {
        this.apiUrl = 'https://api.github.com/search/users';
        this.search = new Search(this.fetchUserData, this, '.default-search', this.apiUrl, 'Search for Users');
        this.paginator = new Pagination(this.search, 72, 80);
        this.userwrapper = null;
        this.history = new History();
        this.userDetail = new UserDetail();
    }

    /**
     * init hook
     * @param state
     */
    init(state){
        console.log(state);
        if(!state){
            this.search.render();
        }else {
            this.userDetail.init(this.history.getState());
        }
    }

    /**
     * destroy component
     * @param searchInput
     */
    destroy(searchInput = true){
        //remove user wrapper when user want again search something
        if(document.querySelector('.user-wrapper')){
            // remove wrapper
            document.querySelector('.user-wrapper').remove();
            //create a wrapper
            let wrapperEl = document.createElement('div');
            wrapperEl.classList.add('user-wrapper');
            this.setUserWrapper(wrapperEl);
            // remove paginator
            this.paginator.destroy();
            // remove listener
            this.getUserWrapper().removeEventListener('click', this.clickDetail);
        }

        if(searchInput){
            this.search.destroy(searchInput);
        }
    }

    /**
     * callback for setup result, it comes from search component
     * @param data
     * @param context
     */
    fetchUserData(data, context){
        context.render(data);
        if(data.total_count > 10) {
            context.paginator.render('#2e69bd','top');
            context.paginator.render('#26b9bd','bottom');
        }
    }

    /**
     *
     * @returns {*|null}
     */
    getUserWrapper(){
        return this.userwrapper;
    }

    /**
     * setup user wrapper
     * @param userwrapper
     */
    setUserWrapper(userwrapper){
        this.userwrapper = userwrapper;
    }

    /**
     * detail page click handler
     * @param e
     */
    clickDetail(e){
        const closest = e.target.closest('.user-gadget');
        this.history.setState('user_id', closest.dataset['item'] , {'user_id': closest.dataset['item'] , 'classname' : this.constructor.name } , 'User');
        this.destroy(true);
        this.userDetail.init(this.history.getState());
    }

    /**
     * render users view
     * @param data
     */
    render(data){
        const wrapper = document.querySelector('.user-wrapper');
        // if we have not data and have not user wrapper then create it , otherwise remove content of wrapper
        if(data !== null && !wrapper){
            let wrapper = document.createElement('div');
            wrapper.classList.add('user-wrapper');
            this.setUserWrapper(wrapper);
            // add on click for detail page
            wrapper.addEventListener('click', (e) => this.clickDetail(e), {});
        }else {
            // remove content
            wrapper.innerHTML = "";
        }

        //show items, create element content
        if(data['items']) {
            data['items'].forEach((item, index) => {
                let element = document.createElement('div');
                element.setAttribute('data-item', item.login);
                element.classList.add('user-gadget');
                let textEl = document.createElement('p');
                textEl.textContent = item.login;
                element.appendChild(textEl);
                // add avatar
                let avatar = document.createElement('div');
                avatar.classList.add('user-avatar');
                let imgEl = document.createElement('img');
                imgEl.setAttribute('loading', 'lazy');
                imgEl.setAttribute('src', item.avatar_url);
                avatar.appendChild(imgEl);
                element.appendChild(avatar);
                this.getUserWrapper().appendChild(element);
            });
        }
        // remove search input then open user info wrapper
        if(document.querySelector('.default-search')){
            document.querySelector('.default-search').remove();
            document.body.appendChild(this.getUserWrapper());
        }

    }
}