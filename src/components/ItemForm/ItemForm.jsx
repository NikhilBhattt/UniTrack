import { useRef, useState } from "react";
import Header from "../Header/Header";
import { ToastContainer, toast } from "react-toastify";
import { auth, db } from "../../config/firebase";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./ItemForm.css";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
const CLOUD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

const ItemForm = ({ type = "lost" }) => {
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const imageInputRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    time: "",
    status: "",
    image: null,
    imageURL: null,
  });

  const notify = (message) => toast(message);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isDataValid = () => {
    const { name, description, location, date, time, image } = formData;

    if (!name || !description || !location || !date || !time || !image) {
      notify("Please fill in all required fields.");
      return false;
    }

    if (name.length > 25 || location.length > 25) {
      notify("Input too long!");
      return false;
    }
    if (!formData.status) {
      notify("Please select item status");
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  };

  const handleUploadClick = (e) => {
    imageInputRef.current.click();
  };

  // image upload to cloudinary
  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUD_PRESET);
    data.append("cloud_name", CLOUD_NAME);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      data
    );

    return response.data.secure_url; // This is image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isDataValid()) return;

    setSubmitting(true);

    // image upload
    const imageURL = await uploadImageToCloudinary(formData.image);

    const finalData = {
      ...formData,
      imageURL,
      user_id: auth.currentUser.uid,
      user_email: auth.currentUser.email,
      user_name: auth.currentUser.displayName,
      image: null,
    };

    try {
      const itemsCollectionRef = collection(db, "items");
      await addDoc(itemsCollectionRef, finalData);
      notify(`${type === "lost" ? "Lost" : "Found"} item submitted`);

      setSubmitting(false);
      setTimeout(() => navigate("/all-items"), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="form-container">
        <h3 className="form-title">
          {type === "lost" ? "Report Lost Item" : "Report Found Item"}
        </h3>
        <form className="item-form" onSubmit={handleSubmit}>
          <div className="form-left">
            <label>
              Item Name <span className="required">*</span> <br />
              <span>(This field is required.)</span>
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              placeholder="E.g., Black Wallet"
            />

            <label>
              Item Description <span className="required">*</span> <br />
              <span>(This field is required.)</span>
            </label>
            <textarea
              name="description"
              rows="5"
              required
              onChange={handleChange}
              placeholder="E.g., A black wallet with a red stripe"
            />
            <label>
              Location <span className="required">*</span> <br />
              <span>(This field is required.)</span>
            </label>
            <input
              type="text"
              name="location"
              required
              onChange={handleChange}
              placeholder="E.g., Library, Cafeteria"
            />
            <div className="date-time-container">
              <div className="date-input">
                <label>
                  Date <span className="required">*</span>
                  <span>(When it was lost/found)</span>
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="time-input">
                <label>
                  Time <span className="required">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-right">
            <label>
              Upload Image <span className="required">*</span>
              <span>(This image will display on the website.)</span>
            </label>

            <input
              ref={imageInputRef}
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={handleFileChange}
            />

            <div onClick={handleUploadClick} className="upload-btn">
              {preview ? "Change Image" : "Browse Files"}
            </div>
            {preview && (
              <img
                className="image-preview"
                src={preview}
                alt="Image Preview"
              />
            )}

            <div className="checkboxs">
              <label>Item status</label> <span className="required">*</span>
              <br />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="status-select"
                required
              >
                <option value="">Select status</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className={`submit-btn ${submitting && "submitting"}`}
            >
              {submitting
                ? "Submitting..."
                : `Submit ${type === "lost" ? "Lost" : "Found"} Item`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ItemForm;
