
import { Provider } from './Provider';


Provider.rawCollection().createIndex(
    {"providerBussinessId" : 1,},{unique: true}
    );
