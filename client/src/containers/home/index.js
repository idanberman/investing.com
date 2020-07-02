import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  changeInstrumentSelection,
  loadInstrumentSelection,
  filterInstruments,
} from '../../modules/instruments'
import { Container, Row, Col } from 'react-bootstrap'

import InstrumentList from '../../components/instrument-lists/InstrumentList'
import FilterInput from '../../components/filter/FilterInput'

const getInstrumentListItems = (props, filterInstruments = '') => {
  const instrumentsList =
    filterInstruments && filterInstruments.length === 0
      ? props.instrumentsList
      : props.instrumentsList.filter((instrument) =>
          instrument.name
            .toLowerCase()
            .includes(filterInstruments.toLowerCase())
        )

  return instrumentsList.map((instrument) => ({
    ...instrument,
    button: props.selectedInstruments[instrument.instrumentId]
      ? null
      : {
          title: 'select',
          action: () =>
            props.changeInstrumentSelection(instrument.instrumentId, true),
        },
  }))
}
const getSelectedInstruments = (props) => {
  return props.instrumentsList
    .filter((instrument) => props.selectedInstruments[instrument.instrumentId])

    .map((instrument) => ({
      ...instrument,
      button: {
        title: 'remove',
        action: () =>
          props.changeInstrumentSelection(instrument.instrumentId, false),
      },
    }))
}

class Home extends Component {
  componentDidMount() {
    this.props.loadInstrumentSelection()
  }
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <h1>Instruments</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <FilterInput
              value={this.props.instrumentFilter}
              onChange={this.props.filterInstruments}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InstrumentList
              instruments={getInstrumentListItems(
                this.props,
                this.props.instrumentFilter
              )}></InstrumentList>
          </Col>

          <Col>
            <InstrumentList
              instruments={getSelectedInstruments(this.props)}></InstrumentList>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = ({ instruments }) => ({
  instrumentsList: instruments.instrumentsList,
  isLoading: instruments.isLoading,
  selectedInstruments: instruments.selectedInstruments,
  instrumentFilter: instruments.instrumentFilter,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeInstrumentSelection,
      loadInstrumentSelection,
      filterInstruments,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
