export default function HelpIcon(props) {
  return <></> // Temporary

  const { info } = props
  return <i className="fa-regular fa-circle-question help">
    <span className="info">{info}</span>
  </i>
}