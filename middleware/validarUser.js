const validateUser = async (req, res, next) => {

    const data = req.app.locals;
    if (data._id && data.nombre && data.token) next();
    else res.redirect('/')

}

module.exports = { validateUser }