import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear()
  })
})

test('homepage loads and shows menu items', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('.menu-grid .menu-item', { hasText: 'Pengantar' })).toBeVisible()
  await expect(page.locator('.menu-grid .menu-item', { hasText: 'Fitur' })).toBeVisible()
  await expect(page.locator('.menu-grid .menu-item', { hasText: 'Tentang' })).toBeVisible()
})

test('can open About section from menu', async ({ page }) => {
  await page.goto('/')

  await page.locator('.menu-grid .menu-item', { hasText: 'Tentang' }).click()
  await expect(page.getByRole('heading', { name: /Tentang GEUWAT/i })).toBeVisible()
})
