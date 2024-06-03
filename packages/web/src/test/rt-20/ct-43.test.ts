//@ts-nocheck
import * as dotenv from 'dotenv';
dotenv.config();

import puppeteer from 'puppeteer';

describe('CT-43', () => {
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

    describe('GIVEN a CPF without existing quotations', () => {
        it('SHOULD display a blank screen indicating no quotations found', async () => {
            await page.waitForSelector('.track-quotation-button');

            await page.click('.track-quotation-button');

            await page.waitForSelector('.identification-input');

            await page.type('.identification-input', '111.222.333-44');

            await page.click('.send-button');

            await page.waitForSelector('.quotations-list', { timeout: 10000 });

            const quotationListContainer = await page.$('.quotations-list');
            const quotationListChildren = await quotationListContainer.$$eval(
                '.track-quotation-item',
                (elements) => elements.length,
            );

            expect(quotationListChildren).toBe(0);

            await page.screenshot({ path: 'empty-quotation-list.png' });
        }, 30000);
    });
});
