// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Simple contract to track money transfers for fraud investigation
contract TraceableTransactions {
    // Who owns this contract (the exchange)
    address public owner;

    // Who can flag suspicious transactions (the investigator)
    address public investigator;

    // Counter for transaction IDs
    uint256 public txCounter = 0;

    // Simple structure for each transaction
    struct Transaction {
        uint256 id;
        address sender;
        address receiver;
        uint256 amount;
        uint256 time;
        bool suspicious;
        string note;
    }

    // Store all transactions
    Transaction[] public allTransactions;

    // Store which transactions belong to which user
    mapping(address => uint256[]) public userTxIds;

    // Store real names for addresses (KYC)
    mapping(address => string) public realName;

    // Event when transaction is recorded
    event NewTransaction(
        uint256 id,
        address sender,
        address receiver,
        uint256 amount
    );

    // Event when transaction is flagged
    event Flagged(uint256 id, string reason);

    // Only owner can call certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    // Only investigator can call certain functions
    modifier onlyInvestigator() {
        require(msg.sender == investigator, "Only investigator");
        _;
    }

    // Setup the contract
    constructor() {
        owner = msg.sender;
        investigator = msg.sender; // Deployer is both owner and investigator
    }

    // MAIN FUNCTION: Record a transaction
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

        // Save it
        allTransactions.push(newTx);

        // Remember this user was involved
        userTxIds[_sender].push(txCounter);
        userTxIds[_receiver].push(txCounter);

        // Announce it
        emit NewTransaction(txCounter, _sender, _receiver, _amount);

        txCounter++;
    }

    // Get one transaction by ID
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

    // Get all transaction IDs for a user
    function getUserTransactions(address _user)
        public
        view
        returns (uint256[] memory)
    {
        return userTxIds[_user];
    }

    // BONUS: Trace where money went from an address
    function traceFlow(address _startAddress)
        public
        view
        returns (
            uint256[] memory txIds,
            address[] memory froms,
            address[] memory tos
        )
    {
        // Temporary storage
        uint256[] memory tempTxIds = new uint256[](allTransactions.length);
        address[] memory tempFroms = new address[](allTransactions.length);
        address[] memory tempTos = new address[](allTransactions.length);
        uint256 count = 0;

        // Start with the given address
        address currentAddress = _startAddress;

        // Keep looking until no more transactions found
        bool found = true;

        while (found) {
            found = false;

            // Go through all transactions
            for (uint256 i = 0; i < allTransactions.length; i++) {
                // If sender matches current address
                if (allTransactions[i].sender == currentAddress) {
                    // Check if we already added this transaction
                    bool alreadyAdded = false;
                    for (uint256 j = 0; j < count; j++) {
                        if (tempTxIds[j] == allTransactions[i].id) {
                            alreadyAdded = true;
                            break;
                        }
                    }

                    // If not added yet, add it
                    if (!alreadyAdded) {
                        tempTxIds[count] = allTransactions[i].id;
                        tempFroms[count] = allTransactions[i].sender;
                        tempTos[count] = allTransactions[i].receiver;
                        count++;

                        // Now use receiver as next address to search
                        currentAddress = allTransactions[i].receiver;
                        found = true;
                        break; // Found one, now search from receiver
                    }
                }
            }
        }

        // Copy to final arrays
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

    // BONUS: Flag suspicious transaction
    function flagTransaction(uint256 _id, string memory _reason)
        public
        onlyInvestigator
    {
        allTransactions[_id].suspicious = true;
        allTransactions[_id].note = _reason;

        emit Flagged(_id, _reason);
    }

    // BONUS: Get all suspicious transactions
    function getSuspiciousTransactions()
        public
        view
        returns (uint256[] memory)
    {
        // Count how many are suspicious
        uint256 count = 0;
        for (uint256 i = 0; i < allTransactions.length; i++) {
            if (allTransactions[i].suspicious) {
                count++;
            }
        }

        // Create array of suspicious IDs
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

    // BONUS: Save real name for address
    function saveRealName(address _user, string memory _name) public onlyOwner {
        realName[_user] = _name;
    }

    // Simple function to check if there's a loop
    function checkLoop(address _startAddress) public view returns (bool) {
        // Get all addresses from traceFlow (skip txIds and froms)
        (, , address[] memory tos) = traceFlow(_startAddress);

        // Check if starting address appears in any of the "to" addresses
        for (uint256 i = 0; i < tos.length; i++) {
            if (tos[i] == _startAddress) {
                // Found a loop!
                return true;
            }
        }

        // No loop found
        return false;
    }

    // Helper: Get real name or show address
    function getName(address _addr) internal view returns (string memory) {
        if (bytes(realName[_addr]).length > 0) {
            return realName[_addr];
        }
        return "Unknown";
    }

    // Helper: Convert number to string
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

    // Get total number of transactions
    function getTotalTransactions() public view returns (uint256) {
        return allTransactions.length;
    }
}
