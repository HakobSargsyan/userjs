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
