/**
 * Created by r1cebank on 8/11/15.
 */

class AppSingleton {
    constructor() {
        this.sharedInstance = { };
    }
    static getInstance() {
        if(!this.sharedInstance) {
            this.sharedInstance = { };
        }
        return this.sharedInstance;
    }
}

export default AppSingleton;