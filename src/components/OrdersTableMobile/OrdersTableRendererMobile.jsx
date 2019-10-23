//@flow
import React from 'react'
import styled from 'styled-components'
import {
  Tab,
  Icon,
  Tabs,
  Checkbox,
} from '@blueprintjs/core'
import { FormattedMessage } from 'react-intl'
import BigNumber from 'bignumber.js'

import { Colors, Loading, CenteredMessage, TmColors, Theme } from '../Common'
import { 
  formatDate, 
  capitalizeFirstLetter, 
  truncateZeroDecimal, 
} from '../../utils/helpers'
import type { Order } from '../../types/orders'
import tickUrl from '../../assets/images/tick.svg'
import FundsTable from '../FundsTable'

type Props = {
  loading: boolean,
  selectedTabId: string,
  onChange: string => void,
  toggleCollapse: void => void,
  cancelOrder: string => void,
  orders: {
    finished: Array<Order>,
    processing: Array<Order>,
  }
}

// const Status = {
//   'OPEN': 'Open',
//   'PARTIAL_FILLED': 'Partial',
//   'CANCELLED': 'Cancelled',  
//   'FILLED': 'Filled',
// }

const OrdersTableRendererMobile = (props: Props) => {
  const {
    loading,
    selectedTabId,
    onChange,
    cancelOrder,
    orders,
    isHideOtherPairs,
    handleChangeHideOtherPairs,
  } = props

  return (
    <React.Fragment>
      <TabsContainer selectedTabId={selectedTabId} onChange={onChange}>
        <Tab
          id="open-orders"
          title={<FormattedMessage 
            id="exchangePage.openOrders"
            values={{numberOfOrders: orders['processing'].length}} />}
          panel={
            <OrdersTablePanel
              loading={loading}
              orders={orders['processing']}
              cancelOrder={cancelOrder}
              selectedTabId={selectedTabId}
              isHideOtherPairs={isHideOtherPairs}
              handleChangeHideOtherPairs={handleChangeHideOtherPairs}
            />
          }
        />
        <Tab
          id="order-history"
          title={<FormattedMessage id="exchangePage.orderHistory" />}
          panel={
            <OrdersTablePanel
              loading={loading}
              orders={orders['finished']}
              cancelOrder={cancelOrder}
              selectedTabId={selectedTabId}
              isHideOtherPairs={isHideOtherPairs}
              handleChangeHideOtherPairs={handleChangeHideOtherPairs}
            />
          }
        />
        <Tab
          id="funds"
          title={<FormattedMessage id="exchangePage.funds" />}
          panel={
            <FundsTable />
          }
        />
      </TabsContainer>
    </React.Fragment>
  )
}

const OrdersTablePanel = (props: {
  loading: boolean,
  orders: Array<Order>,
  cancelOrder: string => void,
  selectedTabId: String,
  isHideOtherPairs: String,
  handleChangeHideOtherPairs: string => void,
}) => {
  const { 
    loading, 
    orders, 
    cancelOrder, 
    selectedTabId, 
    isHideOtherPairs, 
    handleChangeHideOtherPairs, 
  } = props
  
  if (loading) return <Loading />

  switch(selectedTabId) {
    case 'open-orders':
      return (<OpenOrderTable 
                orders={orders} 
                cancelOrder={cancelOrder} 
                isHideOtherPairs={isHideOtherPairs} 
                handleChangeHideOtherPairs={handleChangeHideOtherPairs} />)
    case 'order-history':
      return (<OrderHistoryTable 
                orders={orders} 
                cancelOrder={cancelOrder}
                isHideOtherPairs={isHideOtherPairs} 
                handleChangeHideOtherPairs={handleChangeHideOtherPairs} />)
    default:
      return (<div></div>)
  }
}

const OpenOrderTable = ({orders, cancelOrder, isHideOtherPairs, handleChangeHideOtherPairs}) => {
  return (
    <ListContainer>
      <CheckboxHidePairs checked={isHideOtherPairs} onChange={handleChangeHideOtherPairs} label="Hide other pairs" />

      <ListHeader>
        <HeaderCell width={"30%"}><FormattedMessage id="exchangePage.pair" /></HeaderCell>
        <HeaderCell width={"10%"}><FormattedMessage id="exchangePage.side" /></HeaderCell>
        <HeaderCell width={"25%"}><FormattedMessage id="exchangePage.price" /></HeaderCell>
        <HeaderCell width={"30%"}><FormattedMessage id="exchangePage.filledAmount" />/<FormattedMessage id="exchangePage.amount" /></HeaderCell>
        <HeaderCell width={"5%"}></HeaderCell>
      </ListHeader>

      {(orders.length === 0) && (<NoOrders><CenteredMessage message="No orders" /></NoOrders>)}

      {(orders.length > 0) &&
        (<ListBodyWrapper className="list">
          {orders.map((order, index) => (
            <Row key={index}>
              <Cell width={"30%"} title={order.pair} muted>
                {order.pair}
                <br />
                {formatDate(order.time, 'LL-dd HH:mm:ss')}
              </Cell>
              <Cell width={"10%"} className={`${order.side && order.side.toLowerCase() === "buy" ? "up" : "down"}`} muted>
                {order.side && capitalizeFirstLetter(order.side)}
              </Cell>
              <Cell width={"25%"} title={order.price} muted>
                {truncateZeroDecimal(order.price)}
              </Cell>
              <Cell width={"30%"} muted>
                {truncateZeroDecimal(order.filled)}
                <br />
                {truncateZeroDecimal(order.amount)}
              </Cell>
              <Cell width={"5%"} muted>
                <CancelIcon 
                  icon="cross" 
                  intent="danger" 
                  onClick={() => cancelOrder(order.hash)} />
              </Cell>
            </Row>
          ))}
        </ListBodyWrapper>)
      }
    </ListContainer>
  )
}

const OrderHistoryTable = ({orders, cancelOrder, isHideOtherPairs, handleChangeHideOtherPairs}) => {
  return (
    <ListContainer className="list-container">
      <CheckboxHidePairs checked={isHideOtherPairs} onChange={handleChangeHideOtherPairs} label="Hide other pairs" />

      <ListHeader className="header">
        <HeaderCell width={"30%"}><FormattedMessage id="exchangePage.pair" /></HeaderCell>
        <HeaderCell width={"10%"}><FormattedMessage id="exchangePage.side" /></HeaderCell>
        <HeaderCell width={"30%"}><FormattedMessage id="exchangePage.price" /></HeaderCell>
        <HeaderCell width={"30%"}><FormattedMessage id="exchangePage.filled" /></HeaderCell>
      </ListHeader>

      {(orders.length === 0) && (<NoOrders><CenteredMessage message="No orders" /></NoOrders>)}

      {(orders.length > 0) && 
        (<ListBodyWrapper className="list">
          {orders.map((order, index) => (
            <Row key={index}>
              <Cell width={"30%"} title={order.pair} muted>
                {order.pair}
                <br />
                {formatDate(order.time, 'LL-dd HH:mm:ss')}
              </Cell>
              <Cell width={"10%"} className={`${order.side && order.side.toLowerCase() === "buy" ? "up" : "down"}`} muted>
                {order.side && capitalizeFirstLetter(order.side)}
              </Cell>
              <Cell width={"30%"} title={order.price} muted>
                {truncateZeroDecimal(order.price)}
              </Cell>
              <Cell width={"30%"} muted>
                {order.filled && BigNumber(order.filledPercent).toFormat(2)}%
              </Cell>
            </Row>
          ))}
        </ListBodyWrapper>)
      }
    </ListContainer>
  )
}

const TabsContainer = styled(Tabs)`
  position: relative;  
  height: 100%;

  .bp3-tab-list {
    margin-bottom: 10px;
  }

  .bp3-tab-panel {
    height: calc(100% - 47px); // 30px is height, 15px is margin bottom of .bp3-tab-list 
  }

  .bp3-tab-list > *:not(:last-child) {
    margin-right: 0;
    padding-right: 25px !important;
  }

  .bp3-tab {
    font-size: ${Theme.FONT_SIZE_SM};
    user-select: none;
  }
`

const ListContainer = styled.div.attrs({
  className: 'list-container',
})`
  height: 100%;
`
const ListBodyWrapper = styled.ul.attrs({
  className: 'list',
})`
  height: calc(100% - 25px);
  width: 100%;
  margin: 0;
  overflow-y: auto;
`
const ListHeader = styled.li.attrs({
  className: 'header',
})`
  width: 100%;
  display: flex;
  margin: 0px !important;
  text-align: left;
  box-shadow: 0 1px 0 0 ${props => props.theme.border};
  padding: 0 10px 10px 10px;
`

const Row = styled.li.attrs({
  className: 'order-row',
})`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // height: 45px;
  line-height: 18px;
  padding: 5px 10px;
  &:nth-child(2n + 1) {
    background: ${props => props.theme.subBg};
  }
`

const Cell = styled.span.attrs({
  className: props => props.className,
})`
  color: ${props =>
    props.side === 'BUY'
      ? Colors.BUY
      : props.side === 'SELL'
      ? Colors.SELL
      : props.muted
      ? props.theme.textTable
      : Colors.WHITE}

  min-width: 35px;
  width: ${props => (props.width ? props.width : '10%')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const HeaderCell = styled.span.attrs({ className: props => props.className })`
  width: ${props => (props.width ? props.width : '10%')};
`

const CancelIcon = styled(Icon)`
  cursor: pointer;
`

const CheckboxHidePairs = styled(Checkbox)`
  font-size: ${Theme.FONT_SIZE_SM};
  text-align: center;
  margin-bottom: 0 !important;
  position: absolute;
  top: 2px;
  right: 10px;
  user-select: none;

  .bp3-control-indicator {
    box-shadow: none !important;
    background-image: none !important;
  }

  input:checked ~ .bp3-control-indicator {
    background-color: ${TmColors.ORANGE} !important;
  }

  input:checked ~ .bp3-control-indicator::before {
    background: url(${tickUrl}) no-repeat center center !important;
  }

  @media only screen and (max-width: 680px) {
    .tomo-wallet & {
      display: none;
    }
  }
`

const NoOrders = styled.div`
  height: calc(100% - 25px);
`

export default OrdersTableRendererMobile
