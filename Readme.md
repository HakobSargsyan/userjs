# Github Users App

## Installation

Run app on local server [python3 -m http.server 8001](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server). 

For App configuraion file used config/env.js , example of default configuration is `
```sh
export default
{
    "production": false,
    "navigationItems" : [
        {
            "title": "Users",
            "classname" : "User" ,
            "main": false
        },
        {
            "title": "Reppos",
            "classname": "Repository" ,
            "main": false
        }
    ],
    assets: {
        rootPath:'components',
        images :[],
        css: [
            'Navigation/NavigationStyle.css',
            'Repository/RepositoryStyle.css',
            'User/UserStyle.css',
            'UserDetail/UserDetailStyle.css',
            'Pagination/PaginationStyle.css',
            'Search/SearchStyle.css'
        ],
        sass: [],
        js: []
    },
    paginator: {
        arrow_color: '#26b9bd',
        top_position: 80,
        bottom_position: 80,
        middleText: 'Prev Next'
    },
    searchInput: {
        placeholder: 'Search for ...',
        classname: '.default-search'
    }
}

```

## For production mode change on environment file production key to true.

## Technical parts

| Files | Description |
| ------ | ------ |
| main.js | App initilization class used as a singelton , all browser history are stored , we have a popstate listener there , for listen button changes  |
| helpers/Classes.js | Autoloader of classes , get class instance by name parameter |
| helpers/History.js | Class for store history states |
| helpers/UrlListener.js | Class for listen navigation click changes , dynamic class initiliazer , state listener for initilize classes |
| config/env.js | app configuration , assets , component configurations |
## Development

## Paginator Component
For use Paginator component make an instance of __new Paginator(searchInstance, top, left, context)__ class , required parameters are ` top = 72, bottom = 80 these are positions of paginator , search instance isn't required it can be also null , search instance is for conecting __Search__ and __Paginator__ components. __Search__ component have two methods __next()__ , __prev()__ , methods can easy go next and prev pages without lost of __Searcing Term __ , last parameter is context , if you put context parameter then you need to have __requred__ callback method with requried name __change()__ . 
## Search Component
For use Search component make an instance of __new Search(fetch, context, className, apiUrl , placeholder)__
1.__fetch__ is a required callback for get search results
2.__placeholder__ - by default _Search for users_
3.__context__ - is a context from where created Search instance
4.__className__ - input class name , use it for style input
5.__apiUrl__ - search api url

For More Api documentation go - [Documentation](http://0.0.0.0:8001/docs/index.html)




















