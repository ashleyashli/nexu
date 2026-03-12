/**
 * Feishu interactive cards for the claim/registration flow.
 *
 * Flow:
 * 1. Unregistered user messages bot → send initial card with action button
 * 2. User clicks button → Feishu card callback → server generates claim token
 * 3. Server returns updated card with multi_url button pointing to claim page
 * 4. If user is already registered → return "already linked" card
 */

/** Initial claim card: action button triggers card callback (no URL jump). */
export function buildFeishuClaimCard(
  workspaceKey: string,
  botId: string,
  appId: string,
) {
  return {
    header: {
      title: { tag: "plain_text", content: "👋 绑定你的 Nexu 账号" },
      template: "turquoise",
    },
    elements: [
      {
        tag: "div",
        text: {
          tag: "lark_md",
          content:
            "Hey！在回复你之前，需要先绑定一下你的 Nexu 账号。\n\n只需 30 秒，绑定后我就能记住你的偏好，提供个性化服务。",
        },
      },
      {
        tag: "action",
        actions: [
          {
            tag: "button",
            text: { tag: "plain_text", content: "绑定账号" },
            type: "primary",
            value: { workspaceKey, botId, appId },
          },
        ],
      },
    ],
  };
}

/** Updated card returned by card callback: multi_url button to claim page. */
export function buildFeishuClaimCardWithUrl(claimUrl: string) {
  return {
    header: {
      title: { tag: "plain_text", content: "👋 绑定你的 Nexu 账号" },
      template: "turquoise",
    },
    elements: [
      {
        tag: "div",
        text: {
          tag: "lark_md",
          content: "点击下方按钮打开注册页面，完成账号绑定。",
        },
      },
      {
        tag: "action",
        actions: [
          {
            tag: "button",
            text: { tag: "plain_text", content: "打开注册页面" },
            type: "primary",
            multi_url: {
              url: claimUrl,
              pc_url: claimUrl,
              ios_url: claimUrl,
              android_url: claimUrl,
            },
          },
        ],
      },
    ],
  };
}

/** Card shown when user is already registered. */
export function buildFeishuClaimCardDone() {
  return {
    header: {
      title: { tag: "plain_text", content: "✅ 已绑定" },
      template: "green",
    },
    elements: [
      {
        tag: "div",
        text: {
          tag: "lark_md",
          content: "你的飞书账号已绑定 Nexu，可以正常使用了。",
        },
      },
    ],
  };
}
