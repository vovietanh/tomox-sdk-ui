// @flow
import React from 'react'
import WalletPageRenderer from './WalletPageRenderer'
import { Redirect } from 'react-router-dom'

import type { TokenData } from '../../types/tokens'

import { loadShowHelpModalSetting } from '../../store/services/storage'

type Props = {
  connected: boolean,
  accountAddress: string,
  tomoBalance: string,
  gasPrice: number,
  gas: number,
  authenticated: boolean,
  redirectToTradingPage: string => void,
  openConnection: void => void,
  toggleAllowance: string => void,
  tokenData: Array<TokenData>,
  baseTokens: Array<string>,
  quoteTokens: Array<string>,
  showHelpModal: boolean,
  closeHelpModal: void => void,
  balancesLoading: boolean,
}

class WalletPage extends React.PureComponent<Props> {

  checkOpenHelpModal = () => {
    const showHelpModalSetting = loadShowHelpModalSetting()
    const {
      authenticated,
      showHelpModal,
      balancesLoading,
    } = this.props

    if (!showHelpModalSetting) return false
    if (!authenticated) return false
    if (!showHelpModal) return false
    if (balancesLoading) return false

    return true
  };

  render() {
    const {
      connected,
      authenticated,
      accountAddress,
      tomoBalance,
      gasPrice,
      gas,
      toggleAllowance,
      redirectToTradingPage,
      tokenData,
      quoteTokens,
      baseTokens,
      closeHelpModal,
      balancesLoading,
      copyDataSuccess,
    } = this.props

    if (!authenticated) return <Redirect to="/unlock" />

    const isHelpModalOpen = false

    return (
      <WalletPageRenderer
        gas={gas}
        gasPrice={gasPrice}
        tomoBalance={tomoBalance}
        tokenData={tokenData}
        baseTokens={baseTokens}
        quoteTokens={quoteTokens}
        connected={connected}
        accountAddress={accountAddress}
        toggleAllowance={toggleAllowance}
        balancesLoading={balancesLoading}
        redirectToTradingPage={redirectToTradingPage}
        isHelpModalOpen={isHelpModalOpen}
        closeHelpModal={closeHelpModal}
        copyDataSuccess={copyDataSuccess}
      />
    )
  }
}

export default WalletPage
