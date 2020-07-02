import React, { PureComponent } from 'react'
import { ListGroup } from 'react-bootstrap'
import InstrumentItem from './InstrumentItem'

class InstrumentItemsGroup extends PureComponent {
  render() {
    const { title, instruments } = this.props

    return (
      <div>
        <h3>{title}</h3>
        <ListGroup key="title">
          {instruments.map((instrumentItem) => (
            <InstrumentItem
              key={instrumentItem.instrumentId}
              instrumentItem={instrumentItem}
            />
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default InstrumentItemsGroup
