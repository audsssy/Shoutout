const ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newMember',
        type: 'address',
      },
    ],
    name: 'addMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'scores',
        type: 'uint256[]',
      },
      {
        internalType: 'address[]',
        name: 'recipients',
        type: 'address[]',
      },
    ],
    name: 'giveShoutout',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initiator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxScore',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'memberCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'members',
    outputs: [
      {
        internalType: 'bool',
        name: 'isMember',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'score',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_topic',
        type: 'string',
      },
    ],
    name: 'submitVoteTopic',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'topicCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'topics',
    outputs: [
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'yea',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'nay',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'didPass',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'didVeto',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_topicNumber',
        type: 'uint256',
      },
    ],
    name: 'veto',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_topicNumber',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_yeaOrNay',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_vote',
        type: 'uint256',
      },
    ],
    name: 'voteTopic',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
export default ABI