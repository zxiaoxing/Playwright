import { test, expect, chromium,  Page } from '@playwright/test';
import { isArrayBufferView } from 'util/types';
import { parseTime, sleep } from '../entries/util'

test.describe("报警记录模块", async () => {
    let page: Page

    test("报警记录模块-用例1：根据“记录产生时间”搜索，起始日期为“2021-01-30”，结束日期为“2021-02-30”，成功搜索到报警记录", async ({ page }) => {

        // 步骤1：进入到“报警记录”页面
        await page.goto("/alarm/alarmList");
        await sleep(2);

        // 步骤2：在“记录产生时间”搜索框中输入起始日期为“2021-01-30”，结束日期为“2021-02-30”
        await page.click("//*[text()='起始日期']/../div/div/input");
        await sleep(2);
        await page.fill("//*[@class='el-picker-panel el-date-picker el-popper has-time' and @x-placement='bottom-start']/div/div/div[1]/span[1]/div/input", "2021-01-30");
        await sleep(2);
        await page.click("//*[@class='el-picker-panel el-date-picker el-popper has-time' and @x-placement='bottom-start']/div[2]/button[2]/span");
        await sleep(2);
        await page.click("//*[text()='结束日期']/../div/div/input");
        await sleep(2);
        await page.fill("//*[@class='el-picker-panel el-date-picker el-popper has-time' and @x-placement='bottom-start']/div/div/div[1]/span[1]/div/input", "2021-02-30");
        await sleep(2);
        await page.click("//*[@class='el-picker-panel el-date-picker el-popper has-time' and @x-placement='bottom-start']/div[2]/button[2]/span");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(2);

        // 断言：搜索成功后，“1号高炉外壁前侧测温点2”出现在页面中
        await expect(page.locator("text = 1号高炉外壁前侧测温点2").first()).toBeVisible()
    })

    test("报警记录模块-用例2：根据“记录产生时间”搜索，起始日期为“2021-02-30”，结束日期为“2021-03-30”，未搜索到报警记录", async ({ page }) => {

        // 步骤1：进入到“报警记录”页面
        await page.goto("/alarm/alarmList");
        await sleep(2);

        // 步骤2：在“记录产生时间”搜索框中输入起始日期为“2021-02-30”，结束日期为“2021-03-30”
        await page.click("//*[text()='起始日期']/../div/div/input");
        await sleep(2);
        await page.fill("//*[@class='el-picker-panel el-date-picker el-popper has-time' and @x-placement='bottom-start']/div/div/div[1]/span[1]/div/input", "2021-02-30");
        await sleep(2);
        await page.click("//*[@class='el-picker-panel el-date-picker el-popper has-time' and @x-placement='bottom-start']/div[2]/button[2]/span");
        await sleep(2);
        await page.click("//*[text()='结束日期']/../div/div/input");
        await sleep(2);
        await page.fill("//*[@class='el-picker-panel el-date-picker el-popper has-time' and @x-placement='bottom-start']/div/div/div[1]/span[1]/div/input", "2021-03-30");
        await sleep(2);
        await page.click("//*[@class='el-picker-panel el-date-picker el-popper has-time' and @x-placement='bottom-start']/div[2]/button[2]/span");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(2);

        // 断言：没有搜索到报警记录，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警记录模块-用例3：根据“报警规则”搜索，搜索规则“1号高炉外壁前侧送风支管温度过高”，成功搜索到报警规则", async ({ page }) => {

        // 步骤1：进入到“报警记录”页面
        await page.goto("/alarm/alarmList");
        await sleep(2);

        // 步骤2：在“报警规则”搜索框中输入“1号高炉外壁前侧送风支管温度过高”
        await page.fill("//*[@placeholder='请输入报警名称']", "1号高炉外壁前侧送风支管温度过高");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(2);

        // 断言：搜索成功后，“1号高炉外壁前侧测温点2”出现在页面中
        await expect(page.locator("text = 1号高炉外壁前侧测温点2").first()).toBeVisible()
    })

    test("报警记录模块-用例4：根据“报警规则”搜索，搜索规则“2号高炉外壁前侧送风支管温度过高”，未搜索到报警规则", async ({ page }) => {

        // 步骤1：进入到“报警记录”页面
        await page.goto("/alarm/alarmList");
        await sleep(2);

        // 步骤2：在“报警规则”搜索框中输入“2号高炉外壁前侧送风支管温度过高”
        await page.fill("//*[@placeholder='请输入报警名称']", "2号高炉外壁前侧送风支管温度过高");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(2);

        // 断言：搜索后，“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警记录模块-用例5：根据“报警对象”搜索，搜索规则“2号高炉外壁前侧测温点2”，成功搜索到报警规则", async ({ page }) => {

        // 步骤1：进入到“报警记录”页面
        await page.goto("/alarm/alarmList");
        await sleep(2);

        // 步骤2：在“报警对象”搜索框中输入“2号高炉外壁前侧测温点2”
        await page.fill("//*[@placeholder='请输入报警对象']", "2号高炉外壁前侧测温点2");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(2);

        // 断言：搜索成功后，“2号高炉外壁前侧测温点2”出现在页面中
        await expect(page.locator("text = 2号高炉外壁前侧测温点2").first()).toBeVisible()
    })

    test("报警记录模块-用例6：根据“报警对象”搜索，搜索规则“20号高炉外壁前侧测温点2”，未搜索到报警规则", async ({ page }) => {

        // 步骤1：进入到“报警记录”页面
        await page.goto("/alarm/alarmList");
        await sleep(2);

        // 步骤2：在“报警对象”搜索框中输入“20号高炉外壁前侧测温点2”
        await page.fill("//*[@placeholder='请输入报警对象']", "20号高炉外壁前侧测温点2");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(2);

        // 断言：搜索后，“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警记录模块-用例7：重置操作", async ({ page }) => {

        // 步骤1：进入到“报警记录”页面
        await page.goto("/alarm/alarmList");
        await sleep(2);

        // 步骤2：在“报警对象”搜索框中输入“20号高炉外壁前侧测温点2”
        await page.fill("//*[@placeholder='请输入报警对象']", "20号高炉外壁前侧测温点2");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(2);

        // 断言：搜索后，“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()

        // 步骤4：点击“重置”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small is-plain']");
        await sleep(2);

        // 断言：“2号高炉外壁前侧测温点2”出现在页面中
        await expect(page.locator("text = 2号高炉外壁前侧测温点2").first()).toBeVisible()
    })

    test("报警记录模块-用例8：导出", async ({ page }) => {

        // 步骤1：进入到“报警记录”页面
        await page.goto("/alarm/alarmList");
        await sleep(2);

        // 步骤2：点击“导出”按钮
        await page.click("//*[text()='导出']");
        await sleep(5);
    })

    test("报警记录模块-用例9：查看详情", async ({ page }) => {

        // 步骤1：进入到“报警记录”页面
        await page.goto("/alarm/alarmList");
        await sleep(2);

        // 步骤2：点击2号高炉外壁前侧测温点2后面的“详情”按钮
        await page.click("//*[text()='2号高炉外壁前侧测温点2']/../../td[8]/div/button/span");
        await sleep(2);

        // 断言：“报警记录详情 ”出现在页面中
        await expect(page.locator("text = 报警记录详情 ").first()).toBeVisible()
    })
})
