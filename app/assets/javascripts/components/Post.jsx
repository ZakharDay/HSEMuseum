class Post extends React.Component {
  render() {
    return (
      <article>
        <h1 className="articleHeading">{this.props.title}</h1>
        <p>{this.props.body}</p>
      </article>
    )
  }
}
