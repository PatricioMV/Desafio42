import config from "../utils/config.js";
import { options, optionsSQLite } from "../utils/options.js";

export default class PersistenceFactory {
    static getPersistence = async ( elementManager ) => {
        if ( elementManager == 'products') {
           switch (config.app.persistence) {
                case "DB": 
                    let { default: ProductsManager } = await import('./products.js');
                    return new ProductsManager(options, 'productos');
                case 'ARRAY': 
                    let { default: ArrayManager } = await import('./array.js');
                    return new ArrayManager('products');
            }
        }
        if ( elementManager == 'chat') {
            switch (config.app.persistence) {
                 case "DB": 
                    let { default: ChatManager } = await import('./chat.js');
                    return new ChatManager(optionsSQLite, 'chat');
                 case 'ARRAY': 
                    let { default: ArrayManager } = await import('./array.js');
                    return new ArrayManager('chat');
             }
         }
    }
}

