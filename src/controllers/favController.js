const Fav = require('../models/Fav');

const addFav = async(req, res) => {
    const { userId } = req.params;
    const { productId } = req.body
    try {
        const addFav = await Fav.addFav(userId, productId);
        if (addFav){res.status(200).json(addFav)}
        else{res.status(204).json({message: "El producto no se pudo agregar a favoritos, por favor reintente"})}
    } catch (error) {
        res.status(500).json({message: "Error interno del servidor al tratar de agrtegar favorito"})
    }
};

const deleteFav = async(req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;
    try {
        await Fav.removeFav(userId, productId);
        res.status(200).json({message: "producto eliminado satisfactoriamente de favoritos"})
    } catch (error) {
        res.status(500).json({message: "error interno del servidor al tratar de eliminar producto de favoritos"})
    }
};

const getFavsByUser = async(req, res) => {
    const { userId } = req.params;
    try {
        const favsByUser = await Fav.getFavsByUserId(userId);
        if (favsByUser){ res.status(200).json(favsByUser)}
        else{res.status(204).json({message: "El usuario no tiene favoritos"})}
    } catch (error) {
        res.status(500).json({message: "Error interno del servidor al tratar de obtener los favoritos"})
    }
}

module.exports = {
    addFav,
    deleteFav,
    getFavsByUser
}