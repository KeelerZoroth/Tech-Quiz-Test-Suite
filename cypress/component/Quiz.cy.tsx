import React from 'react'
import Quiz from '../../client/src/components/Quiz.js'

describe('<Quiz />', () => {
  it('renders', () => {
    cy.mount(<Quiz />)
  })
})
