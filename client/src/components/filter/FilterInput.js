import React, { PureComponent } from 'react'
import { Form } from 'react-bootstrap'

class FilterInput extends PureComponent {
  render() {
    const {
      // value,
      onChange,
    } = this.props

    return (
      <Form.Group controlId="filter">
        <Form.Label>Search Instrument</Form.Label>
        <Form.Control
          placeholder="Search..."
          onChange={(event) => {
            onChange(event.target.value)
          }}
          //   value={value}
        />
      </Form.Group>
    )
  }
}

export default FilterInput
