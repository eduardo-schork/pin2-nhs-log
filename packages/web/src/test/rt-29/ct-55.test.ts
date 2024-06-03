//@ts-nocheck
import * as dotenv from 'dotenv';
dotenv.config();

import puppeteer from 'puppeteer';
describe('CT-55', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();

        await page.goto(`${process.env.IP_FOR_TESTS}/admin/fleet`);

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

    describe('GIVEN the fleet list page', () => {
        it('SHOULD open the edit fleet modal and save without making any changes', async () => {
            await page.waitForSelector('.fleet-list table tbody tr');

            await page.click('.fleet-list table tbody tr:first-child .edit-fleet-button');

            const fleetNameBeforeEdit = await page.evaluate(() => {
                return document
                    .querySelector('.fleet-list table tbody tr:first-child td:first-child')
                    .textContent.trim();
            });

            await page.waitForSelector('.chakra-modal__content');

            await page.click('.confirm-edit-button');

            const fleetNameAfterEdit = await page.evaluate(() => {
                return document
                    .querySelector('.fleet-list table tbody tr:first-child td:first-child')
                    .textContent.trim();
            });

            expect(fleetNameAfterEdit).toBe(fleetNameBeforeEdit);
        }, 20000);
    });
});
