import getConnection from "../config/database";

const handleCreateUser = async (name: string, email: string, address: string) => {
    //logic to create user
    const connection = await getConnection();
    // execute will internally call prepare and query
    try {
        const sql = 'INSERT INTO `users`(`name`, `email`, `address`) VALUES (?, ?, ?)';
        const values = [name, email, address];

        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
    //return some result
    console.log('>>> insert a new user');
}

const getAllUsers = async () => {
    //logic to get all users

    const connection = await getConnection();
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export { handleCreateUser, getAllUsers };