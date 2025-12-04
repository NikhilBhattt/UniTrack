import "./Modal.css";
import { auth, db } from "../../config/firebase";

function Modal({ item, handleModal, handleDelete, deleting }) {
  const currentUser = auth.currentUser;

  const closeModal = () => {
    handleModal(null);
  };

  const handleContact = async (item) => {
    const email = item.user_email;
    const subject = encodeURIComponent(`Regarding your item: ${item.name}`);

    let bodyMsg;
    if (item.status == "lost") {
      bodyMsg = `Hello,\n\nI found your item: ${item.name}.\nLocation: ${item.location}\n\nPlease respond soon.\n\nThanks.\n${currentUser.displayName}`;
    } else {
      bodyMsg = `Hello,\n\nYou have my item: ${item.name}.\nLocation: ${item.location}\n\nPlease respond as soon as possible.\n\nThanks.\n${currentUser.displayName}`;
    }
    const body = encodeURIComponent(bodyMsg);

    const gmailURL = `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}&body=${body}`;

    window.open(gmailURL, "_blank");
  };

  return (
    <div className="modal-container">
      <div onClick={closeModal} className="modal-overlay"></div>

      <div className="modal-box">
        <div onClick={closeModal} className="modal-box-close">
          <i className="ri-close-large-line"></i>
        </div>

        <div className="modal-item-img">
          <img src={item.imageURL} />
        </div>
        <div className="modal-body">
          <div className="modal-header">
            <h3 className="">{item.name}</h3>
            <span
              className={`tag ${item.status == "found" ? "found" : "lost"}`}
            >
              {item.status}
            </span>
          </div>
          <div className="modal-subtext">
            <p className="modal-description">{item.description}</p>
            <div className="modal-location">
              <span>📍location: </span>
              <p>{item.location}</p>
            </div>
            <div className="modal-date-time">
              <span>📅Date & Time: </span>
              <p>
                {item.date}, {item.time}
              </p>
            </div>
            <div className="modal-user">
              <span>👤posted by: </span>
              <p>{item.user_name}</p>
            </div>
            <div className="modal-btn">
              {currentUser.uid == item.user_id ? (
                <button
                  className="deleting"
                  onClick={() => handleDelete(item)}
                >
                  Delete <i className="ri-delete-bin-7-fill"></i>
                </button>
              ) : (
                <button className="modal-edit" onClick={() => handleContact(item)}>
                  Contact <i className="ri-user-search-fill"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
