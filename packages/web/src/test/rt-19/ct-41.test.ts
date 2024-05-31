//@ts-nocheck
import * as dotenv from "dotenv";
dotenv.config();

import puppeteer from "puppeteer";

describe("CT-41", () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        await page.goto(`${process.env.IP_FOR_TESTS}/quotation`);
    });

    afterAll(async () => {
        await browser.close();
    });

    describe("GIVEN a new quotation", () => {
        it("SHOULD open the options of a remittance Type", async () => {

            await page.waitForSelector('form');

            const selectElement = await page.$('select[name="remittanceType"]');
            
            expect(selectElement).not.toBeNull();

            const expectedOptions = [
                'Documentos',
                'Eletrônicos',
                'Inflamável',
                'Frágil'
            ];

            const options = await page.evaluate(select => {
                const options = Array.from(select.querySelectorAll('option'));
                return options.map(option => option.textContent);
            }, selectElement);

            const cleanedOptions = options.filter(option => option !== "");

            expect(cleanedOptions).toEqual(expectedOptions);

            for (const option of expectedOptions) {
                await page.select('select[name="remittanceType"]', option);

                const selectedOption = await page.$eval('select[name="remittanceType"]', el => el.value);
                expect(selectedOption).toBe(option);
            }

            await page.screenshot({ path: 'verificou-select-tipo-remessa.png' });

            await sleep(3000);
        });
    });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}