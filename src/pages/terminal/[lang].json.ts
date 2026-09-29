import type { APIRoute, GetStaticPaths } from "astro";

import { type Languages, languages } from "@/i18n/ui";
import { buildPayload } from "@/lib/terminal/payload";

export const getStaticPaths = (() =>
  Object.keys(languages).map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const payload = await buildPayload(params.lang as Languages);
  return new Response(JSON.stringify(payload), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
