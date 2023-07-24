import { test, expect, chromium,  Page } from '@playwright/test';
import { isArrayBufferView } from 'util/types';
import { parseTime, sleep } from '../entries/util'

test.describe("报警推送模块", async () => {
    let page: Page

    test("报警推送模块-用例1：根据“联系人姓名”搜索，成功搜索到报警推送数据", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：在“联系人姓名”搜索框中输入“秦能”
        await page.fill("//*[@placeholder='请输入姓名']", "秦能");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：搜索成功后，“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("报警推送模块-用例2：根据“联系人姓名”搜索，未搜索到报警推送数据", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：在“联系人姓名”搜索框中输入“周杰伦”
        await page.fill("//*[@placeholder='请输入姓名']", "周杰伦");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警推送模块-用例3：根据“报警模板”搜索，成功搜索到报警推送数据", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：在“报警模板”下拉框中选择“高温报警推送”
        await page.click("//*[text()='报警模板']/..//input");
        await sleep(2);
        await page.click("//*[@class='el-select-dropdown el-popper' and @x-placement='bottom-start']//span");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：搜索成功后，“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("报警推送模块-用例4：根据“报警规则”搜索，成功搜索到报警推送数据", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：在“报警规则”下拉框中选择“号高炉外壁前侧送风支管温度过高”
        await page.click("//*[text()='报警规则']/..//input");
        await sleep(2);
        await page.click("//*[@class='el-select-dropdown el-popper' and @x-placement='bottom-start']//span");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：搜索成功后，“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("报警推送模块-用例5：重置操作", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：在“联系人姓名”搜索框中输入“周杰伦”
        await page.fill("//*[@placeholder='请输入姓名']", "周杰伦");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()

        // 步骤4：点击“重置”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small is-plain']");
        await sleep(2);

        // 断言：“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("报警推送模块-用例6：新增报警推送", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：点击“新增”按钮
        await page.click("//*[text()='新增']");
        await sleep(2);

        // 步骤3：在“新增报警推送”页面输入如下内容
        // 报警推送：高温报警推送
        await page.click("//*[text()='新增报警推送']/../../div[2]/form/div[1]//input");
        await sleep(5);
        await page.click("//*[@class='el-select-dropdown el-popper' and @x-placement='bottom-start']//span");
        await sleep(2);

        // 联系人：胡玥
        await page.click("//*[text()='胡玥']/../../td[1]//label/span/span");
        await sleep(2);

        // 推送方式：短信
        await page.click("//*[@class='el-form']/div[4]//div/div/label[1]/span[1]");
        await sleep(2);


        // 点击“提交”按钮
        await page.click("//*[text()='提交']");

        // 断言：新增成功后，页面中包含“新增成功”字样
        await expect(page.locator("text = 新增成功").first()).toBeVisible()
    })

    test("报警推送模块-用例7：根据推送方式筛选，选择“微信", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：根据待选参数筛选，选择“短信"
        await page.click("//div[text()='推送方式']");
        await sleep(1);
        await page.click("//*[@class='el-checkbox-group el-table-filter__checkbox-group']/label[1]/span/span");
        await sleep(1);

        // 步骤2：点击“筛选”
        await page.click("//*[text()='筛选']");
        await sleep(1);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警推送模块-用例8：根据推送方式筛选，选择“短信", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：根据待选参数筛选，选择“短信"
        await page.click("//div[text()='推送方式']");
        await sleep(1);
        await page.click("//*[@class='el-checkbox-group el-table-filter__checkbox-group']/label[2]/span/span");
        await sleep(1);

        // 步骤2：点击“筛选”
        await page.click("//*[text()='筛选']");
        await sleep(1);

        // 断言：“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("报警推送模块-用例9：根据推送方式筛选，选择“邮件", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：根据待选参数筛选，选择“邮件"
        await page.click("//div[text()='推送方式']");
        await sleep(1);
        await page.click("//*[@class='el-checkbox-group el-table-filter__checkbox-group']/label[3]/span/span");
        await sleep(1);

        // 步骤2：点击“筛选”
        await page.click("//*[text()='筛选']");
        await sleep(1);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警推送模块-用例10：根据推送方式筛选，“微信”、“短信”、“邮箱”全部选中", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：根据推送方式筛选，“短信”、“邮箱”、“微信”全部选中
        await page.click("//div[text()='推送方式']");
        await sleep(1);
        await page.click("//*[@class='el-checkbox-group el-table-filter__checkbox-group']/label[1]/span/span");
        await sleep(1);
        await page.click("//*[@class='el-checkbox-group el-table-filter__checkbox-group']/label[2]/span/span");
        await sleep(1);
        await page.click("//*[@class='el-checkbox-group el-table-filter__checkbox-group']/label[3]/span/span");
        await sleep(1);

        // 步骤2：点击“筛选”
        await page.click("//*[text()='筛选']");
        await sleep(1);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警推送模块-用例11：编辑报警推送", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：点击“编辑”按钮
        await page.click("//*[text()='胡玥']/../../td[6]//button[1]");
        await sleep(2);

        // 步骤3：在“编辑报警推送”页面做如下修改
        // 联系人：胡玥  -->  李四
        await page.click("//*[text()='李四']/../../td[1]//label/span/span");
        await sleep(2);

        // 点击“提交”按钮
        await page.click("//*[text()='保存']");

        // 断言：页面中包含“修改成功”字样
        await expect(page.locator("text = 修改成功").first()).toBeVisible()
    })

    test("报警推送模块-用例12：删除报警推送", async ({ page }) => {

        // 步骤1：进入到“报警推送”页面
        await page.goto("/alarm/alarmPush");
        await sleep(2);

        // 步骤2：点击“删除”按钮
        await page.click("//*[text()='胡玥,李四']/../../td[6]//button[2]/span");
        await sleep(2);

        // 步骤3：点击“确认”按钮
        await page.click("//*[@class='el-message-box__btns']/button[2]");
        await sleep(2);

        // 断言：新增成功后，页面中包含“删除成功”字样
        await expect(page.locator("text = 删除成功").first()).toBeVisible()
    })
})
