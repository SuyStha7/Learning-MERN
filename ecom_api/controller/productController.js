const Product = require("../models/productModel");

//to paste product
exports.postProduct = (req, res) => {
  let product = new Product({
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    countInStock: req.body.countInStock,
    product_description: req.body.product_description,
    product_image: req.file.path,
    category: req.body.category,
  });

  Product.findOne({
    product_name: product.product_name,
  })
    .then(async (products) => {
      if (products) {
        return res.status(403).json({ error: "product name must be unique" });
      } else {
        product = await product.save();
        if (!product) {
          return res.status(400).json({ error: "Something went wrong" });
        }
        res.send(product);
      }
    })
    .catch((err) => console.log(err));
};

//To show all products
exports.allProduct = async (req, res) => {
  const product = await Product.find().populate("category");

  if (!product) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(product);
};

//To display product detail
exports.productDetail = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(product);
};

//update product
exports.updateProduct = async (req, res) => {
  if (req.file) {
    var formData = {
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      countInStock: req.body.countInStock,
      product_description: req.body.product_description,
      // product_image: req.body.product_image,
      product_image: req.file.path,
      category: req.body.category,
    };
  } else {
    var formData = {
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      countInStock: req.body.countInStock,
      product_description: req.body.product_description,
      category: req.body.category,
    };
  }
  const product = await Product.findByIdAndUpdate(req.params.id, formData, {
    new: true,
  });
  if (!product) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(product);
};
//to delete product
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
    .then((products) => {
      if (!products) {
        return res.status(403).json({ error: "Product not found" });
      } else {
        return res.status(200).json({ error: "Product deleted successfully" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};
