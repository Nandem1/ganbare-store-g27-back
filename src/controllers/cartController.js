const Cart= require ('../models/UserCart');

const getCart = async(req, res) => {
    const {userId} = req.params;
    try {
        const cart = await Cart.getCartByUserId(userId);
        if ( cart.length === 0) {res.status(204).json({message: "El usuario no tiene carrito asociado"})}
        else{res.status(201).json(cart)};
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor al obtener carrito" });
    }
};

const addProductToCart = async(req, res) => {
    const { userId } = req.params;
    const { productId, cantidad } = req.body;
    try {
        const addedToCart = await Cart.addToCart(userId, productId, cantidad);
        if ( addedToCart .length <= 0) res.status(204).json({message: "No se pudo agregar el producto, intentelo nuevamente"});
        res.status(201).json(addedToCart);
    } catch (error) {
        res.status(500).json({message: "Error interno del servidor al agregar producto"});
    }
};

const deleteProductFromCart = async(req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;
    try{
        await Cart.removeFromCart( userId, productId);
        res.status(200).json({ message: 'Producto eliminado exitosamente'});
    }catch{
        res.status(500).json({message: 'Error interno del servidor al eliminar producto'});
    }
};

module.exports = {
    getCart,
    addProductToCart,
    deleteProductFromCart
}