# 模型配置

nexu 支持两种模型接入方式，随时切换，不影响已有对话和渠道连接。

## 第一步：打开 AI Model Providers

在 nexu 客户端左侧导航栏点击 **Settings**，然后选择 **AI Model Providers** 标签页。

<img src="/assets/nexu-settings-open.png" alt="打开 AI Model Providers 标签页" class="doc-img" />

## 第二步：选择接入方式

### 方式 A — Nexu Official（推荐）

在供应商列表中选择 **Nexu Official**。登录 nexu 账号后自动完成连接，无需填写任何 API Key。

<img src="/assets/nexu-models-official.png" alt="Nexu Official 已连接" class="doc-img" />

连接成功后，页面会显示「Connected to Nexu Cloud」，完整的模型目录立即可用。

### 方式 B — 自带密钥（BYOK）

在左侧供应商列表中选择 **Anthropic**、**OpenAI**、**Google AI** 或 **Custom**。

<img src="/assets/nexu-models-byok.png" alt="BYOK 供应商选择" class="doc-img" />

1. 在 **API Key** 字段粘贴你的密钥。
2. 如果使用自定义网关或代理，可修改 **API Proxy URL**。
3. 点击 **Save**，nexu 会自动验证密钥并加载可用模型列表。

## 第三步：选择模型

供应商连接成功后，使用 Settings 页面顶部的 **Current Model** 下拉菜单，选择 Agent 使用的模型。

## 支持的供应商

| 供应商 | 默认 Base URL | 密钥格式 |
| --- | --- | --- |
| Anthropic | `https://api.anthropic.com` | `sk-ant-...` |
| OpenAI | `https://api.openai.com/v1` | `sk-...` |
| Google AI | `https://generativelanguage.googleapis.com/v1beta` | `AIza...` |
| Custom | 你的 OpenAI 兼容端点 | 取决于服务商 |

## 常用模型参考

- Anthropic：`claude-opus-4`、`claude-sonnet-4`、`claude-haiku`
- OpenAI：`gpt-4o`、`gpt-4o-mini`、`o1`、`o3-mini`
- Google AI：`gemini-2.5-flash`、`gemini-2.5-pro`

## 使用建议

- 使用最小权限的 API Key，避免不必要的访问范围。
- 不要在截图、工单或 git 提交记录中暴露密钥。
- 添加 BYOK 供应商时，先点击 **Check** 验证连接，再保存，确保 nexu 能正确发现可用模型。
- 如果需要代理、自建网关或 OpenAI 兼容推理服务，使用 **Custom** 供应商类型。

## 最佳实践

快速开始优先使用 **Nexu Official**；当需要更细的模型控制、独立计费或自定义路由时，再添加 BYOK 供应商。

## 常见问题

**Q: 刚开始用哪种方式比较好？**

推荐使用 Nexu Official——登录账号后无需任何配置，即可使用高质量模型。

**Q: 可以同时配置多个 BYOK 供应商吗？**

可以。Anthropic、OpenAI、Google AI 可以独立配置，随时通过模型下拉菜单切换。

**Q: API Key 会被上传到 nexu 服务器吗？**

不会。API Key 仅存储在你的本地设备上，不会传输至 nexu 服务器。
