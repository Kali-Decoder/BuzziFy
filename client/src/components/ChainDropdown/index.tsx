"use client";
import { useChain } from "@/context/ChainContext";
import React, { useEffect } from "react";
import Dropdown from "../Resusables/Dropdown";


const ChainDropdown = () => {
  const { setChainDetail, chainDetail } = useChain();
  const chains = [
    {
      name: "Base Sepolia",
      url: "https://sepolia.basescan.org/address/0xdebcd0975753bfe290ce7ca42ffb5ce7917463f2",
      id: "84532",
    }
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
