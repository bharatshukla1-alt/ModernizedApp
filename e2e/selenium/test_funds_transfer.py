import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC

def login(driver, base_url):
    driver.get(f"{base_url}/login")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='company-input']").clear()
    driver.find_element(By.CSS_SELECTOR, "[data-testid='company-input']").send_keys("GLOBAL_CORP")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='username-input']").send_keys("transfer_clerk")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='password-input']").send_keys("SecurePass123!")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='login-btn']").click()
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='main-menu']")))

def test_funds_transfer(driver, base_url):
    login(driver, base_url)
    driver.find_element(By.CSS_SELECTOR, "[data-testid='menu-action-input']").send_keys("TFM")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='menu-submit-btn']").click()

    driver.find_element(By.CSS_SELECTOR, "[data-testid='faccno']").send_keys("ACC200001")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='fsortc']").send_keys("123456")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='taccno']").send_keys("ACC200002")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='tsortc']").send_keys("654321")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='amt']").send_keys("300.00")

    driver.find_element(By.CSS_SELECTOR, "[data-testid='transfer-btn']").click()
    msg = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='message']")))
    assert "Transfer completed successfully" in msg.text
