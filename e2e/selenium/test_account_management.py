import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC

def login(driver, base_url):
    driver.get(f"{base_url}/login")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='company-input']").clear()
    driver.find_element(By.CSS_SELECTOR, "[data-testid='company-input']").send_keys("GLOBAL_CORP")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='username-input']").send_keys("account_mgr")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='password-input']").send_keys("SecurePass123!")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='login-btn']").click()
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='main-menu']")))

def test_create_account(driver, base_url):
    login(driver, base_url)
    driver.find_element(By.CSS_SELECTOR, "[data-testid='menu-action-input']").send_keys("CAM")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='menu-submit-btn']").click()

    driver.find_element(By.CSS_SELECTOR, "[data-testid='custno']").send_keys("CUST100002")
    Select(driver.find_element(By.CSS_SELECTOR, "[data-testid='acctyp']")).select_by_visible_text("Savings")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='intrt']").send_keys("02.50")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='overdr']").send_keys("000000.00")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='srtcd']").send_keys("123456")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='opendd']").send_keys("05")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='openmm']").send_keys("05")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='openyy']").send_keys("2024")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='avail']").send_keys("2500.00")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='actbal']").send_keys("2500.00")

    driver.find_element(By.CSS_SELECTOR, "[data-testid='submit-btn']").click()
    msg = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='message']")))
    assert "Account opened successfully" in msg.text

def test_cash_deposit(driver, base_url):
    login(driver, base_url)
    driver.find_element(By.CSS_SELECTOR, "[data-testid='menu-action-input']").send_keys("CDM")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='menu-submit-btn']").click()

    driver.find_element(By.CSS_SELECTOR, "[data-testid='accno']").send_keys("ACC200001")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='sortc']").send_keys("123456")
    Select(driver.find_element(By.CSS_SELECTOR, "[data-testid='sign']")).select_by_visible_text("+")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='amt']").send_keys("150.00")

    driver.find_element(By.CSS_SELECTOR, "[data-testid='submit-btn']").click()
    msg = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='message']")))
    assert "Transaction processed successfully" in msg.text
