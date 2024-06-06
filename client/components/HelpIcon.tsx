export default function HelpIcon(props) {
  const { info } = props
  return <i className="fa-regular fa-circle-question help">
    <span className="info">{info}</span>
  </i>
}