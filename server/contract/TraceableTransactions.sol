// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract TraceableTransactions {

    address public owner;
    address public investigator;

    uint256 public txCounter = 0;

    struct Transaction {
        uint256 id;
        address sender;
        address receiver;
        uint256 amount;
        uint256 time;
        bool suspicious;
        string note;
    }

    Transaction[] public allTransactions;

    mapping(address => uint256[]) public userTxIds;

    mapping(address => string) public realName;

    event NewTransaction(
        uint256 id,
        address sender,
        address receiver,
        uint256 amount
    );

    event Flagged(uint256 id, string reason);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyInvestigator() {
        require(msg.sender == investigator, "Only investigator");
        _;
    }

    constructor() {
        owner = msg.sender;
        investigator = msg.sender; // Deployer is both owner and investigator
    }
   // function to record Trxn
    function recordTransaction(
        address _sender,
        address _receiver,
        uint256 _amount
    ) public onlyOwner {
        // Create new transaction
        Transaction memory newTx = Transaction({
            id: txCounter,
            sender: _sender,
            receiver: _receiver,
            amount: _amount,
            time: block.timestamp,
            suspicious: false,
            note: ""
        });

        allTransactions.push(newTx);

        userTxIds[_sender].push(txCounter);
        userTxIds[_receiver].push(txCounter);

        emit NewTransaction(txCounter, _sender, _receiver, _amount);

        txCounter++;
    }

    // Get one transaction by id
    function getTransaction(uint256 _id)
        public
        view
        returns (
            address sender,
            address receiver,
            uint256 amount,
            uint256 time,
            bool suspicious,
            string memory note
        )
    {
        Transaction memory transaction = allTransactions[_id];
        return (
            transaction.sender,
            transaction.receiver,
            transaction.amount,
            transaction.time,
            transaction.suspicious,
            transaction.note
        );
    }

    // Get all transaction ids for a user
    function getUserTransactions(address _user)
        public
        view
        returns (uint256[] memory)
    {
        return userTxIds[_user];
    }

    // Trace trxn for address
    function traceFlow(address _startAddress)
        public
        view
        returns (
            uint256[] memory txIds,
            address[] memory froms,
            address[] memory tos
        )
    {
        uint256[] memory tempTxIds = new uint256[](allTransactions.length);
        address[] memory tempFroms = new address[](allTransactions.length);
        address[] memory tempTos = new address[](allTransactions.length);
        uint256 count = 0;

        address currentAddress = _startAddress;

        bool found = true;

        while (found) {
            found = false;

            for (uint256 i = 0; i < allTransactions.length; i++) {
                // If sender matches current address
                if (allTransactions[i].sender == currentAddress) {
                    bool alreadyAdded = false;
                    for (uint256 j = 0; j < count; j++) {
                        if (tempTxIds[j] == allTransactions[i].id) {
                            alreadyAdded = true;
                            break;
                        }
                    }

                    if (!alreadyAdded) {
                        tempTxIds[count] = allTransactions[i].id;
                        tempFroms[count] = allTransactions[i].sender;
                        tempTos[count] = allTransactions[i].receiver;
                        count++;

                        currentAddress = allTransactions[i].receiver;
                        found = true;
                        break; 
                    }
                }
            }
        }

        txIds = new uint256[](count);
        froms = new address[](count);
        tos = new address[](count);

        for (uint256 i = 0; i < count; i++) {
            txIds[i] = tempTxIds[i];
            froms[i] = tempFroms[i];
            tos[i] = tempTos[i];
        }

        return (txIds, froms, tos);
    }
    // function to flag and trxn
    function flagTransaction(uint256 _id, string memory _reason)
        public
        onlyInvestigator
    {
        allTransactions[_id].suspicious = true;
        allTransactions[_id].note = _reason;

        emit Flagged(_id, _reason);
    }

    function getSuspiciousTransactions()
        public
        view
        returns (uint256[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < allTransactions.length; i++) {
            if (allTransactions[i].suspicious) {
                count++;
            }
        }

        uint256[] memory suspicious = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < allTransactions.length; i++) {
            if (allTransactions[i].suspicious) {
                suspicious[index] = i;
                index++;
            }
        }

        return suspicious;
    }

    //  Save real name for address
    function saveRealName(address _user, string memory _name) public onlyOwner {
        realName[_user] = _name;
    }

    // function to check if there's a loop
    function checkLoop(address _startAddress) public view returns (bool) {
        (, , address[] memory tos) = traceFlow(_startAddress);

        for (uint256 i = 0; i < tos.length; i++) {
            if (tos[i] == _startAddress) {
                return true;
            }
        }

        return false;
    }

    function getName(address _addr) internal view returns (string memory) {
        if (bytes(realName[_addr]).length > 0) {
            return realName[_addr];
        }
        return "Unknown";
    }

    //  Convert number to string
    function uintToString(uint256 v) internal pure returns (string memory) {
        if (v == 0) return "0";

        uint256 digits;
        uint256 temp = v;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }

        bytes memory buffer = new bytes(digits);
        while (v != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(v % 10)));
            v /= 10;
        }

        return string(buffer);
    }

    // total number of transactions
    function getTotalTransactions() public view returns (uint256) {
        return allTransactions.length;
    }
}
