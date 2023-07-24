import { test, expect, chromium, Page } from '@playwright/test';
import { isArrayBufferView } from 'util/types';
import { parseTime, sleep } from '../entries/util'

test.describe("通讯录模块", async () => {
    let page: Page

    test("通讯录模块-用例1：通讯录列表筛选“人事行政部”", async ({ page }) => {

        // 步骤1：进入到“通讯录”页面
        await page.goto("/mailList");
        await sleep(2);

        // 步骤2：在“通讯录”列表中选择“人事行政部”
        await page.click("//*[text()=' 人事行政部 ']");
        await sleep(2);
    })

    test("通讯录模块-用例2：通讯录列表筛选“软件研发部”", async ({ page }) => {

        // 步骤1：进入到“通讯录”页面
        await page.goto("/mailList");
        await sleep(2);

        // 步骤2：在“通讯录”列表中选择“软件研发部”
        await page.click("//*[text()=' 软件研发部 ']");
        await sleep(2);
    })

    test("通讯录模块-用例3：通讯录列表筛选“硬件研发部”", async ({ page }) => {

        // 步骤1：进入到“通讯录”页面
        await page.goto("/mailList");
        await sleep(2);

        // 步骤2：在“通讯录”列表中选择“硬件研发部”
        await page.click("//*[text()=' 硬件研发部 ']");
        await sleep(2);
    })
})
