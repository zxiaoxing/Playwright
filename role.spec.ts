import { test, expect, Page } from '@playwright/test';
import { sleep } from '../entries/util'

test.describe("角色模块", async () => {
    let page: Page

    test("角色模块-用例1：根据“角色名称”搜索，搜索角色“创建者”，成功搜索到角色", async ({ page }) => {

        // 步骤1：进入到“角色”页面
        await page.goto("/system/role");
        await sleep(1);

        // 步骤2：在“角色名称”搜索框中输入“创建者”
        await page.fill("//*[@placeholder='请输入角色名称']", "创建者");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：搜索成功后，“创建者”出现在页面中
        await expect(page.locator("text = 创建者").first()).toBeVisible()
    })

    test("角色模块-用例2：根据“角色名称”搜索，搜索角色“公司职员”，未搜索到角色", async ({ page }) => {

        // 步骤1：进入到“角色”页面
        await page.goto("/system/role");
        await sleep(1);

        // 步骤2：在“角色名称”搜索框中输入“公司职员”
        await page.fill("//*[@placeholder='请输入角色名称']", "公司职员");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：没有搜索到角色，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("角色模块-用例3：根据“创建时间”搜索，开始时间为“2021-06-30”，结束时间为“2021-07-30”，成功搜索到角色", async ({ page }) => {

        // 步骤1：进入到“角色”页面
        await page.goto("/system/role");
        await sleep(1);

        // 步骤2：在“创建时间”搜索框中输入开始时间“2021-06-30”，结束时间“2021-07-30”
        await page.click("//*[@placeholder='开始日期']")
        await sleep(1);
        await page.fill("//*[@placeholder='开始日期']", "2021-06-30");
        await sleep(1);
        await page.click("//*[@placeholder='结束日期']")
        await sleep(1);
        await page.fill("//*[@placeholder='结束日期']", "2021-07-30");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：搜索成功后，角色“创建者”出现在页面中
        await expect(page.locator("text = 创建者").first()).toBeVisible()
    })

    test("角色模块-用例4：根据“创建时间”搜索，开始时间为“2021-05-30”，结束时间为“2021-06-30”，未搜索到角色", async ({ page }) => {

        // 步骤1：进入到“角色”页面
        await page.goto("/system/role");
        await sleep(1);

        // 步骤2：在“创建时间”搜索框中输入开始时间“2021-05-30”，结束时间“2021-06-30”
        await page.click("//*[@placeholder='开始日期']")
        await sleep(1);
        await page.fill("//*[@placeholder='开始日期']", "2021-05-30");
        await sleep(1);
        await page.click("//*[@placeholder='结束日期']")
        await sleep(1);
        await page.fill("//*[@placeholder='结束日期']", "2021-06-30");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：没有搜索到角色，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("角色模块-用例5：重置操作", async ({ page }) => {

        // 步骤1：进入到“角色”页面
        await page.goto("/system/role");
        await sleep(1);

        // 步骤2：在“角色名称”搜索框中输入“公司职员”
        await page.fill("//*[@placeholder='请输入角色名称']", "公司职员");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：没有搜索到角色，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()

        // 步骤4：点击“重置”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small is-plain']");
        await sleep(1);

        // 断言：搜索成功后，角色“创建者”出现在页面中
        await expect(page.locator("text = 创建者").first()).toBeVisible()
    })

    test("角色模块-用例6：新增角色", async ({ page }) => {

        // 步骤1：进入到“角色”页面
        await page.goto("/system/role");
        await sleep(1);

        // 步骤2：点击“新增用户”按钮
        await page.click("//*[text()='新增']");
        await sleep(1);

        // 步骤3：在“新增角色”页面输入如下内容：
        // 角色名称输入框：市场部经理
        await page.fill("//*[text()='新增角色']/../../div[2]/form/div[1]/div/div/input", "市场部经理");
        await sleep(1);

        // 菜单权限：全部勾选
        await page.click("//*[text()='报警' and @class='el-tree-node__label']/../label/span/span");
        await sleep(1);
        await page.click("//*[text()='应用' and @class='el-tree-node__label']/../label/span/span");
        await sleep(1);
        await page.click("//*[text()='设备管理' and @class='el-tree-node__label']/../label/span/span");
        await sleep(1);
        await page.click("//*[text()='通讯录' and @class='el-tree-node__label']/../label/span/span");
        await sleep(1);

        // 步骤4：点击“提交”按钮
        await page.click("//*[text()='提交']");
        await sleep(1);

        //断言：角色页面中包含“市场部经理”字样
        await expect(page.locator("text = 市场部经理").first()).toBeVisible()

    })

    test("角色模块-用例7：根据角色状态筛选，角色状态选择“激活", async ({ page }) => {

        // 步骤1：进入到“角色”页面
        await page.goto("/system/role");
        await sleep(1);

        // 步骤2：根据角色状态筛选，选择“激活”
        await page.click("//div[text()='角色状态']");
        await sleep(1);
        await page.click("//*[text()='激活']");
        await sleep(1);

        // 断言：搜索后，角色“创建者”出现在页面中
        await expect(page.locator("text = 创建者").first()).toBeVisible()
    })

    test("角色模块-用例8：根据角色状态筛选，角色状态选择“冻结”", async ({ page }) => {

        // 步骤1：进入到“角色”页面
        await page.goto("/system/role");
        await sleep(1);

        // 步骤2：根据角色状态筛选，选择“冻结”
        await page.click("//div[text()='角色状态']");
        await sleep(1);
        await page.click("//*[text()='冻结']");
        await sleep(1);

        // 断言：搜索后，“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("角色模块-用例9：编辑角色", async ({ page }) => {

        // 步骤1：进入到“角色”页面
        await page.goto("/system/role");
        await sleep(1);

        // 步骤2：点击“编辑用户”按钮
        await page.click("//*[text()='市场部经理']/../../td[5]/div/button[1]/span");
        await sleep(1);

        // 步骤3：在“编辑角色”页面修改如下内容：
        // 角色名称输入框：市场部经理  -->  销售部经理
        await page.fill("//*[text()='编辑角色']/../../div[2]/form/div[1]/div/div/input", "");
        await sleep(1);
        await page.fill("//*[text()='编辑角色']/../../div[2]/form/div[1]/div/div/input", "销售部经理");
        await sleep(1);

        // 菜单权限：全部勾选  -->  只勾选报警
        await page.click("//*[text()='应用' and @class='el-tree-node__label']/../label/span/span");
        await sleep(1);
        await page.click("//*[text()='设备管理' and @class='el-tree-node__label']/../label/span/span");
        await sleep(1);
        await page.click("//*[text()='通讯录' and @class='el-tree-node__label']/../label/span/span");
        await sleep(1);

        // 步骤4：点击“提交”按钮
        await page.click("//*[text()='保存']");
        await sleep(1);

        //断言：角色页面中包含“修改成功”字样
        await expect(page.locator("text = 修改成功").first()).toBeVisible()
    })

    test("角色模块-用例10：删除用户", async ({ page }) => {

        // 步骤1：进入到“角色”页面
        await page.goto("/system/role");
        await sleep(1);

        // 步骤2：点击“删除角色”按钮
        await page.click("//*[text()='销售部经理']/../../td[5]/div/button[2]");
        await sleep(1);

        // 步骤3：点击“确认”按钮
        await page.click("//*[text()='警告']/../../../div[3]/button[2]/span");
        await sleep(1);

        //断言：用户页面中包含“删除成功”字样
        await expect(page.locator("text = 删除成功").first()).toBeVisible()

    })
})
