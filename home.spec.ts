import { test, expect, Page } from '@playwright/test';
import { parseTime, sleep } from '../entries/util'

async function refreshDashboard(page: Page) {
    await page.goto("/dashboard");
    let isfind = page.locator(".showRightPanel");
    if (await isfind.count() > 0) {
        console.log("find")
        await page.locator(".rightPanel-background").click();
    }
    return true
}

// const testing = async () => {
// };
test.describe("首页模块", async () => {
    let page: Page

    test("用例5：进入到YSIR智慧物联云大屏显示页面", async ({ page }) => {

        // 步骤1：如果弹出报警弹窗，就点一下页面收回
        refreshDashboard(page)
        await sleep(1);

        // 步骤2：点击首页右上角“切换大屏显示”按钮
        await page.click("//*[@id='showroom']");
        await sleep(1);

        // 断言：title为“Showroom”
        await expect(page).toHaveTitle("展厅")
    })

    test("用例6：页面放大和缩小", async ({ page }) => {

        // 步骤1：如果弹出报警弹窗，就点一下页面收回
        refreshDashboard(page)
        await sleep(1);

        // 步骤2：点击首页右上角“放大”按钮
        await page.click("//*[@id='screenfull']");
        await sleep(1);

        // 步骤3：点击首页右上角“缩小”图标
        await page.click("//*[@id='screenfull']");
        await sleep(1);
    })

    test("用例7：下载操作文档", async ({ page }) => {

        // 步骤1：如果弹出报警弹窗，就点一下页面收回
        refreshDashboard(page)
        await sleep(1);

        // 步骤2：点击首页右上角“下载操作文档”按钮
        await page.click("//*[@id='help']");
        await sleep(1);
    })

    test("用例8：点击首页右上角“待查看报警事件”按钮，进入到报警记录列表页面", async ({ page }) => {

        // 步骤1：如果弹出报警弹窗，就点一下页面收回
        refreshDashboard(page)
        await sleep(1);

        // 步骤2：点击首页右上角“待查看报警事件”钮
        await page.click("//*[@class='icon-container']");
        await sleep(1);

        // 断言：页面中包含“报警记录列表”字样
        await expect(page.locator("text = 报警记录列表").first()).toBeVisible()
    })

    test("用例9：点击首页右上角“查看未处理报警”按钮，显示未查看的报警", async ({ page }) => {

        // 步骤1：如果弹出报警弹窗，就点一下页面收回
        refreshDashboard(page)
        await sleep(1);

        // 步骤2：点击首页右上角“查看未处理报警”按钮
        await page.click('//*[@class="handle-button-open"]');
        await sleep(1);
    })

    test("用例10：点击报警事件实时监测右侧的“更多”按钮，进入到报警记录列表", async ({ page }) => {

        // 步骤1：如果弹出报警弹窗，就点一下页面收回
        refreshDashboard(page)
        await sleep(1);

        // 步骤2：点击报警事件实时监测右侧的“更多”按钮
        await page.click("//*[text()='报警事件实时监测']/../button");
        await sleep(1);

        // 断言：页面中包含“报警记录列表”字样
        await expect(page.locator("text = 报警记录列表").first()).toBeVisible()
    })

    test("用例11：点击设备状态实时监测右侧的“更多”按钮，进入到设备管理列表", async ({ page }) => {

        // 步骤1：如果弹出报警弹窗，就点一下页面收回
        refreshDashboard(page)
        await sleep(1);

        // 步骤2：点击设备状态实时监测右侧的“更多”按钮
        await page.click("//*[@class='el-button el-button--text el-button--medium']");
        await sleep(1);

        // 断言：页面中包含“设备管理”字样
        await expect(page.locator("text = 设备管理").first()).toBeVisible()
    })
})
