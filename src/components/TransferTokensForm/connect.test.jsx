import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import createStore from '../../store/configureStore'
import connect from './connect'

describe('connect(Component)', () => {
  it('injects certain props and renders without crashing', () => {
    const { store } = createStore()
    const ConnectedTestComponent = connect(props => {
      expect(props).toBeDefined()
      expect(props).toHaveProperty('validateEtherTx')
      expect(props).toHaveProperty('sendEtherTx')
      expect(props).toHaveProperty('validateTransferTokensTx')
      expect(props).toHaveProperty('sendTransferTokensTx')
      return null
    })

    mount(
      <Provider store={store}>
        <ConnectedTestComponent />
      </Provider>
    )
  })
})
