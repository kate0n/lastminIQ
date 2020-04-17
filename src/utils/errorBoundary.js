import React, { Component } from "react"

export const withErrorBoundary = WrappedComponent =>
  class extends Component {
    constructor(props) {
      super(props)
      this.state = { error: null, errorInfo: null }
    }

    componentDidMount = () => console.log("withErrorBoundary!!")

    componentDidCatch = (error, errorInfo) => {
      this.setState({
        error: error,
        errorInfo: errorInfo,
      })
    }

    render() {
      if (this.state.errorInfo) {
        return (
          <div style={{ color: "#000000" }}>
            <h2>Something went wrong.</h2>
            <div>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </div>
          </div>
        )
      }
      // Normally, just render children
      return <WrappedComponent {...this.props} />
    }
  }
