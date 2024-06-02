import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../Auth/authIndex";
import axios from "axios";
import { API } from "../config";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ShowCategory = () => {
  //destructuring token for future use
  const { token } = isAuthenticated();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/allcategory`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //delete category
  const deleteCategory = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category"
    );
    if (confirmed) {
      axios
        .delete(`${API}/deletecategory/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Category deleted sucessfully");
          setCategories(categories.filter((c) => c._id !== id));
        })
        .catch((err) => {
          toast.error(`Failed to delete category`);
        });
    }
  };
  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <table className="table table-bordered table-striped shadow">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.map((category, i) => (
                    <tr key={i}>
                      <td>{category.category_name}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteCategory(category._id)}
                        >
                          <FaTrash />
                        </button>
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

export default ShowCategory;
