import Pagination from '../Pagination/Pagination.js';
/**
 * User Detail Component
 */
export default class UserDetail {
    /**
     * Constructor
     */
    constructor(){
        this.user = {};
        this.wrapper = null;
        this.userRepos = null;
        this.apiUrl = 'https://api.github.com/users/';
        this.paginator = new Pagination(null, 40, 470 , this);
        this.perpage = 5;
    }

    /**
     *
     * @param user
     */
    setUser(user){
        this.user = user;
    }

    /**
     *
     * @returns {*|{}}
     */
    getUser(){
        return this.user;
    }

    /**
     *
     * @param state
     */
    init(state){
        fetch(this.apiUrl + state.user_id)
            .then(response => response.json())
            .then((user)=> {
                if(user && user.repos_url){
                    this.setUser(user);
                    fetch(user.repos_url + '?page=' + this.paginator.page + '&per_page=' + this.perpage)
                        .then(res => res.json())
                        .then((repos)=> {
                            if(repos){
                                this.setUserRepoUrl(user.repos_url);
                                this.render(user , repos);
                            }
                        });
                }
            });
    }

    /**
     *
     * @param repos
     */
    setUserRepoUrl(repos){
        this.userRepos = repos;
    }

    /**
     *
     * @returns {*|null}
     */
    getUserRepoUrl(){
        return this.userRepos;
    }

    /**
     *
     * @returns {*|null}
     */
    getUserDetailsWrapper(){
        return this.wrapper;
    }

    /**
     *
     * @param wrapper
     */
    setUserDetailsWrapper(wrapper){
        this.wrapper = wrapper;
    }

    /**
     * destroy hook
     */
    destroy(){
        if(document.querySelector('.user-details-wrapper')){
            // remove wrapper
            document.querySelector('.user-details-wrapper').remove();
            //create a wrapper
            let wrapperEl = document.createElement('div');
            wrapperEl.classList.add('user-details-wrapper');
            this.setUserDetailsWrapper(wrapperEl);
            // remove paginator
            this.paginator.destroy();
        }
    }

    /**
     * change event handler
     */
    change(){
        fetch(this.getUserRepoUrl() + '?page=' + this.paginator.page + '&per_page=' + this.perpage)
            .then(res => res.json())
            .then((repos)=> {
                if(repos){
                    this.setUserRepoUrl(this.getUserRepoUrl());
                    this.render(this.getUser() , repos);
                }
            });
    }

    /**
     *
     * @param user
     * @param repos
     */
    render(user, repos){
        //create a wrapper
        const wrapper = document.querySelector('.user-details-wrapper');
        if(user !== null && !wrapper){
            let wrapper = document.createElement('div');
            wrapper.classList.add('user-details-wrapper');
            this.setUserDetailsWrapper(wrapper);
        }else {
            // remove content, rerender
            wrapper.innerHTML = "";
        }

        if(user) {
            let element = document.createElement('div');
            element.classList.add('user-gadget');
            let textEl = document.createElement('p');
            element.appendChild(textEl);
            // add avatar
            let avatar = document.createElement('div');
            avatar.classList.add('user-avatar');
            let imgEl = document.createElement('img');
            imgEl.setAttribute('loading', 'lazy');
            imgEl.setAttribute('src', user.avatar_url);
            avatar.appendChild(imgEl);
            element.appendChild(avatar);

            let userinfo = document.createElement('div');
            userinfo.classList.add('user-info');
            let bio = document.createElement('p');
            bio.innerHTML = "";
            bio.innerHTML = '<p>User Name : ' + ' ' + user.name + '</p>' +
                '<p>User bio:' + ' ' + user.bio + '' + '</p>' +
                '<p>User Company:' + ' ' + user.company + '</p>' +
                '<p>User Blog:' + ' ' + user.blog + '</p>' +
                '<p>User Email:' + ' ' + user.email + '</p>' +
                '<p>User Location:' + ' ' + user.location + '</p>' +
                '<p>User Followers:' + ' ' +  user.followers + '</p>';
            userinfo.appendChild(bio);
            // add repos
            let repoEl = document.createElement('div');
            let repoElText = document.createElement('div');
            repoElText.innerHTML = '<h3>User Repositories</h3>';
            repoEl.classList.add('user-repos');
            repoEl.appendChild(repoElText);

            for(let i in repos) {
                repoEl.innerHTML += '<p><a target="_blank" href='+ repos[i]['html_url'] + '>'+ repos[i]['name'] +'</a></p>';
            }

            this.getUserDetailsWrapper().appendChild(element);
            this.getUserDetailsWrapper().appendChild(userinfo);
            this.getUserDetailsWrapper().appendChild(repoEl);

            this.paginator.render('#2e69bd','top');
            this.paginator.render('#26b9bd','bottom');
        }

        document.body.appendChild(this.getUserDetailsWrapper());
    }
}