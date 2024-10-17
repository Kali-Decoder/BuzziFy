export const KiiTestnet = {
    id: 123454321,
    testnet: true,
    name: 'Kii Chain Testnet',
    iconUrl: "https://streamnft-chain.s3.ap-south-1.amazonaws.com/ancient8.webp",
    rpcUrls: {
      default: {
        http: ['https://a.sentry.testnet.kiivalidator.com:8645'],
      },
      public: {
        http: ['https://a.sentry.testnet.kiivalidator.com:8645'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Kii Chain Testnet Explorer',
        url: 'https://app.kiichain.io/kiichain',
      },
    },
    nativeCurrency: {
      decimals: 18,
      name: 'KII',
      symbol: 'KII',
    },
  };