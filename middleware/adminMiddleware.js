const adminMiddleware = async(req, res, next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({
            success: true,
            message: 'Access denied, Admin only!'
        })
    }

    next()
}


module.exports = adminMiddleware;