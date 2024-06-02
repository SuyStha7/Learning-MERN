import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../Auth/authIndex";
import axios from "axios";
import { API } from "../config";
const AddProduct = () => {
  const { token } = isAuthenticated();
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    product_name: "",
    product_price: "",
    countInStock: "",
    product_description: "",
    product_image: "",
    category: "",
  });
  //fetch categpries
  useEffect(() => {
    axios
      .get(`${API}/allcategory`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //destructuring productData
  const {
    product_name,
    product_price,
    countInStock,
    product_description,
    product_image,
    category,
  } = productData;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (name) => (event) => {
    setProductData({
      ...productData,
      error: false,
      [name]: event.target.value,
    });
  };
  const handleImageChange = (event) => {
    setProductData({
      ...productData,
      product_image: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //passing form data instead of json
    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_price", product_price);
      formData.append("countInStock", countInStock);
      formData.append("product_description", product_description);
      formData.append("product_image", product_image);
      formData.append("category", category);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${API}/postproduct`, formData, config);
      setSuccess(true);
      setError("");
      setProductData({
        product_name: "",
        product_price: "",
        countInStock: "",
        product_description: "",
        product_image: "",
        category: "",
      });
    } catch (err) {
      setError(err.response.data.error);
      setSuccess(false);
    }
  };
  //to show error message
  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };
  const showSuccess = () =>
    success && (
      <div className="alert alert-success">
        Product has been added successfully
      </div>
    );
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <form action="" className="shadow p-3">
              {showError()}
              {showSuccess()}
              <h3 className="text-center">Add product form</h3>
              <div className="mb-2">
                <label htmlFor="name">Product name</label>
                <input
                  type="text"
                  name="pname"
                  id="pname"
                  className="form-control"
                  value={product_name}
                  onChange={handleChange("product_name")}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="price">Product price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="form-control"
                  value={product_price}
                  onChange={handleChange("product_price")}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="stock">Stock quantity</label>
                <input
                  type="text"
                  name="stock"
                  id="stock"
                  className="form-control"
                  value={countInStock}
                  onChange={handleChange("countInStock")}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="description">Product description</label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="4"
                  className="form-control"
                  value={product_description}
                  onChange={handleChange("product_description")}
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  onChange={handleChange("category")}
                >
                  <option>--Select Category--</option>
                  {categories &&
                    categories.map((c, i) => (
                      <option value={c._id} key={i}>
                        {c.category_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="image">Product Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Add product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
