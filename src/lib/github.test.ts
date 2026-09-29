import assert from "node:assert/strict";
import { test } from "node:test";

import { fetchPortfolioRepos } from "@/lib/github";

type Call = { url: string; auth: string | null };

function repo(name: string, extra: Record<string, unknown> = {}) {
  return {
    name,
    html_url: `https://github.com/teziovsky/${name}`,
    topics: ["portfolio"],
    pushed_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    owner: { login: "teziovsky" },
    ...extra,
  };
}

// A fake GitHub API: the private listing answers only to `validToken`.
function fakeGitHub(validToken: string) {
  const calls: Call[] = [];
  const fetchImpl = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    const auth = new Headers(init?.headers).get("Authorization");
    calls.push({ url, auth });
    if (url.includes("/user/repos")) {
      if (auth !== `Bearer ${validToken}`) return new Response("{}", { status: 401 });
      return Response.json([repo("public-one"), repo("secret-one", { private: true })]);
    }
    return Response.json([repo("public-one")]);
  }) as typeof fetch;
  return { calls, fetchImpl };
}

test("an accepted token is sent with every request, including the public listing", async () => {
  const github = fakeGitHub("good");
  const repos = await fetchPortfolioRepos("teziovsky", "good", github.fetchImpl);
  assert.deepEqual(
    repos.map((entry) => entry.name),
    ["public-one", "secret-one"],
  );
  assert.ok(github.calls.length > 0);
  for (const call of github.calls) assert.equal(call.auth, "Bearer good", call.url);
});

test("a rejected token falls back to anonymous public requests", async () => {
  const github = fakeGitHub("good");
  const repos = await fetchPortfolioRepos("teziovsky", "bad", github.fetchImpl);
  assert.deepEqual(
    repos.map((entry) => entry.name),
    ["public-one"],
  );
  const publicCall = github.calls.find((call) => call.url.includes("/users/teziovsky/repos"));
  assert.equal(publicCall?.auth, null);
});

test("no token makes only anonymous requests", async () => {
  const github = fakeGitHub("good");
  await fetchPortfolioRepos("teziovsky", "", github.fetchImpl);
  assert.ok(github.calls.every((call) => call.auth === null && !call.url.includes("/user/repos")));
});
