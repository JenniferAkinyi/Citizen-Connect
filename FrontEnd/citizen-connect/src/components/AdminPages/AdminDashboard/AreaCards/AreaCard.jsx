import PropTypes from "prop-types";
import { MdOutlineCrisisAlert, MdOutlineFolder } from "react-icons/md";
import "./AreaCards.css";

const AreaCard = ({ colors, cardInfo }) => {
  return (
    <div className="area-card">
      <div className="area-card-info">
        <h5 className="info-title">{cardInfo.title}</h5>
        <div className="info-value">{cardInfo.value}</div>
        <p className="info-text">{cardInfo.text}</p>
      </div>
      {/* <div className="area-card-icon">
        <MdOutlineCrisisAlert size={50} color={colors[1]} />
        <MdOutlineFolder size={50} color={colors[1]} />
      </div> */}
    </div>
  );
};

export default AreaCard;

AreaCard.propTypes = {
  colors: PropTypes.array.isRequired,
  percentFillValue: PropTypes.number.isRequired,
  cardInfo: PropTypes.object.isRequired,
};