import React from 'react'
import styled from 'styled-components'
import { Label, Tab, Tabs, Button, Dialog } from '@blueprintjs/core'
import { DarkMode, Theme, SmallText } from '../../components/Common'
// import type { CreateWalletParams } from '../../types/createWallet'
import { Link } from "react-router-dom"
import appTomoLogoUrl from '../../assets/images/app_tomo_logo.svg'

type Props = {
  selectedTabId: string,
  handleTabChange: void => void,
  privateKeyStatus: string,
  privateKey: string,
  mnemonicStatus: string,
  mnemonic: string,
  handlePrivateKeyChange: void => void, 
  unlockWalletWithPrivateKey: void => void,
  handleMnemonicChange: void => void,
  unlockWalletWithMnemonic: void => void,
  password: string,
  handlePasswordChange: void => void,
}

class LoginPageRenderer extends React.PureComponent<Props> {

  render() {
    const {
      selectedTabId,
      handleTabChange,
      privateKeyStatus,
      privateKey,
      mnemonicStatus,
      mnemonic,
      handlePrivateKeyChange, 
      unlockWalletWithPrivateKey,
      handleMnemonicChange,
      unlockWalletWithMnemonic,
      password,
      passwordStatus,
      handlePasswordChange,
      addresses,
      isOpenAddressesDialog,
      toggleAddressesDialog,
      loginWithLedgerWallet,
      getMultipleAddresses,
    } = this.props

    return (
      <Wrapper>
        <ImportWalletWrapper>
          <HeaderTitle>Import your Wallet</HeaderTitle>
          <SubTitle>If you don't have a wallet go <LinkWrapper to="/create">Create new wallet</LinkWrapper></SubTitle>

          <TabsWrapper id="import-list" onChange={handleTabChange} selectedTabId={selectedTabId}>
            <Tab 
              id="private-key" 
              title="Private Key" 
              panel={
                <PrivateKey 
                  privateKey={privateKey} 
                  privateKeyStatus={privateKeyStatus} 
                  handlePrivateKeyChange={handlePrivateKeyChange} 
                  unlockWalletWithPrivateKey={unlockWalletWithPrivateKey}
                  password={password}
                  passwordStatus={passwordStatus}
                  handlePasswordChange={handlePasswordChange} />
              } />

            <Tab 
              id="seed-phrase" 
              title="Mnemonic Phrase" 
              panel={
                <MnemonicPhrase 
                  mnemonic={mnemonic} 
                  mnemonicStatus={mnemonicStatus} 
                  handleMnemonicChange={handleMnemonicChange} 
                  unlockWalletWithMnemonic={unlockWalletWithMnemonic}
                  password={password}
                  passwordStatus={passwordStatus}
                  handlePasswordChange={handlePasswordChange} />
              } />

            <Tab id="ledger" title="Ledger Nano S" panel={
              <LedgerDevice 
                addresses={addresses}
                isOpenAddressesDialog={isOpenAddressesDialog}
                toggleAddressesDialog={toggleAddressesDialog}
                loginWithLedgerWallet={loginWithLedgerWallet}
                getMultipleAddresses={getMultipleAddresses} />
            } />
            <Tab id="trezor" title="Trezor" panel={<div></div>} />
          </TabsWrapper>
        </ImportWalletWrapper>
      </Wrapper>
    )
  }
}

const PrivateKey = (props) => {
  const { 
    privateKey, 
    privateKeyStatus, 
    handlePrivateKeyChange, 
    unlockWalletWithPrivateKey,
    password,
    passwordStatus,
    handlePasswordChange,
  } = props

  return (
    <React.Fragment>
      <LabelWrapper>
        <LabelTitle>Enter your private key</LabelTitle> 
        <InputGroupWrapper marginBottom="5px" type="text" value={privateKey} isInvalid={privateKeyStatus === 'invalid'} onChange={handlePrivateKeyChange} />
      </LabelWrapper>
      {(privateKeyStatus === 'invalid') && (<ErrorMessage>Private key invalid</ErrorMessage>)}

      <LabelWrapper>
        <LabelTitle>Temporary session password</LabelTitle> 
        <InputGroupWrapper type="password" value={password} onChange={handlePasswordChange} isInvalid={passwordStatus === 'invalid'} marginBottom="5px" />
      </LabelWrapper>          
      <SmallText>Password need 8 or more characters, at least an upper case, symbol and a number</SmallText>

      <ButtonWrapper onClick={unlockWalletWithPrivateKey} disabled={passwordStatus !== 'valid' || privateKeyStatus !== 'valid'}>Unlock Wallet</ButtonWrapper>
    </React.Fragment>
  )
}

const MnemonicPhrase = (props) => {
  const { 
    mnemonic,
    mnemonicStatus, 
    handleMnemonicChange, 
    unlockWalletWithMnemonic,
    password, 
    passwordStatus,
    handlePasswordChange,
  } = props

  return (
    <React.Fragment>
      <LabelWrapper>
        <LabelTitle>Please enter your 12 word phrase</LabelTitle> 
        <TextAreaWrapper value={mnemonic} isInvalid={mnemonicStatus === 'invalid'} onChange={handleMnemonicChange} />
      </LabelWrapper>
      {(mnemonicStatus === 'invalid') && (<ErrorMessage>Invalid Mnemonic. Mnemonic must be 12 words long</ErrorMessage>)}

      <LabelWrapper>
        <LabelTitle>Temporary session password</LabelTitle> 
        <InputGroupWrapper type="password" value={password} onChange={handlePasswordChange} isInvalid={passwordStatus === 'invalid'} marginBottom="5px" />
      </LabelWrapper>          
      <SmallText>Password need 8 or more characters, at least an upper case, symbol and a number</SmallText>

      <ButtonWrapper disabled={passwordStatus !== 'valid' || mnemonicStatus !== 'valid'} onClick={unlockWalletWithMnemonic}>Unlock Wallet</ButtonWrapper>
    </React.Fragment>
  )
}

const LedgerDevice = (props) => {
  const { 
    addresses, 
    isOpenAddressesDialog,
    toggleAddressesDialog,
    loginWithLedgerWallet,
    getMultipleAddresses,
  } = props

  return (
    <LedgerWrapper>
      <Title>1. Enter PIN Code</Title>

      <LedgerImageBox>       
        <LedgerImageBody>
          <LedgerScreen>
            <PasswordSymbol>******</PasswordSymbol>            
          </LedgerScreen>
          <LedgerCircle />
        </LedgerImageBody>

        <LedgerImageHead />
      </LedgerImageBox>

      <Title>2. Open TomoChain</Title>

      <LedgerImageBox>       
        <LedgerImageBody>
          <LedgerScreen>
            <img src={appTomoLogoUrl} alt="app Tomo logo"/>          
          </LedgerScreen>
          <LedgerCircle />
        </LedgerImageBody>

        <LedgerImageHead />
      </LedgerImageBox>

      <InstructionBox>
        <Title color={DarkMode.ORANGE} cursor="pointer">Having Connection Issues?</Title>
        <Title color={DarkMode.ORANGE} cursor="pointer">Usage Instructions</Title>
      </InstructionBox>

      <ButtonWrapper onClick={() => toggleAddressesDialog('open')}>Connect to Ledger</ButtonWrapper>
      <AddressesDialog 
        addresses={addresses}
        isOpenAddressesDialog={isOpenAddressesDialog}
        onClose={toggleAddressesDialog}
        loginWithLedgerWallet={loginWithLedgerWallet}
        getMultipleAddresses={getMultipleAddresses} />
    </LedgerWrapper>
  )
}

class AddressesDialog extends React.PureComponent {

  componentDidMount = async () => {
    const { getMultipleAddresses } = this.props

    await getMultipleAddresses()
  }

  render() {
    const { 
      addresses, 
      loginWithLedgerWallet, 
      isOpenAddressesDialog, 
      onClose,
      getMultipleAddresses,
    } = this.props

    return (
      <Dialog
        className="dark-dialog"
        onClose={onClose}
        title="Address"
        isOpen={isOpenAddressesDialog}>

        <div>Select an address to use:</div>

        <AddressListBox addresses={addresses} loginWithLedgerWallet={loginWithLedgerWallet} />

        <ButtonWrapper marginTop="0px" onClick={ async () => await getMultipleAddresses() }>Load more</ButtonWrapper>
      </Dialog>
    )
  }
}

const AddressListBox = (props) => {
  const { addresses, loginWithLedgerWallet } = props

  if (!addresses || addresses.length === 0) return <AddressList />

  const addressItems = addresses.map((address, index) => {
    return (
      <AddressItem key={ index }
        onClick={() => loginWithLedgerWallet(address)}>
        {index}. {address}
      </AddressItem>
    )
  })

  return (

    <AddressList>
      { addressItems }
    </AddressList>
  )
}

export default LoginPageRenderer

const Wrapper = styled.div``

const TabsWrapper = styled(Tabs)`
  margin-top: 35px;

  .bp3-tab-list {
    justify-content: space-between;

    .bp3-tab {
      margin: 0;

      &:last-child {
        text-align: right;
      }
    }

    .bp3-tab-indicator-wrapper {
      display: block;

      .bp3-tab-indicator {
        height: 2px;
        background-color: ${DarkMode.ORANGE};
      }
    }
  }

  .bp3-tab-panel {
    padding: 45px 25px 30px;
  }
`

const TextAreaWrapper = styled.textarea`
  width: 100%;
  min-height: 128px !important;
  padding: 15px;
  background-color: ${DarkMode.BLACK};
  margin-bottom: 5px;
  resize: none;
  font-size: ${Theme.FONT_SIZE_LG};
  color: ${DarkMode.WHITE};
  border: ${props => props.isInvalid ? `1px solid ${DarkMode.RED} !important` : 'none'};

  &:focus {
    border: 1px solid ${DarkMode.ORANGE};
  }
`

const ImportWalletWrapper = styled.div`
  width: 395px;
  margin: 50px auto 0;
`

const HeaderTitle = styled.h1`
  color: ${DarkMode.WHITE};
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  line-height: 24px;
`

const LinkWrapper = styled(Link)`
  color: ${DarkMode.ORANGE};

  &:hover {
    color: ${DarkMode.DARK_ORANGE};
  }
`

const SubTitle = styled.div`
  text-align: center;
`

const LabelWrapper = styled(Label)`
  margin-bottom: 0 !important;
  &:not(:first-child) {
    margin-top: 35px;
  }
`

const LabelTitle = styled.div`
  margin-bottom: 25px;
`

const ButtonWrapper = styled(Button)`
  display: block;
  margin-top: ${props => props.marginTop ? props.marginTop : '45px'};
  width: 100%;
  text-align: center;
  color: ${DarkMode.BLACK} !important;
  border-radius: 0;
  background-color: ${DarkMode.ORANGE} !important;
  box-shadow: none !important;
  background-image: none !important;
  height: 40px;
  &:hover {
    background-color: ${DarkMode.DARK_ORANGE} !important;
  }

  &.bp3-disabled {
    cursor: default !important;
    background-color: ${DarkMode.GRAY} !important;
  }
`

const InputGroupWrapper = styled.input`
  height: 50px;
  color: ${DarkMode.WHITE};
  font-size: ${Theme.FONT_SIZE_LG};
  padding: 15px;
  margin-top: 0 !important;
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : '35px'};
  background: ${DarkMode.BLACK};
  border: ${props => props.isInvalid ? `1px solid ${DarkMode.RED} !important` : 'none'};
  width: 100%;

  &:focus {
    border: 1px solid ${DarkMode.ORANGE};
  }
`

const ErrorMessage = styled.div`
  color: ${DarkMode.RED};
  font-size: 12px;
`

const LedgerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  color: ${props => props.color ? props.color : 'inherit'}
  cursor: ${props => props.cursor ? props.cursor : 'initial'};
`

const LedgerImageBox = styled.div`
  position: relative;
  padding-left: 16px;
  width: 162px;
  margin-top: 20px;
  margin-bottom: 40px;
`

const LedgerImageBody = styled.div`
  width: 146px;
  height: 41px;
  border-radius: 6px;
  background-color: ${DarkMode.BLACK};
`

const LedgerImageHead = styled.div`
  width: 16px;
  height: 18px;
  background-color: ${DarkMode.LIGHT_BLUE};
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  &::before,
  &::after {
    content: " ";
    width: 9px;
    height: 3px;
    display: inline-block;
    background-color: ${DarkMode.BLACK};
    position: absolute;
    left: 4px;
    top: 4px;
  }

  &::after {
    top: 11px;
  }
`

const LedgerScreen = styled.div`
  width: 85px;
  height: 18px;
  text-align: center;
  background-color: ${DarkMode.LIGHT_BLUE};
  position: absolute;
  left: 35px;
  top: 50%;
  transform: translateY(-50%);
`

const LedgerCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${DarkMode.LIGHT_BLUE};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
`

const PasswordSymbol = styled.span`
  display: inline-block;
  padding-top: 3px;
  color: ${DarkMode.ORANGE};
`

const InstructionBox = styled.div`
  width: 100%;  
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
`

const AddressList = styled.ul`
  height: 140px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 10px;
`

const AddressItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:nth-child(2n+1) {
    background-color: ${DarkMode.BLACK};
  }

  &:hover {
    background-color: ${DarkMode.BLUE};
  }
`
