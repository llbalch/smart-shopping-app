import { useSelector, useDispatch } from "react-redux";
import AddItemBar from "../AddItemBar/AddItemBar";
import favoriteIcon from "../../assets/images/heart.png";
import openEyeIcon from "../../assets/images/eye.png";
import closedEyeIcon from "../../assets/images/closedEye.png";


export default function Toolbar({
  onFavoritesClick,
  onAddItem,
  onSearch,
  completedVisible,
  onToggleCompleted,
}) {
  return (
    <div
      className="toolbar"
      style={{ display: "flex", alignItems: "center", gap: "1rem" }}
    >
      <button onClick={onFavoritesClick} aria-label="Open favorites">
        {
          <img
            src={favoriteIcon}
            alt="Favorites"
            style={{ width: 24, height: 24 }}
          />
        }
      </button>
      <div style={{ flex: 1 }}>
      <AddItemBar onAddItem={onAddItem} /> </div>
      <button onClick={onToggleCompleted} aria-label="Toggle completed">
        {
          <img
            src={completedVisible ? openEyeIcon : closedEyeIcon}
            alt={completedVisible ? "Hide Completed" : "Show Completed"}
            style={{ width: 24, height: 24 }}
          />
        }
      </button>
    </div>
  );
}
