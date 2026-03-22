import { describe, expect, it } from "vitest";

function resolveFeedUrl(options: {
  source: "r2" | "github";
  channel: "stable" | "beta" | "nightly";
  feedUrl?: string | null;
  envFeedUrl?: string | undefined;
}): string {
  const r2BaseUrl = "https://desktop-releases.nexu.io";
  const r2FeedUrls = {
    stable: `${r2BaseUrl}/stable`,
    beta: `${r2BaseUrl}/beta`,
    nightly: `${r2BaseUrl}/nightly`,
  } as const;

  const overrideUrl = options.envFeedUrl ?? options.feedUrl;
  if (overrideUrl) {
    return overrideUrl;
  }

  if (options.source === "github") {
    return "github://nexu-io/nexu";
  }

  return r2FeedUrls[options.channel];
}

describe("desktop update feed resolution", () => {
  it("uses the nightly R2 feed for nightly channel builds", () => {
    expect(
      resolveFeedUrl({
        source: "r2",
        channel: "nightly",
      }),
    ).toBe("https://desktop-releases.nexu.io/nightly");
  });

  it("lets explicit feed URLs override the channel mapping", () => {
    expect(
      resolveFeedUrl({
        source: "r2",
        channel: "nightly",
        feedUrl: "https://cdn.example.com/custom-nightly",
      }),
    ).toBe("https://cdn.example.com/custom-nightly");
  });
});
