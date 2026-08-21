Feature: Modernized Customer_Relationship_Management Module Testing

  Background:
    Given the user is logged into the modernized CRM system
    And the user navigates to the Management Dashboard

  Scenario: Create a new customer profile successfully using legacy map specifications
    When the user accesses the "Create Customer" section corresponding to mapset "BNK1CCM"
    And fills in the customer details with:
      | Field Name  | Value               |
      | Company     | Global Bank Corp    |
      | Title       | Mr.                 |
      | First Name  | John                |
      | Middle Name | Alan                |
      | Last Name   | Doe                 |
      | Address 1   | 123 Main Street     |
      | Address 2   | Suite 400           |
      | City        | New York            |
      | Postcode    | 10001               |
      | Country     | USA                 |
      | Birth Date  | 15/08/1985          |
      | Sort Code   | 12-34-56            |
      | Credit Score| 750                 |
      | Score Date  | 01/01/2023          |
    And submits the customer registration form
    Then the system creates the customer record
    And displays the confirmation message "Customer profile created successfully" mapped to "MESSAGE"
    And generates a unique Customer Number mapped to "CUSTNO2"

  Scenario: Retrieve and view account details for an existing customer
    When the user accesses the "Account Inquiry" section corresponding to mapset "BNK1CAM"
    And enters the Customer Number "CUST100982" and Account Number "ACC98765432"
    And clicks the lookup button
    Then the system populates the account details panel with fields:
      | Screen Field     | Mapped Value      |
      | Company          | Global Bank Corp  |
      | Account Type     | SAVINGS           |
      | Interest Rate    | 2.50              |
      | Overdraft Limit  | 500.00            |
      | Sort Code        | 12-34-56          |
      | Open Date        | 10/05/2020        |
      | Last Stmt Date   | 01/10/2023        |
      | Next Stmt Date   | 01/11/2023        |
      | Available Balance| 1250.50           |
      | Actual Balance   | 1300.00           |

  Scenario: Transfer funds between accounts using legacy map specs
    Given the user navigates to the "Funds Transfer" section corresponding to mapset "BNK1TFM"
    When the user enters transfer details with:
      | Field          | Value        |
      | From Account   | 11223344     |
      | From Sort Code | 12-34-56     |
      | To Account     | 55667788     |
      | To Sort Code   | 65-43-21     |
      | Amount         | 250.00       |
    And confirms the fund transfer execution
    Then the system updates the balances as follows:
      | Account Type | Account Number | Updated Actual Balance | Updated Available Balance |
      | From Account | 11223344       | 750.00                 | 750.00                    |
      | To Account   | 55667788       | 1250.00                | 1250.00                   |
    And displays the status message "Transfer Completed Successfully" in field "MESSAGE"

  Scenario: Update account parameters and overdraft limits
    When the user accesses the "Update Account" section corresponding to mapset "BNK1UAM"
    And retrieves the account "ACC98765432" for Customer "CUST100982"
    And updates the following attributes:
      | Attribute        | New Value |
      | Interest Rate    | 3.10      |
      | Overdraft Limit  | 1000.00   |
    And submits the account update request
    Then the system records the updated interest rate "3.10" and overdraft limit "1000.00"
    And confirms with message "Account updated successfully" in field "MESSAGE"