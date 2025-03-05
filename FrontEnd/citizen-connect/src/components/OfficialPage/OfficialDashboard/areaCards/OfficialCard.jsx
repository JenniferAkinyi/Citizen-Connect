import PropTypes from "prop-types";
import { MdOutlineCrisisAlert, MdOutlineFolder } from "react-icons/md";
import "./OfficialCards.css";

const OfficialCard = ({ colors, cardInfo }) => {
  return (
    <div className="area-card">
      <div className="area-card-info">
        <h5 className="info-title">{cardInfo.title}</h5>
        <div className="info-value">{cardInfo.value}</div>
        <p className="info-text">{cardInfo.text}</p>
      </div>
    </div>
  );
};

export default OfficialCard;

OfficialCard.propTypes = {
  colors: PropTypes.array.isRequired,
  percentFillValue: PropTypes.number.isRequired,
  cardInfo: PropTypes.object.isRequired,
};