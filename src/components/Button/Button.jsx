import "./Button.css";

function Button({ text, onClickFunc, outline="" }) {
  const handleClick = () => {
    onClickFunc();
  };

  return (
    <button className={`btn ` + (outline && 'outline')} onClick={handleClick}>
      <span>{text}</span>
      <i className="ri-arrow-right-line"></i>
    </button>
  );
}

export default Button;
