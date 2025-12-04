import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { getItemsData } from "../../config/getItemsData";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
import { deleteDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

import "./All_Items.css";

function All_Items() {
  const navigate = useNavigate();
  const [showItems, setShowItems] = useState("found");

  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [itemPreview, setItemPreview] = useState(null);

  const notify = (msg) => toast(msg);
  const [deleting, setDeleting] = useState(false);

  const handleModal = (item) => {
    setItemPreview(item);
    setOpenModal(!openModal);
  };

  const handleDelete = async (item) => {
    setDeleting(true);

    const itemRef = doc(db, "items", item.id);
    await deleteDoc(itemRef);

    notify("Item Deleted");
    setDeleting(false);

    setOpenModal(!openModal);
    getItemsData(setItemsData);
  };

  useEffect(() => {
    getItemsData(setItemsData);
    setLoading(false);
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="lost-found-container">
        <h1 className="container-title">Reported Items Recently Submitted</h1>
      </div>

      <div className="items-group-btns">
        <button
          onClick={() => setShowItems("found")}
          className={"btn2" + (showItems === "found" ? " active" : "")}
        >
          View All Found Items
        </button>
        <button
          onClick={() => setShowItems("lost")}
          className={"btn1" + (showItems === "lost" ? " active" : "")}
        >
          View All Lost Items
        </button>
      </div>

      <div className="items-container">
        <div className="items-grid">
          {loading ? (
            <Loading />
          ) : (
            itemsData.map((item, index) => {
              if (item.status === showItems) {
                return (
                  <div
                    onClick={() => handleModal({ ...item })}
                    key={index}
                    className="latest-card"
                  >
                    <div className="latest-img">
                      <img src={item.imageURL} />
                    </div>
                    <div className="latest-body">
                      <div className="latest-body-left">
                        <h3>{item.name}</h3>
                        <p className="loc">📍{item.location}</p>
                      </div>
                      <span className={`tag ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                );
              }
            })
          )}
        </div>
      </div>
      {openModal && (
        <Modal
          item={itemPreview}
          handleModal={handleModal}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}

export default All_Items;
