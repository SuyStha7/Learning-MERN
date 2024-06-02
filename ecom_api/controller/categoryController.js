const Category = require("../models/categoryModel");

//to post data in the category model
exports.postCategory = async (req, res) => {
  let category = new Category({
    category_name: req.body.category_name,
  });

  //check for unique values
  Category.findOne({ category_name: category.category_name })
    .then(async (categories) => {
      if (categories) {
        return res.status(403).json({ error: "Category must be unique" });
      } else {
        category = await category.save();
        if (!category) {
          return res.status(400).json({ error: "Something went wrong" });
        } else {
          res.send(category);
        }
      }
    })
    .catch((err) => console.log(err));
};

//to display all category
exports.allCategory = async (req, res) => {
  const category = await Category.find();
  if (!category) {
    return res.status(403).json({ error: "Something went wrong" });
  }
  res.send(category);
};
//to show single category detail
exports.categoryDetail = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(category);
};
//to delete category
exports.deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id)
    .then((categories) => {
      if (!categories) {
        return res.status(403).json({ error: "Category not found" });
      } else {
        return res.status(200).json({ error: "Category deleted" });
      }
    })
    .catch((err) => console.log(err));
};
//to update category detail
exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      category_name: req.body.category_name,
    },
    { new: true }
  );
  if (!category) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(category);
};
