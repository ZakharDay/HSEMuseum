class NewAnnotationButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
  }

  handleClick() {
    console.log(this.props)
    this.props.handleClick()
  }

  render() {
    return(
      <div className="NewAnnotationButton" onClick={ this.handleClick }>
        + Add Annotation
      </div>
    )
  }
}
