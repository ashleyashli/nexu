/**
 * Build a Feishu interactive card for claim/registration flow.
 * Sent as a DM to unregistered users who message the bot.
 */
export function buildFeishuClaimCard(claimUrl: string) {
  return {
    header: {
      title: { tag: "plain_text", content: "Welcome to Nexu!" },
      template: "turquoise",
    },
    elements: [
      {
        tag: "div",
        text: {
          tag: "lark_md",
          content:
            "Set up your Nexu account to unlock personalized AI workflows and connect your identity.",
        },
      },
      {
        tag: "action",
        actions: [
          {
            tag: "button",
            text: { tag: "plain_text", content: "Set Up My Account" },
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
