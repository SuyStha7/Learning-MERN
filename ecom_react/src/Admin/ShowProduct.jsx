import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { isAuthenticated } from "../Auth/authIndex";
import axios from "axios";
import { API, IMG_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { token } = isAuthenticated();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/allproduct`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //delete product
  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category"
    );
    if (confirmed) {
      axios
        .delete(`${API}/deleteproduct/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Product deleted sucessfully");
          setProducts(products.filter((c) => c._id !== id));
        })
        .catch((err) => {
          toast.error(`Failed to delete product`);
        });
    }
  };
  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 mt-2">
            <table className="table table-bordered table-striped shadow">
              <thead>
                <tr className="text-center">
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Product Description</th>
                  <th>Stock</th>
                  <th>Product Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product, i) => (
                    <tr key={i}>
                      <td>{product.product_name}</td>
                      <td> {product.category.category_name}</td>
                      <td>
                        <img
                          src={`${IMG_URL}/${product.product_image}`}
                          alt={product.product_image}
                          width="100"
                        ></img>
                      </td>
                      <td>{product.product_description}</td>
                      <td>{product.countInStock}</td>
                      <td>{product.product_price}</td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(product._id)}
                        >
                          <FaTrash />
                        </button>
                        <Link
                          to={`/admin/updateproduct/${product._id}`}
                          className="btn btn-primary"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
