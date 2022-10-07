import React from "react";
import PropTypes from "prop-types";

const Messasge = ({ msg }) => {
  return (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
      {msg}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

Messasge.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Messasge;
