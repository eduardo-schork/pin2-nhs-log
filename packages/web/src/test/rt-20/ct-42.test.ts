//@ts-nocheck
import * as dotenv from 'dotenv';
dotenv.config();

import puppeteer from 'puppeteer';

describe('CT-42', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();

        await page.goto(`${process.env.IP_FOR_TESTS}/`);

        await page.evaluate(() => {
            localStorage.setItem('adminId', '1');
        });

        await page.reload();
    });

    afterAll(async () => {
        await page.evaluate(() => {
            localStorage.setItem('adminId', null);
        });
        await browser.close();
    });

    describe('GIVEN a CPF with existing quotations', () => {
        it('SHOULD display the quotation details correctly', async () => {
            await page.waitForSelector('.track-quotation-button');

            await page.click('.track-quotation-button');

            await page.waitForSelector('.identification-input');

            await page.type('.identification-input', '123.456.789-00');

            await page.click('.send-button');

            await page.waitForSelector('.track-quotation-item-0', { timeout: 10000 });

            const quotationDetails = await page.$eval('.track-quotation-item-0', (el) => el.textContent);
            expect(quotationDetails).toContain('Data de criação');
            expect(quotationDetails).toContain('Peso');
            expect(quotationDetails).toContain('Endereço de origem');
            expect(quotationDetails).toContain('Endereço de destino');

            await page.screenshot({ path: 'quotation-details.png' });
        }, 30000);
    });
});
