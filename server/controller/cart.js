import Cart from "../model/Cart.js"
import errorHandler from "../utils/errorHandler.js"

const createItem = async (req, res, next) => {
    try {
      const { title, price, quantity, image } = req.body;
      const userId = req.user.id; // Get the user's id from JWT
  
      const cartItem = new Cart({
        title,
        price,
        quantity,
        image, 
        user: userId,
      });
  
      const savedItem = await cartItem.save();
      return res.status(201).json(savedItem);
    } catch (err) {
      return next(err);
    }
  }
  

const removeItem = async (req,res,next) => {
    try{
        const cart = await Cart.findByIdAndDelete(req.params.cartId).exec()
        if(!cart) {
            const err = errorHandler(404,' Not found!')
            return next(err)
        }
        if(cart.user.toString() !== req.user.id) {
            const err = errorHandler(401,' Not your task!')
            return next(err)
        }
        res.status(200).json(`Item deleted successfully`)
    } catch(err) {
        return next(err)
    }
}

const getCurrentUserItem = async (req,res,next) => {
    try{
        const cart = await Cart.find({ user: req.user.id })
        return res.status(200).json(cart)
    } catch(err) {
        return next(err)
    }
}

export { createItem, removeItem, getCurrentUserItem }