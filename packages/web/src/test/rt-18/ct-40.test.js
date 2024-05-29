//@ts-nocheck
import * as dotenv from "dotenv";
dotenv.config();

import puppeteer from "puppeteer";

describe("CT-52", () => {
    describe("GIVEN an existing vehicle to delete", () => {
        it("SHOULD delete the vehicle successfully", async () => {
            let browser;
            let page;
            console.log(process.env.IP_FOR_TESTS)

            beforeAll(async () => {
                browser = await puppeteer.launch();
                page = await browser.newPage();
            });

            it("contains the welcome text", async () => {
                await page.goto(process.env.IP_FOR_TESTS);

            });

            afterAll(() => browser.close());
        });
    });
});

