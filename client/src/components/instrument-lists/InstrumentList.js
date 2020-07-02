import React, { PureComponent } from 'react'
import InstrumentItemsGroup from './InstrumentItemsGroup'
import { groupBy } from '../../helpers'

class InstrumentList extends PureComponent {
  render() {
    const grouped = groupBy(
      this.props.instruments,
      (instrument) => instrument.instrumentType
    )

    return (
      <div>
        {Array.from(grouped.entries()).map(([key, value]) => (
          <InstrumentItemsGroup title={key} key={key} instruments={value} />
        ))}
      </div>
    )
  }
}

export default InstrumentList
