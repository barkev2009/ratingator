const jwt = require('jsonwebtoken');

module.exports =  function (id, login, role) {
    let expiresIn = '24h';
    // if (role === 'ADMIN') {
    //     expiresIn = '1h';
    // }
    return jwt.sign(
        {
            id,
            login,
            role
        },
        process.env.SECRET_KEY,
        { expiresIn }
    )
}