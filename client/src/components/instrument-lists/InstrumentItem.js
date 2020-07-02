import React, { PureComponent } from 'react'
import { ListGroup, Badge, Button } from 'react-bootstrap'

class InstrumentItem extends PureComponent {
  render() {
    const { name, symbol, button } = this.props.instrumentItem
    return (
      <ListGroup.Item>
        <Badge variant="secondary">{symbol}</Badge>
        {' ' + name + ' '}

        {button ? (
          <Button size="sm" variant="secondary" onClick={button.action}>
            {button.title}
          </Button>
        ) : null}
      </ListGroup.Item>
    )
  }
}

export default InstrumentItem
