/**
 * Search Component
 */
export default class Search {
    /**
     *
     * @param fetch
     * @param context
     * @param className
     * @param apiUrl
     * @param placeholder
     */
    constructor(fetch, context, className, apiUrl , placeholder){
        this.placeholder = placeholder;
        this.fetch = fetch;
        this.context = context;
        this.className = className;
        this.apiUrl = apiUrl;
        this.page = 1;
        this.per_page = 10;
        this.element = null;
    }

    /**
     * key up event handler
     * @param event
     */
    onKeyup(event){
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.querySelector(this.className).click();
        }
    }

    /**
     * on click event
     */
    onClick(){
        this.search(event.target.value, this.page, this.per_page);
    }

    /**
     * render ov view
     */
    render(){
        if( !document.querySelector(this.className) ) {
            let inputElement = document.createElement('input');
            inputElement.classList.add(this.className.substr(1, this.className.length));
            inputElement.setAttribute('placeholder', this.placeholder);

            inputElement.addEventListener("keyup", (event) => this.onKeyup(event));

            inputElement.addEventListener("click", (event) => this.onClick(event));

            document.body.appendChild(inputElement);
            this.setElement(inputElement);
        }
    }

    /**
     * destroy hook
     */
    destroy(){
        if( document.querySelector(this.className) ){
            document.querySelector(this.className).remove();
            // remove listeners
            this.getElement().removeEventListener('keyup' , this.onKeyup);
            this.getElement().removeEventListener('keyup' , this.onClick);
        }
    }

    /**
     * setup input element Node
     * @param element
     */
    setElement(element){
        this.element = element;
    }

    /**
     *
     * @returns {null|*}
     */
    getElement(){
        return this.element;
    }

    /**
     * setup search term
     * @param term
     */
    setTerm(term){
        this.term = term;
    }

    /**
     *
     * @returns {*}
     */
    getTerm(){
        return this.term;
    }

    /**
     * setup search result
     * @param result
     */
    setResult(result){
        this.result = result;
    }

    /**
     * search api call
     * @param term
     * @param page
     * @param perpage
     */
    search(term, page, perpage){
        if(term.length) {
            this.setTerm(term);
            fetch(this.apiUrl + '?q=' +  term + '&page='+ page + '&per_page=' + perpage)
                .then(response => response.json())
                .then((data)=> {
                    this.fetch(data, this.context);
                    this.setResult(data);
                });
        }
    }
}