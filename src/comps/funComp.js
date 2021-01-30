function Hello(props) {
  return <h2>hello, {props.name}</h2>
}
function Welcom(props) {
  return <Hello {...props} />
}

export default Welcom;