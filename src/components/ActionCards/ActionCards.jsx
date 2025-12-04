import { useNavigate } from "react-router-dom";
import "./ActionCards.css";

function ActionCards() {
  const actions = [
    {
      icon: "🔍",
      title: "Browse Reports",
      text: "View all lost & found posts",
      navigate: "/all-items",
    },
    {
      icon: "📝",
      title: "Post an Item",
      text: "Submit details with image",
      navigate: "/report-item",
    },
    // { icon: "🎯", title: "Matches", text: "See possible matches" },
  ];

  const navigate = useNavigate();

  return (
    <div className="qac-main-container">
      <h3 className="qac-heading">What would you like to do?</h3>
      <div className="qac-container">
        {actions.map((item, index) => (
          <div
            onClick={() => navigate(item.navigate)}
            key={index}
            className="qac-card"
          >
            <span className="qac-icon">{item.icon}</span>
            <h3 className="qac-title">{item.title}</h3>
            <p className="qac-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActionCards;
