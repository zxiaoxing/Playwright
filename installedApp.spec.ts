import { test, expect, chromium,  Page } from '@playwright/test';
import { isArrayBufferView } from 'util/types';
import { parseTime, sleep } from '../entries/util'

test.describe("已安装应用模块", async () => {
    let page: Page

    test("已安装应用模块-用例1：根据“应用名称”搜索，搜索“铁水连续测温系统”，成功搜索到应用", async ({ page }) => {

        // 步骤1：进入到“已安装应用”页面
        await page.goto("/application/installedApp");
        await sleep(2);

        // 步骤2：在“应用名称”搜索框中输入“铁水连续测温系统”
        await page.fill("//*[@placeholder='请输入应用名称']", "铁水连续测温系统");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：搜索成功后，“高炉”出现在页面中
        await expect(page.locator("text = 高炉").first()).toBeVisible()
    })

    test("已安装应用模块-用例2：根据“应用名称”搜索，搜索“热风炉关键位置温度在线监控系统”，未搜索到应用", async ({ page }) => {

        // 步骤1：进入到“已安装应用”页面
        await page.goto("/application/installedApp");
        await sleep(2);

        // 步骤2：在“应用名称”搜索框中输入“铁水连续测温系统”
        await page.fill("//*[@placeholder='请输入应用名称']", "热风炉关键位置温度在线监控系统");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("已安装应用模块-用例3：根据“应用类型”搜索，搜索“回转窑”，成功搜索到应用", async ({ page }) => {

        // 步骤1：进入到“已安装应用”页面
        await page.goto("/application/installedApp");
        await sleep(2);

        // 步骤2：在“应用类型”搜索框中输入“铁水连续测温系统”
        await page.fill("//*[@placeholder='请输入应用类型']", "回转窑");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：搜索成功后，“回转窑”出现在页面中
        await expect(page.locator("text = 回转窑侵蚀诊断系统").first()).toBeVisible()
    })

    test("已安装应用模块-用例4：根据“应用类型”搜索，搜索“电石炉”，未搜索到应用", async ({ page }) => {

        // 步骤1：进入到“已安装应用”页面
        await page.goto("/application/installedApp");
        await sleep(2);

        // 步骤2：在“应用类型”搜索框中输入“电石炉”
        await page.fill("//*[@placeholder='请输入应用类型']", "电石炉");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("已安装应用模块-用例5：重置操作", async ({ page }) => {

        // 步骤1：进入到“已安装应用”页面
        await page.goto("/application/installedApp");
        await sleep(2);

        // 步骤2：在“应用类型”搜索框中输入“电石炉”
        await page.fill("//*[@placeholder='请输入应用类型']", "电石炉");
        await sleep(2);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-icon-search']");
        await sleep(2);

        // 断言：“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()

        // 步骤4：点击“重置”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small is-plain']");
        await sleep(2);

        // 断言：“回转窑”出现在页面中
        await expect(page.locator("text = 铁水连续测温系统").first()).toBeVisible()
    })

    test("已安装应用模块-用例6：点击“创建应用”，成功跳转到“应用中心”页面", async ({ page }) => {

        // 步骤1：进入到“已安装应用”页面
        await page.goto("/application/installedApp");
        await sleep(2);

        // 步骤2：点击“创建应用”按钮
        await page.click("//*[text()='创建应用']");
        await sleep(2);

        // 断言：“应用中心”出现在页面中
        await expect(page.locator("text = 应用中心").first()).toBeVisible()
    })

    test("已安装应用模块-用例7：点击“详情”，成功跳转到“应用详情”页面", async ({ page }) => {

        // 步骤1：进入到“已安装应用”页面
        await page.goto("/application/installedApp");
        await sleep(2);

        // 步骤2：点击“详情”按钮
        await page.click("//*[text()='铁水连续测温系统']/../../td[7]//span");
        await sleep(2);

        // 断言：“应用详情”出现在页面中
        await expect(page.locator("text = 应用详情").first()).toBeVisible()
    })

    test("已安装应用模块-用例8：编辑“应用详情”", async ({ page }) => {

        // 步骤1：进入到“已安装应用”页面
        await page.goto("/application/installedApp");
        await sleep(2);

        // 步骤2：点击“详情”按钮
        await page.click("//tbody/tr[1]/td[7]//span");
        await sleep(2);

        // 步骤3：点击“编辑”按钮
        await page.click("//*[text()='编辑']");
        await sleep(2);

        // 步骤4：修改“铁水连续测温系统”的应用简介和备注
        // 应用简介：高炉铁水连续测温系统使用在线式双色红外测温探头,通过在线式红外测温技术,可以将物体自身热辐射进行非接触式测温,并实时记录温度数据,把原本看不见的“温度”可视化
        await page.fill("//*[text()='应用简介']/..//textarea", "");
        await sleep(5);
        await page.fill("//*[text()='应用简介']/..//textarea", "高炉铁水连续测温系统使用在线式双色红外测温探头,通过在线式红外测温技术,可以将物体自身热辐射进行非接触式测温,并实时记录温度数据,把原本看不见的“温度”可视化");
        await sleep(2);
        // 备注：八一钢铁-高炉出铁口
        await page.fill("//*[text()='备注']/..//textarea", "");
        await sleep(2);
        await page.fill("//*[text()='备注']/..//textarea", "八一钢铁-高炉出铁口");
        await sleep(2);

        // 步骤5：点击“提交”按钮
        await page.click("//*[text()='提交']");
        await sleep(2);

        // 断言：“修改成功”出现在页面中
        await expect(page.locator("text = 修改成功").first()).toBeVisible()
    })
})
