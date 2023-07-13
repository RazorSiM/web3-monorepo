//contracts/SampleERC20.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SampleERC20 is ERC20 {

    uint256 constant initialSupply = 1000000 * (10 ** 18);

    constructor() ERC20("Sample ERC20", "SERC20") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}