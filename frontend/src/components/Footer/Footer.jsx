

//Style
import style from "./Footer.module.css"
const Footer = () => {
  return (
    <div className={style.footer}>
      <p>{new Date().toLocaleDateString()}</p>
      <p>@All rights reserved</p>
    </div>
  )
}

export default Footer