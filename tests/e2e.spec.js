import { test, expect } from '@playwright/test';

test('Add to chart one element', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('.v-card-actions > .v-badge > .v-badge__wrapper > .v-btn').first().click();
  await expect(page.getByRole('dialog')).toContainText('Подтверждение');
});

test('Add to chart two element', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('.v-card-actions > .v-badge > .v-badge__wrapper > .v-btn').first().click();
  await page.getByRole('button', { name: 'ОК' }).click();
  await expect(page.getByRole('main')).toContainText('1');
  await expect(page.locator('header')).toContainText('1');
  await page.locator('div:nth-child(2) > .v-card > .v-card-actions > .v-badge > .v-badge__wrapper > .v-btn').click();
  await page.getByRole('button', { name: 'ОК' }).click();
  await expect(page.getByRole('main')).toContainText('1');
  await expect(page.locator('header')).toContainText('2');
});

test('Filter by name', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('', { exact: true }).click();
  await page.getByLabel('', { exact: true }).fill('Mens');
  await expect(page.getByRole('main')).toContainText('Mens');
});

test('Open chart', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('.v-card-actions > .v-badge > .v-badge__wrapper > .v-btn').first().click();
  await page.getByRole('button', { name: 'ОК' }).click();
  await page.locator('div').filter({ hasText: /^Купить1Подробнее$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'ОК' }).click();
  await page.locator('div:nth-child(2) > .v-card > .v-card-actions > .v-badge > .v-badge__wrapper > .v-btn').click();
  await page.getByRole('button', { name: 'ОК' }).click();
  await page.locator('header').getByRole('link').nth(2).click();
  await expect(page.locator('tbody')).toContainText('2');
  await expect(page.locator('tbody')).toContainText('1');
});

test('Login success', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByLabel('Логин').click();
  await page.getByLabel('Логин').fill('test@test.ru');
  await page.getByLabel('Пароль').click();
  await page.getByLabel('Пароль').fill('123qweQ!');
  await page.getByRole('button', { name: 'Вход' }).click();
  await expect(page.locator('[data-test="avatar"]')).toContainText('te');
});