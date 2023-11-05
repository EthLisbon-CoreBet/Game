import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserName } from "../store";
import { default as socket } from "./ws";
import { Web3AuthOptions } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base'
import { Web3AuthModalPack, Web3AuthConfig } from '@safe-global/auth-kit'



var initialized = false

const options: Web3AuthOptions = {
  clientId: process.env.WEB3_AUTH_CLIENT_ID,
  web3AuthNetwork: 'testnet',
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1115',
    rpcTarget: "https://polygon-testnet.public.blastapi.io"
  },
  uiConfig: {
    theme: 'dark',
    loginMethodsOrder: ['google', 'facebook']
  }
}

const modalConfig = {
  [WALLET_ADAPTERS.TORUS_EVM]: {
    label: 'torus',
    showOnModal: false
  },
  [WALLET_ADAPTERS.METAMASK]: {
    label: 'metamask',
    showOnDesktop: true,
    showOnMobile: false
  }
}

const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: 'mandatory'
  },
  adapterSettings: {
    uxMode: 'popup',
    whiteLabel: {
      name: 'Safe'
    }
  }
})

const web3AuthConfig: Web3AuthConfig = {
  txServiceUrl: 'https://safe-transaction-goerli.safe.global'
}


// Instantiate and initialize the pack
const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig)

useEffect(() => {
  const getSafeAddress = async () => {
    if (!initialized) {
      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig
      })
      initialized = true
    }
  }
  getSafeAddress()
}, [initialized])

// 

function Join() {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const userName = useSelector((state: any) => state.reduxStore.userName);




  const submitNickname = () => {

    // first connect with Safe Auth-kit
    // The signIn() method will return the user's Ethereum address
    // The await will last until the user is authenticated, so while the UI modal is showed
    const getSafeAddress = async () => {
      const authKitSignData = await web3AuthModalPack.signIn()
    }

    socket.emit("user nickname", nickname);
    dispatch(setUserName(nickname));
  };

  useEffect(() => {
    setIsButtonDisabled(3 > nickname.length);
  }, [nickname]);

  return (
    <div className={`card-box join-box ${userName ? "d-none" : ""}`}>
      <div className="join-title">Welcome to CoreBet</div>

      <form className="">
        <div className="join-hint">Please Insert Your Name</div>
        <input
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
          className=""
          placeholder=""
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            submitNickname();
          }}
          type="button"
          disabled={isButtonDisabled}
        >
          Connect
        </button>
      </form>
    </div>
  );
}

export default Join;
