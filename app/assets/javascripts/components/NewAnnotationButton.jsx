class NewAnnotationButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
  }

  handleClick() {
    const { item, actions } = this.props
    const { handleAnnotationNewClick } = actions

    handleAnnotationNewClick(item)
  }

  render() {
    return(
      <div className="NewAnnotationButton" onClick={ this.handleClick }>
        + Add Annotation
      </div>
    )
  }
}
