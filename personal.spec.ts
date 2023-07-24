import { test, expect, chromium,  Page } from '@playwright/test';
import { isArrayBufferView } from 'util/types';
import { parseTime, sleep } from '../entries/util'

test.describe("个人中心模块", async () => {
    let page: Page

    test("个人中心模块-用例1：姓名修改为“秦能”，修改成功", async ({ page }) => {

        // 步骤1：进入到“个人中心”页面
        await page.goto("/personal");
        await sleep(2);

        // 步骤2：点击“修改姓名”按钮
        await page.click("//*[text()='姓名：']/../button");
        await sleep(2);

        // 步骤3：将姓名修改为“秦能”
        await page.fill("//*[text()='姓名：']/..//input", "");
        await sleep(2);
        await page.fill("//*[text()='姓名：']/..//input", "秦能");
        await sleep(2);

        // 步骤4：点击“确认修改”按钮
        await page.click("//*[text()='姓名：']/../button");
        await sleep(2);

        // 断言：“修改成功”出现在页面中
        await expect(page.locator("text = 修改成功").first()).toBeVisible()
    })

    test("个人中心模块-用例2：姓名修改为空，无法保存成功", async ({ page }) => {

        // 步骤1：进入到“个人中心”页面
        await page.goto("/personal");
        await sleep(2);

        // 步骤2：点击“修改姓名”按钮
        await page.click("//*[text()='姓名：']/../button");
        await sleep(2);

        // 步骤3：将姓名修改为“秦能”
        await page.fill("//*[text()='姓名：']/..//input", "");
        await sleep(2);

        // 步骤4：点击“确认修改”按钮
        await page.click("//*[text()='姓名：']/../button");
        await sleep(2);

        // 断言：“最多20字,且不能有空格”出现在页面中
        await expect(page.locator("text = 最多20字,且不能有空格").first()).toBeVisible()
    })

    test("个人中心模块-用例3：邮箱修改为“qin.neng@yoseenir.com”，修改成功", async ({ page }) => {

        // 步骤1：进入到“个人中心”页面
        await page.goto("/personal");
        await sleep(2);

        // 步骤2：点击“修改邮箱”按钮
        await page.click("//*[text()='邮箱：']/../button");
        await sleep(2);

        // 步骤3：将邮箱修改为“qin.neng@yoseenir.com”
        await page.fill("//*[text()='邮箱：']/..//input", "");
        await sleep(2);
        await page.fill("//*[text()='邮箱：']/..//input", "qin.neng@yoseenir.com");
        await sleep(2);

        // 步骤4：点击“确认修改”按钮
        await page.click("//*[text()='邮箱：']/../button");
        await sleep(2);

        // 断言：“修改成功”出现在页面中
        await expect(page.locator("text = 修改成功").first()).toBeVisible()
    })

    test("个人中心模块-用例4：邮箱修改为空，无法保存成功", async ({ page }) => {

        // 步骤1：进入到“个人中心”页面
        await page.goto("/personal");
        await sleep(2);

        // 步骤2：点击“修改邮箱”按钮
        await page.click("//*[text()='邮箱：']/../button");
        await sleep(2);

        // 步骤3：将邮箱修改为“qin.neng@yoseenir.com”
        await page.fill("//*[text()='邮箱：']/..//input", "");
        await sleep(2);

        // 步骤4：点击“确认修改”按钮
        await page.click("//*[text()='邮箱：']/../button");
        await sleep(2);

        // 断言：“请输入正确邮箱！”出现在页面中
        await expect(page.locator("text = 请输入正确邮箱！").first()).toBeVisible()
    })

    test("推送设置模块-用例5：在推送设置页面中，成功保存邮箱信息", async ({ page }) => {

        // 步骤1：进入到“推送设置”页面
        await page.goto("/pullsetting");
        await sleep(2);

        // 步骤2：点击“邮箱”按钮
        await page.click("//*[@id='tab-email']");
        await sleep(2);

        // 步骤3：点击“修改”按钮
        await page.click("//*[text()='修改']");
        await sleep(2);

        // 步骤4：在“修改邮箱”页面做如下输入
        // 发件人邮箱：support@yoseenir.com
        await page.fill("//*[text()='发件人邮箱']/..//input", "");
        await sleep(2);
        await page.fill("//*[text()='发件人邮箱']/..//input", "support@yoseenir.com");
        await sleep(2);

        // 发件人用户名：优信红外
        await page.fill("//*[text()='发件人用户名']/..//input", "");
        await sleep(2);
        await page.fill("//*[text()='发件人用户名']/..//input", "优信红外");
        await sleep(2);

        // 邮箱密码：yoseenir654321
        await page.fill("//*[text()='邮箱密码']/..//input", "");
        await sleep(2);
        await page.fill("//*[text()='邮箱密码']/..//input", "yoseenir654321");
        await sleep(2);

        // SMTP地址：smtp.mxhichina.com
        await page.fill("//*[text()='SMTP地址']/..//input", "");
        await sleep(2);
        await page.fill("//*[text()='SMTP地址']/..//input", "smtp.mxhichina.com");
        await sleep(2);

        // SMTP端口：80
        await page.fill("//*[text()='SMTP端口']/..//input", "");
        await sleep(2);
        await page.fill("//*[text()='SMTP端口']/..//input", "80");
        await sleep(2);

        // 步骤3：点击“保存”按钮
        await page.click("//*[text()='保存']");
        await sleep(2);

        // 断言：“提交成功”出现在页面中
        await expect(page.locator("text = 提交成功").first()).toBeVisible()
    })

    test("企业认证模块-用例6：在企业认证页面中，企业证件只可上传一次，验证进入企业认证后正在审核中", async ({ page }) => {

        // 步骤1：进入到“推送设置”页面
        await page.goto("/examine");
        await sleep(2);

        // 断言：“已提交， 审核中， 请耐心等待审核，审核时长大概为1-3个工作日！”出现在页面中
        await expect(page.locator("text = 已提交， 审核中， 请耐心等待审核，审核时长大概为1-3个工作日！").first()).toBeVisible()
    })

    test("创建企业模块-用例7：验证成功进入到创建企业页面中", async ({ page }) => {

        // 步骤1：进入到“创建企业”页面
        await page.goto("/noCompany");
        await sleep(2);

        // 断言：“快来创建/加入属于自己的企业/组织/团队吧！”出现在页面中
        await expect(page.locator("text = 快来创建/加入属于自己的企业/组织/团队吧！").first()).toBeVisible()
    })

    test("退出登录模块-用例8：退出登录", async ({ page }) => {

        // 步骤1：进入到“创建企业”页面
        await page.goto("/personal");
        await sleep(2);

        // 步骤2：点击“退出”按钮
        await page.click("//*[@class='user-avatar']");
        await sleep(2);
        await page.click("//*[text()='退出']");
        await sleep(2);
        await page.click("//*[@class='el-message-box']/div[3]/button[2]/span");
        await sleep(2);

        // 断言：“退出成功”出现在页面中
        await expect(page.locator("text = 退出成功").first()).toBeVisible()
    })
})