import { test, expect, chromium,  Page } from '@playwright/test';
import { isArrayBufferView } from 'util/types';
import { parseTime, sleep } from '../entries/util'

test.describe("报警模板模块", async () => {
    let page: Page

    test("报警模板模块-用例1：根据“模板名称”搜索，搜索“高温报警模板”，成功搜索到报警模板", async ({ page }) => {

        // 步骤1：进入到“报警模板”页面
        await page.goto("/alarm/alarmTemplate");
        await sleep(2);

        // 步骤2：在“模板名称”搜索框中输入“高温报警模板”
        await page.fill("//*[@placeholder='请输入报警模板名称']", "高温报警模板");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：搜索成功后，“高温报警模板”出现在页面中
        await expect(page.locator("text = 高温报警模板").first()).toBeVisible()
    })

    test("报警模板模块-用例2：根据“模板名称”搜索，搜索“低温报警模板”，未搜索到报警模板", async ({ page }) => {

        // 步骤1：进入到“报警模板”页面
        await page.goto("/alarm/alarmTemplate");
        await sleep(2);

        // 步骤2：在“模板名称”搜索框中输入“低温报警模板”
        await page.fill("//*[@placeholder='请输入报警模板名称']", "低温报警模板");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：搜索后，“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("报警模板模块-用例3：根据“报警规则”搜索，选择“1号高炉外壁前侧送风支管温度过高”，成功搜索到报警模板", async ({ page }) => {

        // 步骤1：进入到“报警模板”页面
        await page.goto("/alarm/alarmTemplate");
        await sleep(2);

        // 步骤2：在“报警规则”下拉框选择“1号高炉外壁前侧送风支管温度过高”
        await page.click("//*[@placeholder='请输入报警规则名称']");
        await sleep(2);
        await page.click("//*[@class='el-select-dropdown el-popper' and @x-placement='bottom-start']/div[1]/div/ul/li");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：搜索成功后，“高温报警模板”出现在页面中
        await expect(page.locator("text = 高温报警模板").first()).toBeVisible()
    })

    test("报警模板模块-用例4：重置操作", async ({ page }) => {

        // 步骤1：进入到“报警模板”页面
        await page.goto("/alarm/alarmTemplate");
        await sleep(2);

        // 步骤2：在“模板名称”搜索框中输入“低温报警模板”
        await page.fill("//*[@placeholder='请输入报警模板名称']", "低温报警模板");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：搜索后，“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()

        // 步骤4：点击“重置”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small is-plain']");
        await sleep(2);

        // 断言：“高温报警模板”出现在页面中
        await expect(page.locator("text = 高温报警模板").first()).toBeVisible()
    })

    test("报警模板模块-用例5：新增报警模板", async ({ page }) => {

        // 步骤1：进入到“报警模板”页面
        await page.goto("/alarm/alarmTemplate");
        await sleep(2);

        // 步骤2：点击“新增”按钮
        await page.click("//*[text()='新增']");
        await sleep(2);

        // 步骤3：在“新增报警模板”页面输入如下内容

        // 模板名称：高温报警模板
        await page.fill("//*[text()='新增报警模板']/../../div[2]/form/div[1]/div/div/input", "高温报警模板");
        await sleep(2);
        // 报警规则：选择“高温报警”
        await page.click("//*[text()='新增报警模板']/../../div[2]/form/div[2]//input");
        await sleep(2);
        await page.click("//*[@class='el-select-dropdown el-popper' and @x-placement='bottom-start']//span");
        await sleep(2);
        // 推送方式：短信、邮箱、微信全选中
        await page.click("//*[@class='el-checkbox-group']/label[1]/span/span");
        await sleep(2);
        await page.click("//*[@class='el-checkbox-group']/label[2]/span/span");
        await sleep(2);
        await page.click("//*[@class='el-checkbox-group']/label[3]/span/span");
        await sleep(2);

        // 短信模板：设备告警通知
        await page.click("//*[text()='短信模板']/..//input");
        await sleep(2);
        await page.click("//*[@class='el-select-dropdown el-popper' and @x-placement='bottom-start']//span");
        await sleep(2);
        // 告警内容：回转窑外壁温度过高，超过阈值400℃，报警温度为405℃
        await page.fill("//div[text()='短信']/../div[3]/div/div", "回转窑外壁温度过高，超过阈值400℃，报警温度为405℃");
        await sleep(2);
        // 告警对象：回转窑最高温
        await page.fill("//div[text()='短信']/../div[4]/div/div", "回转窑最高温");
        await sleep(2);
        // 告警时间：2021年2月24日，11:57
        await page.fill("//div[text()='短信']/../div[5]/div/div", "2021年2月24日，11:57");
        await sleep(2);

        // 邮件标题：回转窑外壁温度过高
        await page.fill("//*[text()='邮件标题']/../div/div", "回转窑外壁温度过高");
        await sleep(2);
        // 正文内容：回转窑外壁温度过高，超过阈值400℃，报警温度为405℃
        await page.fill("//*[text()='正文内容']/../div/div", "回转窑外壁温度过高，超过阈值400℃，报警温度为405℃");
        await sleep(2);

        // 微信模板：设备告警通知
        await page.click("//*[text()='微信模板']/..//input");
        await sleep(2);
        await page.click("//*[@class='el-select-dropdown el-popper' and @x-placement='bottom-start']//span");
        await sleep(2);
        // { first.DATA }：高温红色报警事件
        await page.fill("//*[text()='{first.DATA}']/../div/div", "高温红色报警事件");
        await sleep(2);
        // 告警对象：回转窑60m窑尾测温区域
        await page.fill("//div[text()='微信']/../div[3]/div[2]/div/div", "回转窑60m窑尾测温区域");
        await sleep(2);
        // 告警类型：高温报警
        await page.fill("//div[text()='微信']/../div[3]/div[3]/div/div", "高温报警");
        await sleep(2);
        // 告警时间：2021-2-24 16:53:03
        await page.fill("//div[text()='微信']/../div[3]/div[4]/div/div", "2021-2-24 16:53:03");
        await sleep(2);
        // 报警内容：当前最高温度为378℃，大于350℃
        await page.fill("//div[text()='微信']/../div[3]/div[5]/div/div", "当前最高温度为378℃，大于350℃");
        await sleep(2);
        // { remark.DATA }：请及时处理
        await page.fill("//div[text()='微信']/../div[3]/div[6]/div/div", "请及时处理");
        await sleep(2);

        // 点击“提交”按钮
        await page.click("//*[text()='提交']");

        // 断言：新增成功后，页面中包含“新增成功”字样
        await expect(page.locator("text = 新增成功").first()).toBeVisible()
    })

    test("报警模板模块-用例6：根据待选参数筛选，选择“短信", async ({ page }) => {

        // 步骤1：进入到“报警模块”页面
        await page.goto("/alarm/alarmTemplate");
        await sleep(2);

        // 步骤2：根据待选参数筛选，选择“短信"
        await page.click("//div[text()='待选参数']");
        await sleep(1);
        await page.click("//*[@class='el-checkbox-group el-table-filter__checkbox-group']/label[1]/span/span");
        await sleep(1);

        // 步骤2：点击“筛选”
        await page.click("//*[text()='筛选']");
        await sleep(1);

        // 断言：“高温报警模板”出现在页面中
        await expect(page.locator("text = 高温报警模板").first()).toBeVisible()
    })

    test("报警模板模块-用例7：根据待选参数筛选，选择“邮箱", async ({ page }) => {

        // 步骤1：进入到“报警模块”页面
        await page.goto("/alarm/alarmTemplate");
        await sleep(2);

        // 步骤2：根据待选参数筛选，选择“邮箱"
        await page.click("//div[text()='待选参数']");
        await sleep(1);
        await page.click("//*[@class='el-checkbox-group el-table-filter__checkbox-group']/label[2]/span/span");
        await sleep(1);

        // 步骤2：点击“筛选”
        await page.click("//*[text()='筛选']");
        await sleep(1);

        // 断言：“高温报警模板”出现在页面中
        await expect(page.locator("text = 高温报警模板").first()).toBeVisible()
    })

    test("报警模板模块-用例8：根据待选参数筛选，选择“微信", async ({ page }) => {

        // 步骤1：进入到“报警模块”页面
        await page.goto("/alarm/alarmTemplate");
        await sleep(2);

        // 步骤2：根据待选参数筛选，选择“微信"
        await page.click("//div[text()='待选参数']");
        await sleep(1);
        await page.click("//*[@class='el-checkbox-group el-table-filter__checkbox-group']/label[3]/span/span");
        await sleep(1);

        // 步骤2：点击“筛选”
        await page.click("//*[text()='筛选']");
        await sleep(1);

        // 断言：“高温报警模板”出现在页面中
        await expect(page.locator("text = 高温报警模板").first()).toBeVisible()
    })

    test("报警模板模块-用例9：根据待选参数筛选，“短信”、“邮箱”、“微信”全部选中", async ({ page }) => {

        // 步骤1：进入到“报警模块”页面
        await page.goto("/alarm/alarmTemplate");
        await sleep(2);

        // 步骤2：根据待选参数筛选，“短信”、“邮箱”、“微信”全部选中
        await page.click("//div[text()='待选参数']");
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

        // 断言：“高温报警模板”出现在页面中
        await expect(page.locator("text = 高温报警模板").first()).toBeVisible()
    })

    test("报警模板模块-用例10：编辑报警模板", async ({ page }) => {

        // 步骤1：进入到“报警模板”页面
        await page.goto("/alarm/alarmTemplate");
        await sleep(2);

        // 步骤2：点击“编辑”按钮
        await page.click("//*[text()=' 短信 邮箱 微信  ']/../../td[5]/div/button[1]/span");
        await sleep(2);

        // 步骤3：在“编辑报警模板”页面做如下修改

        // 模板名称：高温报警模板  -->  平均温报警模板
        await page.fill("//*[text()='编辑报警模板']/../../div[2]/form/div[1]/div/div/input", "");
        await sleep(2);
        await page.fill("//*[text()='编辑报警模板']/../../div[2]/form/div[1]/div/div/input", "平均温报警模板");
        await sleep(2);

        // 告警内容：回转窑外壁温度过高，超过阈值400℃，报警温度为405℃  -->  回转窑外壁平均温过高，超过阈值400℃，报警温度为405℃
        await page.fill("//div[text()='短信']/../div[3]/div/div", "");
        await sleep(2);
        await page.fill("//div[text()='短信']/../div[3]/div/div", "回转窑外壁平均温过高，超过阈值400℃，报警温度为405℃");
        await sleep(2);
        // 告警对象：回转窑最高温  -->  回转窑平均温
        await page.fill("//div[text()='短信']/../div[4]/div/div", "");
        await sleep(2);
        await page.fill("//div[text()='短信']/../div[4]/div/div", "回转窑平均温");
        await sleep(2);
        // 告警时间：2021年2月24日  11:57  -->  2022年2月24日  11:57
        await page.fill("//div[text()='短信']/../div[5]/div/div", "");
        await sleep(2);
        await page.fill("//div[text()='短信']/../div[5]/div/div", "2022年2月24日  11:57");
        await sleep(2);

        // 邮件标题：回转窑外壁温度过高  -->  回转窑外壁平均温过高
        await page.fill("//*[text()='邮件标题']/../div/div", "");
        await sleep(2);
        await page.fill("//*[text()='邮件标题']/../div/div", "回转窑外壁平均温过高");
        await sleep(2);
        // 正文内容：回转窑外壁温度过高，超过阈值400℃，报警温度为405℃  -->  回转窑外壁平均温过高，超过阈值400℃，报警温度为405℃
        await page.fill("//*[text()='正文内容']/../div/div", "");
        await sleep(2);
        await page.fill("//*[text()='正文内容']/../div/div", "回转窑外壁平均温过高，超过阈值400℃，报警温度为405℃");
        await sleep(2);

        // { first.DATA }：高温红色报警事件  -->  平均温红色报警事件
        await page.fill("//*[text()='{first.DATA}']/../div/div", "");
        await sleep(2);
        await page.fill("//*[text()='{first.DATA}']/../div/div", "平均温红色报警事件");
        await sleep(2);
        // 告警对象：回转窑60m窑尾测温区域  -->  回转窑20m窑尾测温区域
        await page.fill("//div[text()='微信']/../div[3]/div[2]/div/div", "");
        await sleep(2);
        await page.fill("//div[text()='微信']/../div[3]/div[2]/div/div", "回转窑20m窑尾测温区域");
        await sleep(2);
        // 告警类型：高温报警  -->  平均温报警
        await page.fill("//div[text()='微信']/../div[3]/div[3]/div/div", "");
        await sleep(2);
        await page.fill("//div[text()='微信']/../div[3]/div[3]/div/div", "平均温报警");
        await sleep(2);
        // 告警时间：2021-2-24 16:53:03  -->  2022-2-24 16:53:03
        await page.fill("//div[text()='微信']/../div[3]/div[4]/div/div", "");
        await sleep(2);
        await page.fill("//div[text()='微信']/../div[3]/div[4]/div/div", "2022-2-24 16:53:03");
        await sleep(2);
        // 报警内容：当前最高温度为378℃，大于350℃  -->  当前平均温度为378℃，大于350℃
        await page.fill("//div[text()='微信']/../div[3]/div[5]/div/div", "");
        await sleep(2);
        await page.fill("//div[text()='微信']/../div[3]/div[5]/div/div", "当前平均温度为378℃，大于350℃");
        await sleep(2);
        // { remark.DATA }：请及时处理  -->  平均温超过阈值，请及时处理
        await page.fill("//div[text()='微信']/../div[3]/div[6]/div/div", "");
        await sleep(2);
        await page.fill("//div[text()='微信']/../div[3]/div[6]/div/div", "平均温超过阈值，请及时处理");
        await sleep(2);

        // 点击“提交”按钮
        await page.click("//*[text()='保存']");

        // 断言：新增成功后，页面中包含“修改成功”字样
        await expect(page.locator("text = 修改成功").first()).toBeVisible()
    })

    test("报警模板模块-用例11：删除报警模板", async ({ page }) => {

        // 步骤1：进入到“报警模板”页面
        await page.goto("/alarm/alarmTemplate");
        await sleep(2);

        // 步骤2：点击“删除”按钮
        await page.click("//*[text()='平均温报警模板']/../../td[5]//button[2]/span");
        await sleep(2);

        // 步骤3：点击“确认”按钮
        await page.click("//*[@class='el-message-box__btns']/button[2]");
        await sleep(2);

        // 断言：新增成功后，页面中包含“删除成功”字样
        await expect(page.locator("text = 删除成功").first()).toBeVisible()
    })
})
