// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint public required;
    
    struct Transaction{
        address to;
        uint value;
        bool executed;
        bytes data;
    }
    Transaction[] public transactions;
    mapping(uint =>mapping (address => bool)) public confirmations;

    error InputsNotValid();

    constructor(address[] memory _owners, uint _required){
        if((_required > _owners.length) || !(_required > 0 ) || (_owners.length == 0)){
            revert InputsNotValid();
        }
        owners = _owners;
        required = _required;
    }
    modifier onlyOwners(){
        bool flag = false;
        for(uint i=0; i < owners.length; i++){
            if(msg.sender == owners[i]){
                flag = true;
            }
        }
        require(flag);
        _;
    }

    function addTransaction(address _to, uint _value, bytes calldata _data) internal returns(uint){
        Transaction memory tnx = Transaction(_to, _value, false, _data);
        transactions.push(tnx);
        return transactions.length - 1;
    }

    function transactionCount() public view returns(uint){
        return transactions.length;
    }
    function confirmTransaction(uint _transactionId) public onlyOwners{
        confirmations[_transactionId][msg.sender] = true;
        if(getConfirmationsCount(_transactionId) >= required){
            executeTransaction(_transactionId);
        }
    }
    function getConfirmationsCount(uint transactionId) public view returns(uint){
        uint totalConfirmations;
        for (uint i=0; i < owners.length; i++ ){
            if(confirmations[transactionId][owners[i]]){
                totalConfirmations += 1;
            }
        }
        
        return totalConfirmations;
    }

    function submitTransaction(address _to, uint _value, bytes calldata _data) external{

        uint transactionId = addTransaction(_to, _value, _data);
        confirmTransaction(transactionId);
    }
    function isConfirmed(uint _transactionId) public view returns(bool){
        return getConfirmationsCount(_transactionId) >= required;
    }

    function executeTransaction(uint _transactionId) public{
        require(isConfirmed(_transactionId));
        (bool sent,) = payable(transactions[_transactionId].to).call{value: transactions[_transactionId].value}(transactions[_transactionId].data);
        require(sent);
        transactions[_transactionId].executed = true;

    }

    receive() external payable{}
}
