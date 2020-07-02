import HttpClient from '../http-client'

export const FILTER_INSTRUMENTS = 'instrument/FILTER_INSTRUMENTS'

export const CHANGE_INSTRUMENT_SELECTION_REQUEST =
  'instrument/CHANGE_INSTRUMENT_SELECTION_REQUEST'
export const CHANGE_INSTRUMENT_SELECTION_REQUEST_SUCCEED =
  'instrument/CHANGE_INSTRUMENT_SELECTION_REQUEST_SUCCEED'
export const CHANGE_INSTRUMENT_SELECTION_REQUEST_FAILED =
  'instrument/CHANGE_INSTRUMENT_SELECTION_REQUEST_FAILED'

export const LOAD_SELECTION_REQUEST = 'instrument/LOAD_SELECTION_REQUEST'
export const LOAD_SELECTION_REQUEST_SUCCEED =
  'instrument/LOAD_SELECTION_REQUEST_SUCCEED'
export const LOAD_SELECTION_REQUEST_FAILED =
  'instrument/LOAD_SELECTION_REQUEST_FAILED'

const initialState = {
  instrumentsList: [
    {
      instrumentId: 1,
      name: 'Euro US Dollar',
      symbol: 'EUR/USD',
      instrumentType: 'currency',
    },
    {
      instrumentId: 10,
      name: 'Euro SwissFranc',
      symbol: 'EUR/CHF',
      instrumentType: 'currency',
    },
    {
      instrumentId: 9,
      name: 'Euro JapaneseYen',
      symbol: 'EUR/JPY',
      instrumentType: 'currency',
    },
    {
      instrumentId: 956731,
      name: 'Investing.com EuroIndex',
      symbol: 'inveur',
      instrumentType: 'indice',
    },
    {
      instrumentId: 2124,
      name: 'US DollarEuro',
      symbol: 'USD/EUR',
      instrumentType: 'currency',
    },
    {
      instrumentId: 976573,
      name: 'Sygnia Itrix Euro Stoxx 50ETF',
      symbol: 'SYGEUJ',
      instrumentType: 'etf',
    },
    {
      instrumentId: 997393,
      name: 'NewWave EUR Currency Exchange TradedNote',
      symbol: 'NEWEURJ',
      instrumentType: 'etf',
    },
    {
      instrumentId: 998227,
      name: 'Diesel European GasoilFutures',
      symbol: 'DSEL1c1',
      instrumentType: 'commodity',
    },
    {
      instrumentId: 175,
      name: 'Euro Stoxx50',
      symbol: 'STOXX50',
      instrumentType: 'indice',
    },
    {
      instrumentId: 15978,
      name: 'Euronet WorldwideInc',
      symbol: 'EEFT',
      instrumentType: 'equities',
    },
    {
      instrumentId: 6,
      name: 'Euro BritishPound',
      symbol: 'EUR/GBP',
      instrumentType: 'currency',
    },
    {
      instrumentId: 15,
      name: 'Euro AustralianDollar',
      symbol: 'EUR/AUD',
      instrumentType: 'currency',
    },
    {
      instrumentId: 16,
      name: 'Euro CanadianDollar',
      symbol: 'EUR/CAD',
      instrumentType: 'currency',
    },
    {
      instrumentId: 52,
      name: 'Euro New ZealandDollar',
      symbol: 'EUR/NZD',
      instrumentType: 'currency',
    },
    {
      instrumentId: 1487,
      name: 'Australian DollarEuro',
      symbol: 'AUD/EUR',
      instrumentType: 'currency',
    },
    {
      instrumentId: 1525,
      name: 'Canadian DollarEuro',
      symbol: 'CAD/EUR',
      instrumentType: 'currency',
    },
  ],
  isLoadingChangeSelected: false,
  isLoadingSelectedList: false,
  selectedInstruments: {},
  instrumentFilter: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER_INSTRUMENTS:
      return {
        ...state,
        instrumentFilter: action.query,
      }

    case CHANGE_INSTRUMENT_SELECTION_REQUEST:
      return {
        ...state,
        isLoadingChangeSelected: true,
      }

    case CHANGE_INSTRUMENT_SELECTION_REQUEST_SUCCEED:
      return {
        ...state,
        selectedInstruments: action.isSelected
          ? { ...state.selectedInstruments, [action.instrumentId]: true }
          : { ...state.selectedInstruments, [action.instrumentId]: undefined },
        isLoadingChangeSelected: false,
      }

    case CHANGE_INSTRUMENT_SELECTION_REQUEST_FAILED:
      return {
        ...state,
        isLoadingChangeSelected: false,
      }

    case LOAD_SELECTION_REQUEST:
      return {
        ...state,
        isLoadingSelectedList: true,
      }

    case LOAD_SELECTION_REQUEST_SUCCEED:
      return {
        ...state,
        selectedInstruments: action.selectedInstruments,
        isLoadingSelectedList: false,
      }

    case LOAD_SELECTION_REQUEST_FAILED:
      return {
        ...state,
        isLoadingSelectedList: false,
      }

    default:
      return state
  }
}

export const changeInstrumentSelection = (instrumentId, isSelected) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_INSTRUMENT_SELECTION_REQUEST,
    })

    HttpClient.setSelectedInstrument(instrumentId, isSelected)
      .then(() =>
        dispatch({
          type: CHANGE_INSTRUMENT_SELECTION_REQUEST_SUCCEED,
          instrumentId,
          isSelected,
        })
      )
      .catch(() => {
        dispatch({
          type: CHANGE_INSTRUMENT_SELECTION_REQUEST_FAILED,
          instrumentId,
        })
      })
  }
}

const getSelectedInstrumentsFromResult = (result) => {
  return result.reduce((result, selectedInstrument) => {
    result[selectedInstrument.instrumentId] = true
    return result
  }, {})
}

export const filterInstruments = (query) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_INSTRUMENTS,
      query,
    })
  }
}

export const loadInstrumentSelection = () => {
  return (dispatch) => {
    dispatch({
      type: LOAD_SELECTION_REQUEST,
    })

    HttpClient.getSelectedInstruments()
      .then((selectedList) => {
        dispatch({
          type: LOAD_SELECTION_REQUEST_SUCCEED,
          selectedInstruments: getSelectedInstrumentsFromResult(selectedList),
        })
      })
      .catch((err) => {
        dispatch({
          type: LOAD_SELECTION_REQUEST_FAILED,
        })
      })
  }
}
