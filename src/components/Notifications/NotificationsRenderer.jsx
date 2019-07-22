// @flow
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@blueprintjs/core'
import { formatDistanceStrict } from 'date-fns'
import { Theme, DarkMode } from '../../components/Common'

export class NotificationsRenderer extends React.PureComponent {

  onScroll = (event) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target
    const { loading, getNotifications } = this.props

    if ((scrollHeight - scrollTop) === clientHeight && !loading) {
      getNotifications()
    }
  }
  
  render() {
    const { notifications, markNotificationRead } = this.props

    return (
      <React.Fragment>
        <NotificationTitle>Notification</NotificationTitle>
        <NotificationList onScroll={this.onScroll}>
          {
            notifications.map((notification, index) => {
              return (
                <Notification unread={notification.status === 'UNREAD'} key={index}>
                  <div>{notification.message}</div>
                  <NotificationDate>
                      <Icon icon="time" iconSize="12" />
                      <DistanceDate>{formatDistanceStrict(new Date(notification.updatedAt), new Date())}</DistanceDate>
                  </NotificationDate>
                  {(notification.status === 'UNREAD') && (<MarkRead onClick={() => markNotificationRead(notification.id)} icon="eye-open" iconSize="15" />)}
                  {(notification.status !== 'UNREAD') && (<MarkRead icon="eye-on" iconSize="15" />)}
                </Notification>
              )            
            })
          }
        </NotificationList>
      </React.Fragment>
    )
  }
}

export default NotificationsRenderer

const NotificationList = styled.div`
  height: 430px;
  width: 300px;
  overflow-x: hidden;
  color: ${props => props.theme.menuColor};
  background-color: ${props => props.theme.menuBg};
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, .5);
`

const NotificationTitle = styled.div`
  text-align: center;
  height: 35px;
  line-height: 35px;
  color: ${props => props.theme.menuColor};
  border-bottom: 1px solid ${props => props.theme.menuBorder};
  background-color: ${props => props.theme.menuBg};
`

const Notification = styled.div`
  position: relative;
  font-size: ${Theme.FONT_SIZE_SM};
  word-break: break-all;
  padding: 5px 15px;
  border-bottom: 1px solid ${props => props.theme.menuBorder};
  background-color: ${props => props.unread ? props.theme.subBg : 'inherit'};
  &:hover {
    background-color: ${props => props.theme.menuBgHover};
    .notification-status {
      display: block;
    }
  }
`

const MarkRead = styled(Icon).attrs({
  className: 'notification-status',
})`
  display: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
`

const NotificationDate = styled.div`
  display: flex;
  align-items: center;
  color: ${DarkMode.GRAY};
  margin-top: 5px;
`

const DistanceDate = styled.span`
  margin-left: 5px;
`
