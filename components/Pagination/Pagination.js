/**
 * Pagination component
 */
export default class Pagination{
    /**
     *
     * @param searchInstance
     * @param bottom
     * @param top
     * @param context
     */
    constructor(searchInstance, bottom, top , context = null){
        this.textElementContent = 'Prev Next';
        this.color = '#26b9bd';
        this.position = 'top';
        this.textTop = null;
        this.textBottom = null;
        this.searchInstance = searchInstance;
        this.page = 1;
        this.per_page = 10;
        this.bottom = bottom;
        this.top = top;
        this.context = context;
    }

    /**
     *
     * @param color
     * @param position
     * @param textElementContent
     */
    render(color, position, textElementContent){
        const middleText =  textElementContent ? textElementContent : this.textElementContent;
        this.color = color;
        this.position = position;
        // create a wrapper for paginator
        let wrapperTop = document.createElement('div');
        if(this.position == 'top'){
            this.textTop = document.createElement('p');
            this.textTop.classList.add('paginator-text');
            wrapperTop.classList.add('paginator-wrapper-top');
            wrapperTop.style.top = this.top + 'px';
            this.textTop.textContent = middleText;
        }else {
            this.textBottom = document.createElement('p');
            this.textBottom.classList.add('paginator-text');
            wrapperTop.classList.add('paginator-wrapper-bottom');
            wrapperTop.style.bottom = this.bottom + 'px';
            this.textBottom.textContent = middleText;
        }
        //add left and right arrows
        let arrowRight = document.createElement('p');
        arrowRight.addEventListener('click', () => this.next());
        let iconRight = document.createElement('i');
        iconRight.style.border = 'solid ' + color;
        iconRight.classList.add('arrow');
        iconRight.classList.add('right');
        arrowRight.appendChild(iconRight);
        let arrowLeft = document.createElement('p');
        arrowLeft.addEventListener('click', () => this.prev());
        let iconLeft = document.createElement('i');
        iconLeft.classList.add('arrow');
        iconLeft.style.border =  'solid ' + color;
        iconLeft.classList.add('left');
        arrowLeft.appendChild(iconLeft);
        wrapperTop.appendChild(arrowLeft);

        // append middle text of pagination
        if(this.position == 'top'){
            wrapperTop.appendChild(this.textTop);
        }else{
            wrapperTop.appendChild(this.textBottom);
        }
        //after middle text append right arrow
        wrapperTop.appendChild(arrowRight);
        // append paginator wrapper
        document.body.appendChild(wrapperTop);
    }

    /**
     * component destroy hook
     */
    destroy(){
        const top = document.querySelector('.paginator-wrapper-top');
        const bottom = document.querySelector('.paginator-wrapper-bottom');

        (top) ? top.remove() : false;
        (bottom) ? bottom.remove() : false;
    }

    /**
     * next click handler
     */
    next(){
        if(this.searchInstance){
            const term = this.searchInstance.getTerm();
            this.searchInstance.search(term, ++this.page, this.per_page);
        }else {
            ++this.page;
            this.context.change();
        }
    }

    /**
     * prev click handler
     */
    prev(){
        if(this.searchInstance) {
            const term = this.searchInstance.getTerm();
            this.searchInstance.search(term, --this.page, this.per_page);
        }else{
            --this.page;
            this.context.change();
        }
    }
}