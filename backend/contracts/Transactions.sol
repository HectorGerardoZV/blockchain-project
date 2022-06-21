//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Transactions {
    uint256 transactionCounter;

    event Transfer(address from, address to, uint amount, string message,uint256 timestamp, string topic );
    struct TransferStruct {
        address from;
        address to;
        uint amount;
        string message;
        uint256 timestamp;
        string topic;
    }
    TransferStruct [] transactions ;

    function addToBlockchain (address payable to, uint amount, string memory message, string memory topic) public {
        transactionCounter++;

        transactions.push(TransferStruct(msg.sender, to, amount, message, block.timestamp, topic));
        emit Transfer(msg.sender, to, amount, message, block.timestamp, topic);
    }

    function getAllTransactions () public view returns (TransferStruct[] memory){
        return transactions;
    }
    
    function getTransactionCounter () public view returns (uint256){
        return transactionCounter;
    }


}
