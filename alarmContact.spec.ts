import { test, expect, chromium,  Page } from '@playwright/test';
import { isArrayBufferView } from 'util/types';
import { parseTime, sleep } from '../entries/util'

test.describe("报警联系人模块", async () => {
    let page: Page

    test("报警联系人模块-用例1：根据“联系人姓名”搜索，成功搜索到报警联系人", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：在“报警联系人”搜索框中输入“秦能”
        await page.fill("//*[@placeholder='请输入姓名']", "秦能");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：搜索成功后，“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("报警联系人模块-用例2：根据“联系人姓名”搜索，未搜索到报警联系人", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：在“报警联系人”搜索框中输入“周杰伦”
        await page.fill("//*[@placeholder='请输入姓名']", "周杰伦");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警联系人模块-用例3：根据“手机号码”搜索，成功搜索到报警联系人", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：在“手机号码”搜索框中输入“秦能”
        await page.fill("//*[@placeholder='请输入手机号']", "15927391992");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：搜索成功后，“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("报警联系人模块-用例4：根据“手机号码”搜索，未搜索到报警联系人", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：在“手机号码”搜索框中输入“15927391993”
        await page.fill("//*[@placeholder='请输入手机号']", "15927391993");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警联系人模块-用例5：重置操作", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：在“手机号码”搜索框中输入“15927391993”
        await page.fill("//*[@placeholder='请输入手机号']", "15927391993");
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

    test("报警联系人模块-用例6：新增报警联系人", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：点击“新增”按钮
        await page.click("//*[text()='新增']");
        await sleep(2);

        // 步骤3：在“新增报警联系人”页面输入如下内容
        // 联系人姓名：周建建
        await page.fill("//*[@placeholder='请输入姓名' and @valuekey='userName']", "周建建");
        await sleep(2);
        // 手机号码：18627728716
        await page.fill("//*[text()='新增报警联系人']/../../div[2]/form/div[2]//input", "18627728716");
        await sleep(2);
        // 邮箱：zhou.jianjian@yoseenir.com
        await page.fill("//*[text()='新增报警联系人']/../../div[2]/form/div[3]//input", "zhou.jianjian@yoseenir.com");
        await sleep(2);

        // 点击“提交”按钮
        await page.click("//*[text()='提交']");

        // 断言：新增成功后，页面中包含“新增成功”字样
        await expect(page.locator("text = 新增成功").first()).toBeVisible()
    })

    test("报警联系人模块-用例7：根据推送状态筛选，选择“开启推送", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：根据推送状态筛选，选择“开启推送"
        await page.click("//div[text()='推送状态']");
        await sleep(1);
        await page.click("//*[text()='开启推送']");
        await sleep(1);

        // 断言：“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("报警联系人模块-用例8：根据推送状态筛选，选择“关闭推送", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：根据推送状态筛选，选择“关闭推送"
        await page.click("//div[text()='推送状态']");
        await sleep(1);
        await page.click("//*[text()='关闭推送']");
        await sleep(1);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警联系人模块-用例9：根据关注状态筛选，选择“未关注", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：根据关注状态筛选，选择“未关注"
        await page.click("//div[text()='关注状态']");
        await sleep(1);
        await page.click("//*[text()='全部']/../li[2]");
        await sleep(1);

        // 断言：“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("报警联系人模块-用例10：根据关注状态筛选，选择“已关注", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：根据关注状态筛选，选择“已关注"
        await page.click("//div[text()='关注状态']");
        await sleep(1);
        await page.click("//*[text()='已关注']");
        await sleep(1);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警联系人模块-用例11：编辑报警联系人", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：点击“编辑”按钮
        await page.click("//*[text()='周建建']/../../td[7]/div/button[1]/span");
        await sleep(2);

        // 步骤3：在“编辑报警联系人”页面做如下内容修改
        // 联系人姓名：周建建  -->  张三
        await page.fill("//*[@placeholder='请输入姓名' and @valuekey='userName']", "");
        await sleep(2);
        await page.fill("//*[@placeholder='请输入姓名' and @valuekey='userName']", "张三");
        await sleep(2);
        // 手机号码：18627728716  -->  13900000000
        await page.fill("//*[text()='编辑报警联系人']/../../div[2]/form/div[2]//input", "");
        await sleep(2);
        await page.fill("//*[text()='编辑报警联系人']/../../div[2]/form/div[2]//input", "13900000000");
        await sleep(2);
        // 邮箱：zhou.jianjian@yoseenir.com  -->  zhang.san@yoseenir.com
        await page.fill("//*[text()='编辑报警联系人']/../../div[2]/form/div[3]//input", "");
        await sleep(2);
        await page.fill("//*[text()='编辑报警联系人']/../../div[2]/form/div[3]//input", "zhang.san@yoseenir.com");
        await sleep(2);

        // 点击“提交”按钮
        await page.click("//*[text()='保存']");

        // 断言：修改成功后，页面中包含“修改成功”字样
        await expect(page.locator("text = 修改成功").first()).toBeVisible()
    })

    test("报警联系人模块-用例12：删除报警联系人", async ({ page }) => {

        // 步骤1：进入到“报警联系人”页面
        await page.goto("/alarm/alarmContact");
        await sleep(2);

        // 步骤2：点击“删除”按钮
        await page.click("//*[text()='张三']/../../td[7]/div/button[2]/span");
        await sleep(2);

        // 步骤3：点击“确认”按钮
        await page.click("//*[@class='el-message-box__btns']/button[2]");
        await sleep(2);

        // 断言：新增成功后，页面中包含“删除成功”字样
        await expect(page.locator("text = 删除成功").first()).toBeVisible()
    })
})
