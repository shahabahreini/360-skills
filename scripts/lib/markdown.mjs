// Parse the deliberately small Markdown/YAML surface used by this catalog.
export function outsideFences(text) {
  let fence;
  return text.split('\n').map(line => {
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (!fence && marker) {
      fence = marker[1];
      return '';
    }
    if (fence) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = undefined;
      return '';
    }
    return line;
  }).join('\n');
}

export function sections(text) {
  const plain = outsideFences(text);
  const headings = [...plain.matchAll(/^## (.+)$/gm)];
  return headings.map((match, index) => ({
    title: match[1].trim(),
    body: plain.slice(match.index + match[0].length, headings[index + 1]?.index ?? plain.length).trim(),
  }));
}

export function frontmatter(text, fail) {
  const match = text.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) { fail('missing or unclosed frontmatter'); return null; }
  const fields = {};
  for (const line of match[1].split('\n')) {
    const item = line.match(/^([a-z][a-z0-9_-]*): (.+)$/);
    if (!item) { fail('frontmatter must contain single-line scalar fields'); continue; }
    const [, key, raw] = item;
    if (!['name', 'description', 'version'].includes(key)) fail(`extra frontmatter field "${key}"`);
    if (Object.hasOwn(fields, key)) fail(`duplicate frontmatter field "${key}"`);
    let value = raw.trim();
    if (/^[|>[{&*!]/.test(value) || /:\s/.test(value) && !/^["']/.test(value)) {
      fail(`frontmatter field "${key}" must be a scalar (quote values containing colon-space)`);
    }
    if (value.startsWith('"')) {
      try { value = JSON.parse(value); } catch { fail(`invalid quoted scalar "${key}"`); }
    } else if (value.startsWith("'")) {
      if (!value.endsWith("'")) fail(`invalid quoted scalar "${key}"`);
      else value = value.slice(1, -1).replace(/''/g, "'");
    }
    fields[key] = value;
  }
  for (const key of ['name', 'description', 'version']) if (!fields[key]) fail(`missing frontmatter field "${key}"`);
  return fields;
}

export function markdownLinks(text) {
  return [...outsideFences(text).matchAll(/!?\[[^\]\n]*\]\(([^)\n]+)\)/g)]
    .map(match => match[1].replace(/^<([^>]+)>.*$/, '$1').replace(/\s+["'][\s\S]*$/, ''));
}
