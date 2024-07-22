// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

error MinimumDepositAmountInvalid();
error InsufficientFundToStartInsurance();
error NotAValidPid();
error NotEnoughFund();
error NotValidParticularPid();
error NotValidMonthsKept();
error RegisteredAsACustomer();
error InvalidCreator();

contract Insurance {
    address public immutable owner;

    struct InsuranceSchemes {
        uint256 pid;
        address payable creator;
        string name;
        string description;
        string coverage;
        uint256 min_deposition_amount;
        uint256 deposit_amount_monthwise;
        uint256 duration;
        uint256 totalamount;
        uint256 no_of_investors;
        string insurance_type;
        uint256 safe_fees;
        address[] inverstorPid;
    }

    struct Customer {
        string name;
        address payable custAddress;
        uint256 age;
    }

    mapping(address => InsuranceSchemes) public investment_made;
    mapping(address => InsuranceSchemes) public investment_bought;
    mapping(uint256 => InsuranceSchemes) public insurance_scheme_list;
    mapping(uint256 => InsuranceSchemes) public car_insurance_scheme_list;
    mapping(uint256 => InsuranceSchemes) public health_insurance_scheme_list;
    mapping(uint256 => InsuranceSchemes) public buisness_insurance_scheme_list;
    mapping(uint256 => InsuranceSchemes) public home_insurance_scheme_list;
    mapping(uint256 => InsuranceSchemes) public others_insurance_scheme_list;
    mapping(uint256 => mapping(address => uint256)) public amountKept;
    mapping(uint256 => mapping(address => uint256)) public monthKept;
    mapping(uint256 => mapping(address => bool)) public requestPid;
    mapping(uint256 => address) public investors;
    mapping(address => bool) public isACustomer;
    Customer[] customers;
    InsuranceSchemes[] insurances;
    uint256 totalCountInvestments = 0;
    uint256 totalCountCarinvestment = 0;
    uint256 totalCountHouseInvestment = 0;
    uint256 totalCountHealthInvestment = 0;
    uint256 totalCountBusinessInvestment = 0;
    uint256 totalCountOthersInvestment = 0;
    uint256 totalInvestors = 0;

    event InsuranceAdded(
        uint256 pid,
        address payable creator,
        string name,
        string description,
        string coverage,
        uint256 min_deposition_amount,
        uint256 deposit_amount_monthwise,
        uint256 duration,
        uint256 totalamount,
        string insurance_type,
        uint256 safe_fees
    );
    event InitialDepositAmount(
        uint256 pid,
        uint256 amount,
        bool success,
        bytes data
    );
    event PaymentSuccess(uint256 pid);
    event RequestSuccess(uint256 pid, bool status);
    event MoneyReturned(uint256 pid, uint256 value, bool success);

    constructor() {
        owner = msg.sender;
    }

    function createInsurance(
        string memory _name,
        string memory _description,
        string memory _coverage,
        uint256 _min_deposit_amount,
        uint256 _deposit_amount_monthwise,
        uint256 _duration,
        string memory _insurance_type,
        uint256 _safe_fees
    ) external payable {
        if (msg.value < _safe_fees) revert InsufficientFundToStartInsurance();

        totalCountInvestments++;
        InsuranceSchemes storage insurancescheme = insurance_scheme_list[
            totalCountInvestments
        ];
        insurancescheme.pid = totalCountInvestments;
        insurancescheme.creator = payable(msg.sender);
        insurancescheme.name = _name;
        insurancescheme.description = _description;
        insurancescheme.coverage = _coverage;

        if (_min_deposit_amount == 0) revert MinimumDepositAmountInvalid();
        insurancescheme.min_deposition_amount = _min_deposit_amount;
        insurancescheme.deposit_amount_monthwise = _deposit_amount_monthwise;
        insurancescheme.safe_fees = _safe_fees;
        amountKept[insurancescheme.pid][msg.sender] = msg.value;
        insurancescheme.duration = _duration;
        insurancescheme.insurance_type = _insurance_type;

        addInsuranceToCategory(insurancescheme);

        insurancescheme.totalamount = msg.value;
        investment_made[insurancescheme.creator] = insurancescheme;
        insurances.push(insurancescheme);
        emit InsuranceAdded(
            insurancescheme.pid,
            insurancescheme.creator,
            insurancescheme.name,
            insurancescheme.description,
            insurancescheme.coverage,
            insurancescheme.min_deposition_amount,
            insurancescheme.deposit_amount_monthwise,
            insurancescheme.duration,
            insurancescheme.totalamount,
            insurancescheme.insurance_type,
            insurancescheme.safe_fees
        );
    }

    function addInsuranceToCategory(
        InsuranceSchemes storage insurancescheme
    ) internal {
        if (
            keccak256(abi.encodePacked(insurancescheme.insurance_type)) ==
            keccak256(abi.encodePacked("car"))
        ) {
            totalCountCarinvestment++;
            car_insurance_scheme_list[insurancescheme.pid] = insurancescheme;
        } else if (
            keccak256(abi.encodePacked(insurancescheme.insurance_type)) ==
            keccak256(abi.encodePacked("house"))
        ) {
            totalCountHouseInvestment++;
            home_insurance_scheme_list[insurancescheme.pid] = insurancescheme;
        } else if (
            keccak256(abi.encodePacked(insurancescheme.insurance_type)) ==
            keccak256(abi.encodePacked("business"))
        ) {
            totalCountBusinessInvestment++;
            buisness_insurance_scheme_list[
                insurancescheme.pid
            ] = insurancescheme;
        } else if (
            keccak256(abi.encodePacked(insurancescheme.insurance_type)) ==
            keccak256(abi.encodePacked("health"))
        ) {
            totalCountHealthInvestment++;
            health_insurance_scheme_list[insurancescheme.pid] = insurancescheme;
        } else if (
            keccak256(abi.encodePacked(insurancescheme.insurance_type)) ==
            keccak256(abi.encodePacked("others"))
        ) {
            totalCountOthersInvestment++;
            others_insurance_scheme_list[insurancescheme.pid] = insurancescheme;
        }
    }

    function depositInitialAmount(uint256 _pid) external payable {
        if (_pid > totalCountInvestments) revert NotAValidPid();
        InsuranceSchemes storage insurancescheme = insurance_scheme_list[_pid];
        if (insurancescheme.min_deposition_amount > msg.value)
            revert NotEnoughFund();
        (bool success, bytes memory data) = insurancescheme.creator.call{
            value: msg.value
        }("");
        if (success) {
            insurancescheme.no_of_investors++;
            insurancescheme.totalamount += msg.value;
            investment_bought[msg.sender] = insurancescheme;
            investors[_pid] = msg.sender;
            amountKept[_pid][msg.sender] = msg.value;
            insurancescheme.inverstorPid.push(msg.sender);
        }
        emit InitialDepositAmount(_pid, msg.value, success, data);
    }

    function depositMonthly(uint256 _pid) external payable {
        if (_pid > totalCountInvestments) revert NotAValidPid();
        InsuranceSchemes storage insurancescheme = insurance_scheme_list[_pid];
        if (msg.value < insurancescheme.deposit_amount_monthwise)
            revert NotEnoughFund();
        (bool success, ) = insurancescheme.creator.call{value: msg.value}("");
        if (success) {
            if (amountKept[_pid][msg.sender] != 0) {
                amountKept[_pid][msg.sender] += msg.value;
                monthKept[_pid][msg.sender]++;
            }
        }
        emit PaymentSuccess(_pid);
    }

    function requestMoney(uint256 _pid) external {
        if (_pid > totalCountInvestments) revert NotAValidPid();
        // InsuranceSchemes storage insurancescheme = insurance_scheme_list[_pid];
        requestPid[_pid][msg.sender] = true;
        emit RequestSuccess(_pid, true);
    }

    function payMoney(uint256 _pid) external payable {
        InsuranceSchemes storage insurancescheme = insurance_scheme_list[_pid];
        uint256 nosGranted;
        if (_pid > totalCountInvestments) revert NotAValidPid();
        if (insurancescheme.creator != msg.sender)
            revert NotValidParticularPid();
        for (uint256 i = 0; i < insurancescheme.no_of_investors; i++) {
            address payable requestor = payable(
                insurancescheme.inverstorPid[i]
            );
            if (requestPid[_pid][requestor]) {
                if (monthKept[_pid][requestor] < insurancescheme.duration)
                    revert NotValidMonthsKept();
                (bool success, ) = requestor.call{
                    value: amountKept[_pid][requestor]
                }("");
                if (success) {
                    nosGranted++;
                    requestPid[_pid][requestor] = false;
                }
                emit MoneyReturned(_pid, amountKept[_pid][requestor], success);
            }
        }
        insurancescheme.no_of_investors -= nosGranted;
    }

    function getInsurance(
        uint256 _pid
    ) external view returns (InsuranceSchemes memory) {
        if (_pid > totalCountInvestments) revert NotAValidPid();
        return insurance_scheme_list[_pid];
    }

    function requestRegistration(string memory _name, uint256 _age) external {
        if (isACustomer[msg.sender]) revert RegisteredAsACustomer();
        totalInvestors++;
        Customer memory customer = Customer({
            name: _name,
            custAddress: payable(msg.sender),
            age: _age
        });
        customers.push(customer);
        isACustomer[msg.sender] = true;
    }

    function withdraw(uint256 _pid) external {
        InsuranceSchemes storage insurancescheme = insurance_scheme_list[_pid];
        if (insurancescheme.creator != msg.sender) revert InvalidCreator();

        require(
            address(this).balance >= insurancescheme.safe_fees,
            "Insufficient funds"
        );

        // Transfer the specified amount to the owner
        (bool success, ) = insurancescheme.creator.call{
            value: insurancescheme.safe_fees
        }("");
        require(success, "Transfer failed");
    }

    function getAllInsurances()
        public
        view
        returns (InsuranceSchemes[] memory)
    {
        return insurances;
    }

    fallback() external payable {}

    receive() external payable {}
}
