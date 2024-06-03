//@ts-nocheck
import puppeteer from 'puppeteer';

describe('CT-54', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();

        await page.goto('http://localhost:5173/admin/fleet');

        await page.evaluate(() => {
            localStorage.setItem('adminId', '1');
        });

        await page.reload();
    });

    afterAll(async () => {
        await browser.close();
    });

    describe('WHEN creating a new fleet with name "Frota teste" and select first two vehicles', () => {
        it('SHOULD create a new fleet with name "Frota teste" and load it into fleets table', async () => {
            await page.type('.fleet-name-input', 'Frota teste');

            await page.click('.vehicle-0-checkbox');
            await page.click('.vehicle-1-checkbox');

            await page.click('.create-fleet-button');

            await page.waitForNavigation({ waitUntil: 'networkidle0' });

            const fleetExists = await page.evaluate(() => {
                const table = document.querySelector('.fleet-list tbody');
                if (!table) return false;

                const rows = Array.from(table.rows);
                return rows.some((row) => row.cells[0].innerText === 'Frota teste');
            });

            expect(fleetExists).toBe(true);
        });
    });
});
