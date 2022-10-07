import React from "react";
import PropTypes from "prop-types";

const Progress = ({ percentage }) => {
  return (
    <div className="progress mt-5">
      <div
        className="progress-bar"
        role="progressbar"
        aria-label="Example with label"
        style={{ width: `${percentage}%` }}
      >
        {percentage}
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Progress;
