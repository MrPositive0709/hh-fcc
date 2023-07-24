// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

contract ManualToken {
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) allowance;

    function transfer(address from, address to, uint256 amount) public {
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    ) public returns (bool success) {
        require(_amount <= allowance[_from][msg.sender]);
        allowance[_from][msg.sender] -= _amount;
        transfer(_from, _to, _amount);
        return true;
    }
}
