import ListProductsAndItems from "../views/ProductsAndItems/ListProductsAndItems";


export default {
    path: 'productos',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.products',
            path: '',
            meta:{permission: 'products-view'},
            component: ListProductsAndItems
        }
    ]
}