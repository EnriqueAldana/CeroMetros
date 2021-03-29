import loginRoutes from "./loginRoutes";
import LytSPA from "../layouts/LytSPA";
import Home from "../views/Home/Home";
import ConfigureAccount from "../views/Account/ConfigureAccount";
import usersRoutes from "./usersRoutes";
import profilesRoutes from "./profilesRoutes";
import chatRoutes from "./chatRoutes";
import companyRoutes from "./companyRoutes";
import productionLinesRoutes from "./productionLinesRoutes";
import productionOrdersRoutes from "./productionOrdersRoutes";
import productsAnditemsRoutes from "./productsAnditemsRoutes";
import providerStationsRoutes from "./providerStationsRoutes";
import warehousesRoutes from "./warehousesRoutes";
import workStationsRoutes from "./workStationsRoutes";

export default [
    {
        path:'*',
        redirect:'/login'
    },
    loginRoutes,
    {
        path:'/',
        components:{
            allPageView: LytSPA
        },
        meta:{
          requirestAuth: true
        },
        children:[

            {
                name: 'home',
                path: '',
                components:{
                    sectionView: Home
                }
            },
            {
                name: 'home.account',
                path: 'account',
                components: {
                    sectionView: ConfigureAccount
                }
            },
            usersRoutes,
            profilesRoutes,
            chatRoutes,
            companyRoutes,
            productionLinesRoutes,
            productionOrdersRoutes,
            productsAnditemsRoutes,
            providerStationsRoutes,
            warehousesRoutes,
            workStationsRoutes,
        ]
    }
]