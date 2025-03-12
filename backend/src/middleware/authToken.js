import jwt from 'jsonwebtoken';


export function authToken(req, res, next) {
    try {
        const token = req.cookies.access_token
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_token) => {
                if (err) return res.clearCookie("access_token", { path: '/' })
                req.user = user_token
            })
           
        } 
        next()
    } catch (error) {
        console.error(error)
    }
}