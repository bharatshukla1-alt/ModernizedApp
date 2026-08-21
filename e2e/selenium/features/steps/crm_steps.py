from behave import given, when, then
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@given('the user is logged into the modernized CRM system')
def step_login(context):
    context.driver.get(f"{context.base_url}/login")
    username_input = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_locator((By.CSS_SELECTOR, '[data-testid="username"]'))
    )
    username_input.clear()
    username_input.send_keys("admin")
    
    password_input = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="password"]')
    password_input.clear()
    password_input.send_keys("AdminPass123!")
    
    context.driver.find_element(By.CSS_SELECTOR, '[data-testid="login-btn"]').click()
    WebDriverWait(context.driver, 10).until(
        EC.url_contains("/dashboard")
    )

@given('the user navigates to the Management Dashboard')
def step_dashboard_verify(context):
    header = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_locator((By.CSS_SELECTOR, '[data-testid="dashboard-header"]'))
    )
    assert "Management Dashboard" in header.text

@when('the user accesses the "{section_name}" section corresponding to mapset "{mapset}"')
@given('the user navigates to the "{section_name}" section corresponding to mapset "{mapset}"')
def step_navigate_mapset(context, section_name, mapset):
    nav_selector = f'[data-testid="nav-{mapset.lower()}"]'
    nav_btn = WebDriverWait(context.driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, nav_selector))
    )
    nav_btn.click()
    mapset_title = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_locator((By.CSS_SELECTOR, '[data-testid="mapset-title"]'))
    )
    assert mapset in mapset_title.text

@when('fills in the customer details with:')
def step_fill_customer_details(context):
    field_mapping = {
        "Company": "COMPANY",
        "Title": "CUSTTIT",
        "First Name": "CHRISTN",
        "Middle Name": "CUSTINS",
        "Last Name": "CUSTSN",
        "Address 1": "CUSTAD1",
        "Address 2": "CUSTAD2",
        "City": "CITY",
        "Postcode": "POSTCODE",
        "Country": "COUNTRY",
        "Sort Code": "SORTC",
        "Credit Score": "CREDSC"
    }
    
    for row in context.table:
        field_name = row['Field Name']
        val = row['Value']
        
        if field_name == "Birth Date":
            dd, mm, yyyy = val.split('/')
            context.driver.find_element(By.CSS_SELECTOR, '[data-testid="DOBDD"]').send_keys(dd)
            context.driver.find_element(By.CSS_SELECTOR, '[data-testid="DOBMM"]').send_keys(mm)
            context.driver.find_element(By.CSS_SELECTOR, '[data-testid="DOBYY"]').send_keys(yyyy)
        elif field_name == "Score Date":
            dd, mm, yyyy = val.split('/')
            context.driver.find_element(By.CSS_SELECTOR, '[data-testid="SCRDTDD"]').send_keys(dd)
            context.driver.find_element(By.CSS_SELECTOR, '[data-testid="SCRDTMM"]').send_keys(mm)
            context.driver.find_element(By.CSS_SELECTOR, '[data-testid="SCRDTYY"]').send_keys(yyyy)
        elif field_name in field_mapping:
            test_id = field_mapping[field_name]
            elem = context.driver.find_element(By.CSS_SELECTOR, f'[data-testid="{test_id}"]')
            elem.clear()
            elem.send_keys(val)

@when('submits the customer registration form')
def step_submit_customer_form(context):
    context.driver.find_element(By.CSS_SELECTOR, '[data-testid="submit-customer-btn"]').click()

@then('the system creates the customer record')
def step_verify_customer_record_created(context):
    message_elem = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_locator((By.CSS_SELECTOR, '[data-testid="MESSAGE"]'))
    )
    assert message_elem.is_displayed()

@then('displays the confirmation message "{expected_msg}" mapped to "{field_id}"')
@then('displays the status message "{expected_msg}" in field "{field_id}"')
@then('confirms with message "{expected_msg}" in field "{field_id}"')
def step_verify_message(context, expected_msg, field_id):
    message_elem = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_locator((By.CSS_SELECTOR, f'[data-testid="{field_id}"]'))
    )
    assert expected_msg in message_elem.text

@then('generates a unique Customer Number mapped to "{field_id}"')
def step_verify_custno(context, field_id):
    custno_elem = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_locator((By.CSS_SELECTOR, f'[data-testid="{field_id}"]'))
    )
    val = custno_elem.text.strip()
    assert len(val) > 0

@when('enters the Customer Number "{cust_no}" and Account Number "{acc_no}"')
def step_enter_cust_acc(context, cust_no, acc_no):
    c_elem = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="CUSTNO"]')
    c_elem.clear()
    c_elem.send_keys(cust_no)
    
    a_elem = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="ACCNO"]')
    a_elem.clear()
    a_elem.send_keys(acc_no)

@when('clicks the lookup button')
def step_click_lookup(context):
    context.driver.find_element(By.CSS_SELECTOR, '[data-testid="lookup-btn"]').click()

@then('the system populates the account details panel with fields:')
def step_verify_account_details(context):
    for row in context.table:
        screen_field = row['Screen Field']
        expected_val = row['Mapped Value']
        
        if screen_field == "Company":
            actual = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="COMPANY"]').get_attribute("value")
            assert actual == expected_val
        elif screen_field == "Account Type":
            actual = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="ACCTYP"]').get_attribute("value")
            assert actual == expected_val
        elif screen_field == "Interest Rate":
            actual = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="INTRT"]').get_attribute("value")
            assert actual == expected_val
        elif screen_field == "Overdraft Limit":
            actual = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="OVERDR"]').get_attribute("value")
            assert actual == expected_val
        elif screen_field == "Sort Code":
            actual = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="SRTCD"]').get_attribute("value")
            assert actual == expected_val
        elif screen_field == "Open Date":
            dd = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="OPENDD"]').get_attribute("value")
            mm = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="OPENMM"]').get_attribute("value")
            yy = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="OPENYY"]').get_attribute("value")
            assert f"{dd}/{mm}/{yy}" == expected_val
        elif screen_field == "Last Stmt Date":
            dd = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="LSTMDD"]').get_attribute("value")
            mm = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="LSTMMM"]').get_attribute("value")
            yy = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="LSTMYY"]').get_attribute("value")
            assert f"{dd}/{mm}/{yy}" == expected_val
        elif screen_field == "Next Stmt Date":
            dd = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="NSTMTDD"]').get_attribute("value")
            mm = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="NSTMTMM"]').get_attribute("value")
            yy = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="NSTMTYY"]').get_attribute("value")
            assert f"{dd}/{mm}/{yy}" == expected_val
        elif screen_field == "Available Balance":
            actual = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="AVAIL"]').get_attribute("value")
            assert actual == expected_val
        elif screen_field == "Actual Balance":
            actual = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="ACTBAL"]').get_attribute("value")
            assert actual == expected_val

@when('the user enters transfer details with:')
def step_enter_transfer_details(context):
    for row in context.table:
        field = row['Field']
        val = row['Value']
        if field == "From Account":
            e = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="FACCNO"]')
            e.clear(); e.send_keys(val)
        elif field == "From Sort Code":
            e = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="FSORTC"]')
            e.clear(); e.send_keys(val)
        elif field == "To Account":
            e = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="TACCNO"]')
            e.clear(); e.send_keys(val)
        elif field == "To Sort Code":
            e = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="TSORTC"]')
            e.clear(); e.send_keys(val)
        elif field == "Amount":
            e = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="AMT"]')
            e.clear(); e.send_keys(val)

@when('confirms the fund transfer execution')
def step_confirm_transfer(context):
    context.driver.find_element(By.CSS_SELECTOR, '[data-testid="confirm-transfer-btn"]').click()

@then('the system updates the balances as follows:')
def step_verify_balances(context):
    for row in context.table:
        acc_type = row['Account Type']
        act_bal = row['Updated Actual Balance']
        avail_bal = row['Updated Available Balance']
        
        if acc_type == "From Account":
            f_act = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="FACTBAL"]').get_attribute("value")
            f_av = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="FAVBAL"]').get_attribute("value")
            assert f_act == act_bal
            assert f_av == avail_bal
        elif acc_type == "To Account":
            t_act = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="TACTBAL"]').get_attribute("value")
            t_av = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="TAVBAL"]').get_attribute("value")
            assert t_act == act_bal
            assert t_av == avail_bal

@when('retrieves the account "{acc_no}" for Customer "{cust_no}"')
def step_retrieve_account_uam(context, acc_no, cust_no):
    a_elem = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="ACCNO"]')
    a_elem.clear(); a_elem.send_keys(acc_no)
    c_elem = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="CUSTNO"]')
    c_elem.clear(); c_elem.send_keys(cust_no)
    context.driver.find_element(By.CSS_SELECTOR, '[data-testid="retrieve-account-btn"]').click()

@when('updates the following attributes:')
def step_update_attributes(context):
    for row in context.table:
        attr = row['Attribute']
        val = row['New Value']
        if attr == "Interest Rate":
            e = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="INTRT"]')
            e.clear(); e.send_keys(val)
        elif attr == "Overdraft Limit":
            e = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="OVERDR"]')
            e.clear(); e.send_keys(val)

@when('submits the account update request')
def step_submit_account_update(context):
    context.driver.find_element(By.CSS_SELECTOR, '[data-testid="submit-update-btn"]').click()

@then('the system records the updated interest rate "{int_rate}" and overdraft limit "{overdraft}"')
def step_verify_updated_account_attrs(context, int_rate, overdraft):
    actual_int = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="INTRT"]').get_attribute("value")
    actual_over = context.driver.find_element(By.CSS_SELECTOR, '[data-testid="OVERDR"]').get_attribute("value")
    assert actual_int == int_rate
    assert actual_over == overdraft
