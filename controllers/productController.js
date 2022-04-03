import Products from "../models/ProductModel.js"


// create a product
const createProduct = async(req, res) => {
    const newProduct = new Products(req.body)
try {
    const savedProduct = await newProduct.save()

    res.status(200).json(savedProduct)
} catch (error) {
    res.status(500).json(error)
}
}

// Edit a product

const editProduct = async(req, res) => {
    try {
        const editedProduct = await Products.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(editedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete a product

const deleteProduct = async(req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id)
        res.status(200).send('Product has been deleted!')
        
    } catch (error) {
        res.status(500).json(error)
    }
}

// GET single user
const getProduct = async(req, res) => {
    try {
        const product = await Products.findById(req.params.id)
        if(product){
            
           return res.status(200).json(product)

        }else{

        return res.status(404).json("User not found!")

        }
       
    } catch (error) {
        res.status(500).json(error)
    }
    }

    // GET ALL USERS

const getAllProducts = async(req, res) => {
    const queryNew = req.query.new;
    const queryCat = req.query.category;
    try {
       let products;
        if(queryNew){
            products = await Products.find().sort({ createdAt: -1}).limit(10);
        }else if(queryCat){
            products = await Products.find({
                categories : {
                    $in: [ queryCat ],
                },
            })
        }else{
            products = await Products.find()
        }
        if(products) {
            return res.status(200).json(products)
        }else{
            return res.status(404).json("Products not found")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}

export {
    createProduct,
    editProduct,
    deleteProduct,
    getProduct,
    getAllProducts
}