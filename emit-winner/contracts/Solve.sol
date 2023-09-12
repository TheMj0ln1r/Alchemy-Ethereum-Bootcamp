// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ContractInterface {
     function attempt() external;
}

contract Solve {
    event Success();
    ContractInterface contractInterface;
    function callAttempt(address contractAddr) external{
        contractInterface = ContractInterface(contractAddr);
        try contractInterface.attempt(){
            emit Success();
        }
        catch(bytes memory){}
    }
}