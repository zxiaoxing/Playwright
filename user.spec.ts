import { test, expect, Page } from '@playwright/test';
import { sleep } from '../entries/util'

test.describe("用户模块", async () => {
    let page: Page

    test("用户模块-用例1：根据“归属部门”搜索，搜索“人事行政部”，成功搜索到用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：归属部门选择“人事行政部”
        await page.click("//*[@class='vue-treeselect__control-arrow-container']");
        await sleep(1);
        await page.click("//*[@class='vue-treeselect__option-arrow-container']");
        await sleep(1);
        await page.click("//*[text()='人事行政部']");
        await sleep(1);

        // 断言：搜索成功后，用户“张三”出现在页面中
        await expect(page.locator("text = 张三").first()).toBeVisible()
    })

    test("用户模块-用例2：根据“归属部门”搜索，搜索“软件研发部”，未搜索到用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：归属部门选择“软件研发部”
        await page.click("//*[@class='vue-treeselect__control-arrow-container']");
        await sleep(1);
        await page.click("//*[@class='vue-treeselect__option-arrow-container']");
        await sleep(1);
        await page.click("//*[text()='软件研发部']");
        await sleep(1);

        // 断言：没有搜索到用户，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("用户模块-用例3：根据“用户姓名”搜索，搜索用户“秦能”，成功搜索到用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：在“用户姓名”搜索框中输入“秦能”
        await page.fill("//*[@placeholder='请输入用户姓名']", "秦能");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：搜索成功后，用户“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("用户模块-用例4：根据“用户姓名”搜索，搜索用户“周杰伦”，未搜索到用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：在“用户姓名”搜索框中输入“周杰伦”
        await page.fill("//*[@placeholder='请输入用户姓名']", "周杰伦");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：没有搜索到用户，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("用户模块-用例5：根据“手机号码”搜索，搜索手机号“15927391992”，成功搜索到用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：在“手机号码”搜索框中输入“15927391992”
        await page.fill("//*[@placeholder='请输入手机号码']", "15927391992");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：搜索成功后，用户“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("用户模块-用例6：根据“手机号码”搜索，搜索手机号“13900000000”，未搜索到用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：在“手机号码”搜索框中输入“13900000000”
        await page.fill("//*[@placeholder='请输入手机号码']", "13900000000");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：没有搜索到用户，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("用户模块-用例7：根据“创建时间”搜索，开始时间为“2021-06-30”，结束时间为“2021-07-30”，成功搜索到用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：在“创建时间”搜索框中输入开始时间“2021-06-30”，结束时间“2021-07-30”
        await page.click("//*[@placeholder='开始时间']")
        await sleep(1);
        await page.fill("//*[@placeholder='开始时间']", "2021-06-30");
        await sleep(1);
        await page.click("//*[@placeholder='结束时间']")
        await sleep(1);
        await page.fill("//*[@placeholder='结束时间']", "2021-07-30");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：搜索成功后，用户“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("用户模块-用例8：根据“创建时间”搜索，开始时间为“2021-05-30”，结束时间为“2021-06-30”，未搜索到用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：在“创建时间”搜索框中输入开始时间“2021-05-30”，结束时间“2021-06-30”
        await page.click("//*[@placeholder='开始时间']")
        await sleep(1);
        await page.fill("//*[@placeholder='开始时间']", "2021-05-30");
        await sleep(1);
        await page.click("//*[@placeholder='结束时间']")
        await sleep(1);
        await page.fill("//*[@placeholder='结束时间']", "2021-06-30");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：没有搜索到用户，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("用户模块-用例9：根据“用户角色”搜索，成功搜索到用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：在“用户角色”搜索框中输入“创建者”
        await page.fill("//*[@placeholder='请输入角色名称']", "创建者");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：搜索成功后，用户“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("用户模块-用例10：根据“用户角色”搜索，未搜索到用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：在“用户角色”搜索框中输入“普通职员”
        await page.fill("//*[@placeholder='请输入角色名称']", "普通职员");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：没有搜索到用户，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("用户模块-用例11：重置操作", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：在“用户角色”搜索框中输入“普通职员”
        await page.fill("//*[@placeholder='请输入角色名称']", "普通职员");
        await sleep(1);

        // 步骤3：点击“搜索”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small']");
        await sleep(1);

        // 断言：没有搜索到用户，页面中包含“暂无数据”字样
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()

        // 步骤4：点击“重置”按钮
        await page.click("//*[@class='el-button el-button--primary el-button--small is-plain']");
        await sleep(1);

        // 断言：搜索成功后，用户“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("用户模块-用例12：新增用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：点击“新增用户”按钮
        await page.click("//*[text()='新增']");
        await sleep(1);

        // 步骤3：在“新增用户”页面输入如下内容：
        // 用户姓名输入框：周建建
        await page.fill("//*[@placeholder='请输入用户姓名' and @maxlength='20']", "周建建");
        await sleep(1);
        // 归属部门输入框：软件研发部
        await page.click("//*[text()='新增用户']/../../div[2]/form/div[2]/div/div");
        await sleep(1);
        await page.click("//*[@class='vue-treeselect__option-arrow-container']");
        await sleep(1);
        await page.click("//label[text()='软件研发部']");
        await sleep(1);
        // 手机号码输入框：18627728716
        await page.fill("//*[@placeholder='请输入手机号码' and @maxlength='11']", "18627728716");
        await sleep(1);
        // 邮箱输入框：zhou.jianjian@yoseenir.com
        await page.fill("//*[@placeholder='请输入邮箱' and @maxlength='50']", "zhou.jianjian@yoseenir.com");
        await sleep(1);
        // 用户角色输入框：公司员工
        await page.click("//*[text()='新增用户']/../../div[2]/form/div[6]/div/div");
        await sleep(1);
        await page.click("//span[text()='公司员工']");
        await sleep(1);

        // 步骤4：点击“提交”按钮
        await page.click("//*[text()='提交']");
        await sleep(1);

        //断言：用户页面中包含“周建建”字样
        await expect(page.locator("text = 周建建").first()).toBeVisible()

    })

    test("用户模块-用例13：根据用户状态筛选，用户状态选择“激活", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：根据用户状态筛选，选择“激活”
        await page.click("//div[text()='用户状态']");
        await sleep(1);
        await page.click("//*[text()='激活']");
        await sleep(1);

        // 断言：搜索后，用户“秦能”出现在页面中
        await expect(page.locator("text = 秦能").first()).toBeVisible()
    })

    test("用户模块-用例14：根据用户状态筛选，用户状态选择“冻结”", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：根据用户状态筛选，选择“冻结”
        await page.click("//div[text()='用户状态']");
        await sleep(1);
        await page.click("//*[text()='冻结']");
        await sleep(1);

        // 断言：搜索后，用户“暂无数据”出现在页面中
        await expect(page.locator("text = 暂无数据").first()).toBeVisible()
    })

    test("用户模块-用例15：编辑用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：点击“编辑用户”按钮
        await page.click("//*[text()='周建建']/../../td[9]/div/button[1]");
        await sleep(1);

        // 步骤3：在“编辑用户”页面修改如下内容：
        // 用户姓名输入框：周建建 -->  李四
        await page.fill("//*[@placeholder='请输入用户姓名' and @maxlength='20']", "");
        await sleep(1);
        await page.fill("//*[@placeholder='请输入用户姓名' and @maxlength='20']", "李四");
        await sleep(1);
        // 归属部门输入框：软件研发部 -->  硬件研发部
        await page.click("//*[text()='编辑用户']/../../div[2]/form/div[2]/div");
        await sleep(1);
        await page.click("//*[@class='vue-treeselect__option-arrow-container']");
        await sleep(1);
        await page.click("//label[text()='硬件研发部']");
        await sleep(1);
        // 邮箱输入框：zhou.jianjian@@yoseenir.com -->  li.si@yoseenir.com
        await page.fill("//*[@placeholder='请输入邮箱' and @maxlength='50']", "");
        await sleep(1);
        await page.fill("//*[@placeholder='请输入邮箱' and @maxlength='50']", "li.si@yoseenir.com");
        await sleep(1);
        // 用户角色输入框：公司员工 -->  公司管理
        await page.click("//*[text()='编辑用户']/../../div[2]/form/div[6]/div/div");
        await sleep(1);
        await page.click("//span[text()='公司管理']");
        await sleep(1);

        // 步骤4：点击“保存”按钮
        await page.click("//*[text()='保存']");
        await sleep(1);

        //断言：用户页面中包含“李四”字样
        await expect(page.locator("text = 李四").first()).toBeVisible()

    })

    test("用户模块-用例16：删除用户", async ({ page }) => {

        // 步骤1：进入到“用户”页面
        await page.goto("/system/user");
        await sleep(1);

        // 步骤2：点击“删除用户”按钮
        await page.click("//*[text()='李四']/../../td[9]/div/button[2]");
        await sleep(1);

        // 步骤3：点击“确认”按钮
        await page.click("//*[text()='警告']/../../../div[3]/button[2]/span");
        await sleep(1);


        //断言：用户页面中包含“删除成功”字样
        await expect(page.locator("text = 删除成功").first()).toBeVisible()

    })
})
