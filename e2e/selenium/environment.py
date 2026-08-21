from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import os

def before_all(context):
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    service = Service(ChromeDriverManager().install())
    context.driver = webdriver.Chrome(service=service, options=chrome_options)
    context.driver.implicitly_wait(10)
    context.base_url = os.getenv("E2E_BASE_URL", "http://localhost:4200")

def after_all(context):
    if hasattr(context, "driver"):
        context.driver.quit()

def after_scenario(context, scenario):
    if scenario.status == "failed":
        screenshot_dir = os.path.join("e2e", "selenium", "screenshots")
        os.makedirs(screenshot_dir, exist_ok=True)
        context.driver.save_screenshot(os.path.join(screenshot_dir, f"{scenario.name.replace(' ', '_')}.png"))