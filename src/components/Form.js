import React from 'react'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      convertedRoutes: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.getRoutes(this.state.value)
  }

  getRoutes(formData) {
    const convertedRoutes = []
    const laravelRouteRegEx = /Route::get\('(.+)',\ function\s\(\)\s\{\n\s+?return\ redirect\('(.+)'(?:.*)\);\n(\s+)}\);/g //eslint-disable-line
    formData.replace(laravelRouteRegEx, (match, oldURL, newURL) => {
      convertedRoutes.push(`<RedirectWithStatus status={301} from="${oldURL}" to="${newURL}" />`)
    })
    this.setState({convertedRoutes})
  }

  render() {
    return (
      <React.Fragment>
      {this.state.convertedRoutes.length > 0 ? (
        <ul className="results">
          {this.state.convertedRoutes.map((route) => <li key="{route}">{route}</li>)}
        </ul>
      ) : (
        <form className="form" onSubmit={this.handleSubmit}>
        <label>
          <textarea
          name="routes"
          cols="100"
          rows="20"
          value={this.state.value}
          onChange={this.handleChange}
          >
            Enter routes here...
          </textarea>
        </label>
        <input type="submit" className="button" value="Submit" />
      </form>
      )}
      </React.Fragment>
    )
  }
}

export default Form