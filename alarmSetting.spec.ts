import { test, expect, chromium,  Page } from '@playwright/test';
import { isArrayBufferView } from 'util/types';
import { parseTime, sleep } from '../entries/util'

test.describe("报警规则模块", async () => {
    let page: Page

    test("报警规则模块-用例1：根据“报警规则”搜索，搜索“1号高炉外壁前侧送风支管温度过高”，成功搜索到报警规则", async ({ page }) => {

        // 步骤1：进入到“报警规则”页面
        await page.goto("/alarm/alarmSetting");
        await sleep(2);

        // 步骤2：在“报警规则”搜索框中输入“1号高炉外壁前侧送风支管温度过高”
        await page.fill("//*[@placeholder='请输入名称']", "1号高炉外壁前侧送风支管温度过高");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(2);

        // 断言：搜索成功后，“1号高炉外壁前侧送风支管温度过高”出现在页面中
        await expect(page.locator("text = 1号高炉外壁前侧送风支管温度过高").first()).toBeVisible()
    })

    test("报警规则模块-用例2：根据“报警规则”搜索，搜索“2号高炉外壁前侧送风支管温度过高”，未搜索到报警规则", async ({ page }) => {

        // 步骤1：进入到“报警规则”页面
        await page.goto("/alarm/alarmSetting");
        await sleep(2);

        // 步骤2：在“报警规则”搜索框中输入“2号高炉外壁前侧送风支管温度过高”
        await page.fill("//*[@placeholder='请输入名称']", "2号高炉外壁前侧送风支管温度过高");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(2);

        // 断言：搜索后，“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警规则模块-用例3：重置操作", async ({ page }) => {

        // 步骤1：进入到“报警规则”页面
        await page.goto("/alarm/alarmSetting");
        await sleep(2);

        // 步骤2：在“报警规则”搜索框中输入“2号高炉外壁前侧送风支管温度过高”
        await page.fill("//*[@placeholder='请输入名称']", "2号高炉外壁前侧送风支管温度过高");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(2);

        // 断言：搜索后，“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()

        // 步骤4：点击“重置”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small is-plain']");
        await sleep(2);

        // 断言：“1号高炉外壁前侧送风支管温度过高”出现在页面中
        await expect(page.locator("text = 1号高炉外壁前侧送风支管温度过高").first()).toBeVisible()
    })

    test("报警规则模块-用例4：根据报警范围筛选，选择“平台", async ({ page }) => {

        // 步骤1：进入到“报警规则”页面
        await page.goto("/alarm/alarmSetting");
        await sleep(2);

        // 步骤2：根据报警范围筛选，选择“平台"
        await page.click("//div[text()='报警范围']");
        await sleep(1);
        await page.click("//*[text()='平台']");
        await sleep(1);

        // 断言：搜索后，“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警规则模块-用例5：根据报警范围筛选，选择“应用", async ({ page }) => {

        // 步骤1：进入到“报警规则”页面
        await page.goto("/alarm/alarmSetting");
        await sleep(2);

        // 步骤2：根据报警范围筛选，选择“应用"
        await page.click("//div[text()='报警范围']");
        await sleep(1);
        await page.click("//*[@class='el-table-filter__list']/li[3]");
        await sleep(1);

        // 断言：搜索后，“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警规则模块-用例6：根据报警范围筛选，选择“设备", async ({ page }) => {

        // 步骤1：进入到“报警规则”页面
        await page.goto("/alarm/alarmSetting");
        await sleep(2);

        // 步骤2：根据报警范围筛选，选择“设备"
        await page.click("//div[text()='报警范围']");
        await sleep(1);
        await page.click("//*[text()='设备']");
        await sleep(1);

        // 断言：“1号高炉外壁前侧送风支管温度过高”出现在页面中
        await expect(page.locator("text = 1号高炉外壁前侧送风支管温度过高").first()).toBeVisible()
    })
})
