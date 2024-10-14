"use client";
import { useChain } from "@/context/ChainContext";
import React, { useEffect } from "react";
import Dropdown from "../Resusables/Dropdown";


const ChainDropdown = () => {
  const { setChainDetail, chainDetail } = useChain();

  const chains = [
    {
      name: "Kii Chain",
      url: "https://app.kiichain.io/kiichain/tx/0x4a699a7cb88ca89aa3d88cd0e6c985163e39119be6412ecef6f735e1347a8cf2",
      id: "123454321",
    },
    {
      name: "Rootstock",
      url: "https://explorer.testnet.rootstock.io/address/0x5c7176e3e2511577e495ae8872eb1a84fd7959e1",
      id: "2",
    },
    {
      name: "Aptos",
      url: "https://explorer.aptoslabs.com/txn/86687535/changes?network=devnet",
      id: "3",
    },
    {
      name: "Polygon Amoy",
      url: "https://www.oklink.com/amoy/address/0x93073de0d67ecfbbc44321ef7e4d33bcf7f53b9a",
      id: "80002",
    },
    {
      name: "EduChain",
      url: "https://opencampus-codex.blockscout.com/address/0xBCab4ba549886e6BEF67d9f3d381a2710316F8CA",
      id: "5",
    },
    {
      name: "Wan-Chain",
      url: "https://testnet.wanscan.org/address/0xBCab4ba549886e6BEF67d9f3d381a2710316F8CA",
      id: "6",
    },
    {
      name: "Core-DAO",
      url: "https://scan.test.btcs.network/address/0xBCab4ba549886e6BEF67d9f3d381a2710316F8CA",
      id: "7",
    },
    {
      name: "Manta Chain",
      url: "https://pacific-explorer.sepolia-testnet.manta.network/address/0xBCab4ba549886e6BEF67d9f3d381a2710316F8CA",
      id: "8",
    },
    {
      name: "Holesky",
      url: "https://pacific-explorer.sepolia-testnet.manta.network/address/0xBCab4ba549886e6BEF67d9f3d381a2710316F8CA",
      id: "8",
    },
  ];

  const savedChainId = localStorage.getItem("selectedChainId");

  useEffect(() => {
    if (savedChainId) {
      const savedChain = chains.find(
        (chain) => chain.id === savedChainId
      );
      if (savedChain) {
        setChainDetail(savedChain);
      }
    }
  }, [savedChainId, setChainDetail]);

  const handleSelectChain = (chain : any) => {
    setChainDetail(chain);
    localStorage.setItem("selectedChainId", chain.id);
  };

  return (
    <Dropdown
      items={chains}
      label="Supported Chains"
      onSelect={handleSelectChain}
      selectedItem={chainDetail}
    />
  );
};

export default ChainDropdown;
