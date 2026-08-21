import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC

def login(driver, base_url):
    driver.get(f"{base_url}/login")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='company-input']").clear()
    driver.find_element(By.CSS_SELECTOR, "[data-testid='company-input']").send_keys("GLOBAL_CORP")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='username-input']").send_keys("crm_operator")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='password-input']").send_keys("SecurePass123!")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='login-btn']").click()
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='main-menu']")))

def test_create_customer(driver, base_url):
    login(driver, base_url)
    
    driver.find_element(By.CSS_SELECTOR, "[data-testid='menu-action-input']").send_keys("CCM")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='menu-submit-btn']").click()
    
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='page-title']")))
    
    Select(driver.find_element(By.CSS_SELECTOR, "[data-testid='custtit']")).select_by_visible_text("Mr")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='christn']").send_keys("Robert")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='custins']").send_keys("E")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='custsn']").send_keys("Lee")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='custad1']").send_keys("700 Wall St")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='custad2']").send_keys("Floor 10")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='city']").send_keys("New York")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='postcode']").send_keys("10005")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='country']").send_keys("USA")
    
    driver.find_element(By.CSS_SELECTOR, "[data-testid='dobdd']").send_keys("12")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='dobmm']").send_keys("04")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='dobyy']").send_keys("1982")
    
    driver.find_element(By.CSS_SELECTOR, "[data-testid='sortc']").send_keys("112233")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='credsc']").send_keys("780")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='scrdtdd']").send_keys("01")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='scrdtmm']").send_keys("01")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='scrdtyy']").send_keys("2024")
    
    driver.find_element(By.CSS_SELECTOR, "[data-testid='submit-btn']").click()
    
    msg = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='message']")))
    assert "Customer created successfully" in msg.text

def test_delete_customer(driver, base_url):
    login(driver, base_url)
    
    driver.find_element(By.CSS_SELECTOR, "[data-testid='menu-action-input']").send_keys("DCM")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='menu-submit-btn']").click()
    
    driver.find_element(By.CSS_SELECTOR, "[data-testid='custno']").send_keys("CUST100001")
    driver.find_element(By.CSS_SELECTOR, "[data-testid='search-btn']").click()
    
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='custfnam']")))
    driver.find_element(By.CSS_SELECTOR, "[data-testid='delete-btn']").click()
    driver.find_element(By.CSS_SELECTOR, "[data-testid='confirm-modal-btn']").click()
    
    msg = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='message']")))
    assert "Customer record deleted" in msg.text
