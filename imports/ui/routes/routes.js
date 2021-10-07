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
import supplyRoutes from "./supplyRoutes";
import warehousesRoutes from "./warehousesRoutes";
import workStationsRoutes from "./workStationsRoutes";
import workStationSetupRoutes from "./workStationSetupRoutes";
import providerRoutes from "./providerRoutes";
import productsRoutes from "./productsRoutes";
import unitOfMeasurementRoutes from "./unitOfMeasurementRoutes";
import customerRoutes from "./customerRoutes";


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
            supplyRoutes,
            warehousesRoutes,
            workStationsRoutes,
            workStationSetupRoutes,
            providerRoutes,
            productsRoutes,
            unitOfMeasurementRoutes,
            customerRoutes,
            
        ]
    }
]