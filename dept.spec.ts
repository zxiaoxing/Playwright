import { test, expect, Page } from '@playwright/test';
import { sleep } from '../entries/util'

test.describe("部门模块", async () => {
    let page: Page

    test("部门模块-用例1：根据“部门名称”搜索，搜索部门“软件研发部”，成功搜索到角色", async ({ page }) => {

        // 步骤1：进入到“部门”页面
        await page.goto("/system/dept");
        await sleep(1);

        // 步骤2：在“部门名称”搜索框中输入“软件研发部”
        await page.fill("//*[@placeholder='请输入部门名称']", "软件研发部");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：搜索成功后，“软件研发部”出现在页面中
        await expect(page.locator("text = 软件研发部").first()).toBeVisible()
    })

    test("部门模块-用例2：根据“部门名称”搜索，搜索部门“人力资源部”，未搜索到角色", async ({ page }) => {

        // 步骤1：进入到“部门”页面
        await page.goto("/system/dept");
        await sleep(1);

        // 步骤2：在“部门名称”搜索框中输入“人力资源部”
        await page.fill("//*[@placeholder='请输入部门名称']", "人力资源部");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：没有搜索到部门，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("部门模块-用例3：根据“创建时间”搜索，开始时间为“2021-06-30”，结束时间为“2021-07-30”，成功搜索到部门", async ({ page }) => {

        // 步骤1：进入到“部门”页面
        await page.goto("/system/dept");
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

        // 断言：搜索成功后，部门“软件研发部”出现在页面中
        await expect(page.locator("text = 软件研发部").first()).toBeVisible()
    })

    test("部门模块-用例4：根据“创建时间”搜索，开始时间为“2021-05-30”，结束时间为“2021-06-30”，未搜索到部门", async ({ page }) => {

        // 步骤1：进入到“部门”页面
        await page.goto("/system/dept");
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

        // 断言：没有搜索到部门，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("部门模块-用例5：重置操作", async ({ page }) => {

        // 步骤1：进入到“部门”页面
        await page.goto("/system/dept");
        await sleep(1);

        // 步骤2：在“部门名称”搜索框中输入“人力资源部”
        await page.fill("//*[@placeholder='请输入部门名称']", "人力资源部");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：没有搜索到部门，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()

        // 步骤4：点击“重置”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small is-plain']");
        await sleep(1);

        // 断言：搜索成功后，部门“软件研发部”出现在页面中
        await expect(page.locator("text = 软件研发部").first()).toBeVisible()
    })

    test("部门模块-用例6：新增部门", async ({ page }) => {

        // 步骤1：进入到“部门”页面
        await page.goto("/system/dept");
        await sleep(1);

        // 步骤2：点击“新增部门”按钮
        await page.click("//*[text()='新增']");
        await sleep(1);

        // 步骤3：在“新增部门”页面输入如下内容：
        // 上级部门下拉框：武汉格物优信科技有限公司
        await page.click("//*[text()='新增部门']/../../div[2]/form/div/div[1]/div/div");
        await sleep(1);
        await page.click("//*[@class='vue-treeselect__label']");
        await sleep(1);

        // 部门名称输入框：市场销售部
        await page.fill("//*[text()='新增部门']/../../div[2]/form/div/div[2]/div/div/div/input", "市场销售部");
        await sleep(1);

        // 负责人：杨先生
        await page.fill("//*[text()='新增部门']/../../div[2]/form/div/div[3]/div/div/div/input", "杨先生");
        await sleep(1);

        // 步骤4：点击“提交”按钮
        await page.click("//*[text()='提交']");
        await sleep(1);

        //断言：角色页面中包含“市场销售部”字样
        await expect(page.locator("text = 市场销售部").first()).toBeVisible()
    })

    test("部门模块-用例7：编辑部门", async ({ page }) => {

        // 步骤1：进入到“部门”页面
        await page.goto("/system/dept");
        await sleep(1);

        // 步骤2：点击“编辑部门”按钮
        await page.click("//*[text()='杨先生']/../../td[5]/div/button[1]/span");
        await sleep(1);

        // 步骤3：在“编辑部门”页面输入如下内容：
        // 上级部门下拉框：武汉格物优信科技有限公司  -->  软件研发部
        await page.click("//*[text()='编辑部门']/../../div[2]/form/div/div[1]/div/div");
        await sleep(1);
        await page.click("//*[@class='vue-treeselect__option-arrow-container']");
        await sleep(1);
        await page.click("//label[text()='软件研发部']");
        await sleep(1);

        // 部门名称输入框：市场销售部  -->  软件研发一部
        await page.fill("//*[text()='编辑部门']/../../div[2]/form/div/div[2]/div/div/div/input", "");
        await sleep(1);
        await page.fill("//*[text()='编辑部门']/../../div[2]/form/div/div[2]/div/div/div/input", "软件研发一部");
        await sleep(1);

        // 负责人：杨先生-->  周先生
        await page.fill("//*[text()='编辑部门']/../../div[2]/form/div/div[3]/div/div/div/input", "");
        await sleep(1);
        await page.fill("//*[text()='编辑部门']/../../div[2]/form/div/div[3]/div/div/div/input", "周先生");
        await sleep(1);

        // 步骤4：点击“保存”按钮
        await page.click("//*[text()='保存']");
        await sleep(1);

        //断言：角色页面中包含“软件研发一部”字样
        await expect(page.locator("text = 软件研发一部").first()).toBeVisible()
    })

    test("部门模块-用例8：删除部门", async ({ page }) => {

        // 步骤1：进入到“部门”页面
        await page.goto("/system/dept");
        await sleep(1);

        // 步骤2：点击“删除部门”按钮
        await page.click("//*[text()='软件研发一部']/../../td[5]/div/button[2]/span");
        await sleep(1);

        // 步骤3：点击“确认”按钮
        await page.click("//*[text()='警告']/../../../div[3]/button[2]/span");
        await sleep(1);

        //断言：用户页面中包含“删除成功”字样
        await expect(page.locator("text = 删除成功").first()).toBeVisible()
    })
})
