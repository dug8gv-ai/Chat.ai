// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract EngagementPoints is AccessControl {
    bytes32 public constant REWARDER_ROLE = keccak256("REWARDER_ROLE");

    mapping(address => uint256) public points;
    mapping(bytes32 => bool) public consumedEvent;

    event PointsAwarded(address indexed user, uint256 amount, bytes32 indexed reasonCode, bytes32 eventId);

    constructor(address admin, address rewarder) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(REWARDER_ROLE, rewarder);
    }

    function award(
        address user,
        uint256 amount,
        bytes32 reasonCode,
        bytes32 eventId
    ) external onlyRole(REWARDER_ROLE) {
        require(!consumedEvent[eventId], "duplicate_event");
        consumedEvent[eventId] = true;
        points[user] += amount;
        emit PointsAwarded(user, amount, reasonCode, eventId);
    }

    function awardBatch(
        address[] calldata users,
        uint256[] calldata amounts,
        bytes32[] calldata reasonCodes,
        bytes32[] calldata eventIds
    ) external onlyRole(REWARDER_ROLE) {
        require(
            users.length == amounts.length &&
                amounts.length == reasonCodes.length &&
                reasonCodes.length == eventIds.length,
            "length_mismatch"
        );

        for (uint256 i = 0; i < users.length; i++) {
            require(!consumedEvent[eventIds[i]], "duplicate_event");
            consumedEvent[eventIds[i]] = true;
            points[users[i]] += amounts[i];
            emit PointsAwarded(users[i], amounts[i], reasonCodes[i], eventIds[i]);
        }
    }
}
