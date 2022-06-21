import PropTypes from "prop-types"

//Style
import style from "./Separator.module.css"
const Separator = ({ colorLine, margin, total }) => {
  return (
    <div className={`
    ${margin == "yes" ? style.separator : style.separatorNoMargin} 
      ${colorLine == "one" ? style.colorOne : style.colorTwo}
      ${total == "no" ? style.normal : style.total}`} />
  )
}

Separator.propTypes = {
  colorLine: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired
}

Separator.defaultProps = {
  colorLine: "one",
  margin: "yes",
  total: "no"
}

export default Separator