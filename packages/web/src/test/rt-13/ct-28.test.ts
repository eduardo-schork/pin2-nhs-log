//@ts-nocheck
import * as dotenv from 'dotenv';
dotenv.config();

import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';

describe('CT-28', () => {
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

    describe('GIVEN an existing fleet to delete', () => {
        it('SHOULD open the delete fleet modal and cancel the deletion', async () => {
            await page.waitForSelector('.fleet-list table tbody tr');

            await page.click('.fleet-list table tbody tr:first-child .delete-fleet-button');

            await page.waitForSelector('.chakra-modal__content');

            const cancelButton = await page.evaluateHandle(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                return buttons.find((button) => button.textContent.includes('Cancelar'));
            });

            if (cancelButton) {
                await cancelButton.click();
            } else {
                throw new Error('Cancel button not found');
            }

            await page.waitForSelector('.chakra-modal__content', { hidden: true });

            const isModalVisible = await page.evaluate(() => {
                const modal = document.querySelector('.chakra-modal__content');
                return modal ? modal.offsetParent !== null : false;
            });

            expect(isModalVisible).toBe(false);

            const fleetName = await page.$eval(
                '.fleet-list table tbody tr:first-child td:first-child',
                (el) => el.textContent,
            );

            expect(fleetName).not.toBeNull();

            await page.screenshot({ path: 'delete-fleet-modal.png' });
        }, 20000);
    });
});
