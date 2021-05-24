import ListProducts from "../views/Products/ListProducts";
import SaveProduct from "../views/Products/SaveProduct";

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
            component: ListProducts
        },
        { 
            name: 'home.products.create',
            path: 'crear',
            meta:{permission: 'products-create'},
            component: SaveProduct
        },
        {
            name: 'home.products.edit',
            path: 'editar',
            meta:{permission: 'products-edit'},
            component: SaveProduct
        }
    ]
}