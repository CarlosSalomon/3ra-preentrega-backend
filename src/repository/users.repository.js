

class userRepository {
    
    constructor(dao){
        this.dao = dao;
    }

    async getUsers(email) {
        const user = await this.dao.getUsers(email);
        return user;
    }

    async regUser(email, password, first_name, last_name, age ) {
        const newUser = await this.dao.regUser(email, password, first_name, last_name, age );
        return newUser;
    }

    async logInUser(email, password) {
        const user = await this.dao.logInUser(email, password);
        return user;
    }
}
export { userRepository }