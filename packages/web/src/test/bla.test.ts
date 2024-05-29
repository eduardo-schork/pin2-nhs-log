//@ts-nocheck
import * as dotenv from "dotenv";
dotenv.config();

import puppeteer from "puppeteer";

describe("App.js", () => {
  let browser;
  let page;
  console.log(process.env.IP_FOR_TESTS)

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("contains the welcome text", async () => {
    await page.goto(process.env.IP_FOR_TESTS);
    await page.screenshot({ path: 'example.png' });
    await page.waitForSelector(".App-welcome-text");
    const text = await page.$eval(".App-welcome-text", (e) => e.textContent);
    expect(text).toContain("Edit src/App.js and save to reload.");
  });

  afterAll(() => browser.close());
});