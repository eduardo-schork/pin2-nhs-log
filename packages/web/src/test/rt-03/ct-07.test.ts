//@ts-nocheck
import * as dotenv from 'dotenv';
dotenv.config();

import puppeteer from 'puppeteer';
describe('CT-07', () => {
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
        it('SHOULD show an error message if not all fields are edited', async () => {
            await page.waitForSelector('.user-actions-button');
            await page.click('.user-actions-button');

            await page.waitForSelector('.custom-modal-content');

            await page.type('input[name="userName"]', 'Novo Nome');

            await page.waitForSelector('[data-testid="save-button"]');
            await page.click('[data-testid="save-button"]');

            // Aguarda a exibição da mensagem de erro dentro de '.custom-modal-content'
            await page.waitForSelector('.custom-modal-content');

            // Obter o texto dentro do modal
            const modalText = await page.evaluate(() => {
                const modal = document.querySelector('.custom-modal-error');
                return modal.textContent.trim();
            });

            // Verificar se o texto é igual à mensagem esperada
            expect(modalText).toEqual('ErroTodos os campos devem ser editados!');

            await page.screenshot({ path: 'edit-user-error.png' });
        }, 30000);
    });
});
