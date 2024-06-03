//@ts-nocheck
import * as dotenv from 'dotenv';
dotenv.config();

import puppeteer from 'puppeteer';

describe('CT-40', () => {
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
        it('SHOULD open the edit user modal and verify if the fields are filled correctly', async () => {
            await page.waitForSelector('.user-actions-button');

            await page.click('.user-actions-button');

            await page.waitForSelector('.custom-modal-content');

            const userNameValue = await page.$eval('input[name="userName"]', (el) => el.value);
            const userCpfValue = await page.$eval('input[name="userCpf"]', (el) => el.value);
            const userEmailValue = await page.$eval('input[name="userEmail"]', (el) => el.value);

            expect(userNameValue).not.toBe('');
            expect(userCpfValue).not.toBe('');
            expect(userEmailValue).not.toBe('');

            await page.screenshot({ path: 'edit-user-modal.png' });

            await sleep(3000);

            await page.click('.chakra-modal__close-btn');
        }, 20000);
    });
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
