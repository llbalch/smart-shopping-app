import ReactDOM from "react-dom";

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div
      className="modal show d-block"
      style={{
        backgroundColor: "rgba(116, 112, 112, 0.5)",
        opacity: 1,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9000, // high value to ensure it's on top
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content" style={{
          backgroundColor: "whitesmoke",

        }}>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
