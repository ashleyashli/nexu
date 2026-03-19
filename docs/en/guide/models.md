# Model Configuration

nexu supports two model paths. You can switch between them at any time without affecting existing conversations or channel connections.

## Step 1: Open AI Model Providers

In the nexu client, click **Settings** in the left sidebar, then select the **AI Model Providers** tab.

<img src="/assets/nexu-settings-open.png" alt="Open AI Model Providers tab" class="doc-img" />

## Step 2: Choose your path

### Option A — Nexu Official (recommended)

Select **Nexu Official** from the provider list. If you're signed in to your nexu account, the connection is established automatically — no API key required.

<img src="/assets/nexu-models-official.png" alt="Nexu Official connected" class="doc-img" />

You'll see a "Connected to Nexu Cloud" confirmation and the full model catalog becomes available immediately.

### Option B — Bring Your Own Key (BYOK)

Select a provider from the sidebar — **Anthropic**, **OpenAI**, **Google AI**, or **Custom**.

<img src="/assets/nexu-models-byok.png" alt="BYOK provider selection" class="doc-img" />

1. Paste your API key into the **API Key** field.
2. Optionally update the **API Proxy URL** if you're using a custom gateway or proxy.
3. Click **Save**. nexu will verify the key and load the available model list.

## Step 3: Select a model

Once a provider is connected, use the **Current Model** dropdown at the top of the Settings page to choose which model the Agent uses.

## Supported providers

| Provider | Default base URL | Key format |
| --- | --- | --- |
| Anthropic | `https://api.anthropic.com` | `sk-ant-...` |
| OpenAI | `https://api.openai.com/v1` | `sk-...` |
| Google AI | `https://generativelanguage.googleapis.com/v1beta` | `AIza...` |
| Custom | your OpenAI-compatible endpoint | provider-specific |

## Common model families

- Anthropic: `claude-opus-4`, `claude-sonnet-4`, `claude-haiku`
- OpenAI: `gpt-4o`, `gpt-4o-mini`, `o1`, `o3-mini`
- Google AI: `gemini-2.5-flash`, `gemini-2.5-pro`

## Operational guidance

- Use least-privilege API keys — avoid overly broad access scopes.
- Never expose API keys in screenshots, support tickets, or git history.
- When adding a BYOK provider, click **Check** to verify the connection before saving, so nexu can discover the available model list.
- Use the **Custom** provider type when you need a proxy, self-hosted gateway, or OpenAI-compatible inference service.

## Best practice

Start with **Nexu Official** for the fastest onboarding. Add BYOK providers only when you need specific model control, billing separation, or custom routing.

## FAQ

**Q: Which option should I use to get started?**

Use Nexu Official — it requires no API key and gives you access to premium models immediately after signing in.

**Q: Can I add multiple BYOK providers?**

Yes. You can configure Anthropic, OpenAI, and Google AI independently and switch between them at any time from the model dropdown.

**Q: Is my API key stored securely?**

API keys are stored locally on your device and never transmitted to nexu servers.
