//@ts-nocheck
import * as dotenv from 'dotenv';
dotenv.config();

import puppeteer from 'puppeteer';

describe('CT-38', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        await page.goto(`${process.env.IP_FOR_TESTS}/admin`);

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

    describe('GIVEN an existing user to edit', () => {
        it('SHOULD attempt to save with an empty name field and display an error', async () => {
            await page.waitForSelector('.user-actions-button');
            await page.click('.user-actions-button');

            await page.waitForSelector('.custom-modal-content');

            // Clear the userName field
            await page.evaluate(() => {
                document.querySelector('input[name="userName"]').value = '';
            });

            // Attempt to save the changes
            await page.click('button[data-testid="save-button"]');

            // Wait for error modal to appear
            await page.waitForSelector('.chakra-modal__body');

            await page.click('.chakra-modal__close-btn');
        }, 20000);
    });
});
