// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

interface ITokensRegistry {
    function addToken(address token_) external;
    function pauseToken(address token_) external;
    function resumeToken(address token_) external;
    function getSupportedTokens() external view returns (address[] memory);
    function isSupported(address token_) external view returns (bool);
    function isActive(address token_) external view returns (bool);
}