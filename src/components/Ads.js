import { useState } from "react";

const Ads = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`ads ${isOpen ? "open" : "closed"}`}>
      {isOpen && (
        <div className="ad-content">
          {/* Add your ad content here */}
          <p>This is an ad. Click close to continue.</p>
          <button onClick={handleClose}>X</button>
        </div>
      )}
    </div>
  );
};

export default Ads;
