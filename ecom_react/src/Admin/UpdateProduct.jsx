import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { isAuthenticated } from "../Auth/authIndex";
import { API } from "../config";

const UpdateProduct = () => {
  const params = useParams();
  const { token } = isAuthenticated();
  const id = params.productId;

  const [initialValue, setInitialValue] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_image, setProductImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/allcategory`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${API}/productdetail/${id}`)
      .then((res) => {
        setInitialValue(res.data);
        setProductName(res.data.product_name);
        setProductPrice(res.data.product_price);
        setCountInStock(res.data.countInStock);
        setProductDescription(res.data.product_description);
        setProductImage(res.data.product_image);
        setCategoryId(res.data.category._id);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_price", product_price);
      formData.append("countInStock", countInStock);
      formData.append("product_description", product_description);
      formData.append("product_image", product_image);
      formData.append("category", categoryId);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${API}/updateproduct/${id}`,
        formData,
        config
      );
      setSuccess(true);
      setError("");
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
      <div className="alert alert-success">Product has been updated sucessfully</div>
    );
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <form action="" className="shadow p-3">
              {showError()}
              {showSuccess()}
              <h3 className="text-center">Product update form</h3>
              <div className="mb-2">
                <label htmlFor="name">Product name</label>
                <input
                  type="text"
                  name="pname"
                  id="pname"
                  className="form-control"
                  value={product_name}
                  onChange={(e) => setProductName(e.target.value)}
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
                  onChange={(e) => setProductPrice(e.target.value)}
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
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="description">Product description</label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  className="form-control"
                  value={product_description}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value={categoryId}>
                    {initialValue.category &&
                      initialValue.category.category_name}
                  </option>
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
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>
              <div className="mb-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
