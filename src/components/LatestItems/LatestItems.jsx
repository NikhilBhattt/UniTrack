import "./LatestItems.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { getItemsData } from "../../config/getItemsData";

function BrowseItems() {
  const navigate = useNavigate();

  // sample dummy data — replace with firebase data
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    getItemsData(setItemsData);
  }, [itemsData]);

  return (
    <div className="latest-container">
      <h2 className="latest-title">Recently Reported Items</h2>
      <p className="latest-desc">
        Here are the newest lost and found items on campus
      </p>

      <div className="latest-grid">
        {itemsData.slice(0, 3).map((item, index) => (
          <div key={index} className="latest-card">
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
        ))}
      </div>

      <Button
        text="View All Items"
        onClickFunc={() => navigate("/all-items")}
      />
    </div>
  );
}

export default BrowseItems;
