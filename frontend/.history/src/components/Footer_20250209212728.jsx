import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Footer extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
          <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-600">
            Build your professional resume with ease. Download as PDF when you're ready.
          </p>
        </div>
      </footer>
      </div>
    )
  }
}

export default Footer
