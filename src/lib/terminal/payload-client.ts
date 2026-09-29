import type { TerminalLang, TerminalPayload } from "@/lib/terminal/types";

const pending = new Map<TerminalLang, Promise<TerminalPayload>>();

/** Fetch `/terminal/<lang>.json` once per language; a failed fetch is forgotten so the next call retries. */
export function loadPayload(lang: TerminalLang): Promise<TerminalPayload> {
  const cached = pending.get(lang);
  if (cached) return cached;

  const request = fetch(`/terminal/${lang}.json`).then((response) => {
    if (!response.ok) throw new Error(`terminal payload ${response.status}`);
    return response.json() as Promise<TerminalPayload>;
  });
  pending.set(lang, request);
  request.catch(() => pending.delete(lang));
  return request;
}
