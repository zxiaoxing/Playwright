import { test, expect, chromium,  Page } from '@playwright/test';
import { isArrayBufferView } from 'util/types';
import { parseTime, sleep } from '../entries/util'

test.describe("应用中心模块", async () => {
    let page: Page

    test("应用中心模块-用例1：查看详情", async ({ page }) => {

        // 步骤1：进入到“应用中心”页面
        await page.goto("/application/applicationCenter");
        await sleep(2);

        // 步骤2：点击“查看详情”按钮
        await page.click("//*[text()='高炉']/../..//button[1]");
        await sleep(2);

        // 断言：“应用详情”出现在页面中
        await expect(page.locator("text = 应用详情").first()).toBeVisible()
    })

    test("应用中心模块-用例2：点击应用详情中“安装”按钮，能正确跳转到“应用安装 ”页面", async ({ page }) => {

        // 步骤1：进入到“应用中心”页面
        await page.goto("/application/applicationCenter");
        await sleep(2);

        // 步骤2：点击“查看详情”按钮
        await page.click("//*[text()='高炉']/../..//button[1]");
        await sleep(2);

        // 步骤3：点击“安装”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small is-plain']");
        await sleep(2);

        // 断言：“应用安装”出现在页面中
        await expect(page.locator("text = 应用安装").first()).toBeVisible()
    })

    test("应用中心模块-用例3：安装应用", async ({ page }) => {

        // 步骤1：进入到“应用中心”页面
        await page.goto("/application/applicationCenter");
        await sleep(2);

        // 步骤2：点击“立即安装”按钮
        await page.click("//*[text()='高炉']/../..//button[2]");
        await sleep(2);

        // 步骤3：在“应用安装”页面输入如下内容
        // 获取“AppSecret”
        await page.click("//*[text()='获取']");
        await sleep(2);
        // 应用名称：铁水连续测温系统
        await page.fill("//*[text()='应用名称']/..//input", "铁水连续测温系统");
        await sleep(2);
        // 应用简介：铁水温度，是操作高炉的重要参数之一，对于优化炼钢工序及高炉操作、保障高炉安全生产、提高钢水质量、降本增效有重要意义
        await page.fill("//*[text()='应用简介']/..//textarea", "铁水温度，是操作高炉的重要参数之一，对于优化炼钢工序及高炉操作、保障高炉安全生产、提高钢水质量、降本增效有重要意义");
        await sleep(2);
        // 备注：铁水连续测温系统
        await page.fill("//*[text()='备注']/..//textarea", "铁水连续测温系统");
        await sleep(2);

        // 步骤4：点击“提交”按钮
        await page.click("//*[text()='提交']");
        await sleep(2);

        // 断言：“创建成功”出现在页面中
        await expect(page.locator("text = 创建成功").first()).toBeVisible()
    })
})
