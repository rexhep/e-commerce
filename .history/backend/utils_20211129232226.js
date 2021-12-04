import jwt from 'jsonwebtoken';

// generate token to create user data and generate the token

export const generateToken = (user) => {
    return jwt.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d'
        }
    );
}

// create midleware to authenticate user request
export const isAuth = (req, res, next) => {
    console.log('REQUEST', req.headers);
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXtoken value
        console.log("TOKEN", token);
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
            if (err) {
                res.status(401).send({
                    message: 'Invalid Token'
                });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({
            message: 'No Token'
        });
    }
}

export const isAdmin = (req, res, next) => {
    console.log('req::', req.user);
    // if (req.headers.user && req.headers.user.isAdmin)
    if (req.headers.user) {
        next();
    } else {
        res.status(401).send({
            message: 'No Token'
        });
    }
}

