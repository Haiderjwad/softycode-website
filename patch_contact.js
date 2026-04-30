const fs = require('fs');
const path = 'src/components/Footer.tsx';

let content = fs.readFileSync(path, 'utf8');
content = content.replace(
  /\{renderIcon\(item.icon, 16, "flex-shrink-0"\)\}\n\s*<span>\{item.label \|\| \(item as any\).value\}<\/span>/,
  `{renderIcon(item.icon, 16, "flex-shrink-0 mt-1")}
                    <div className="flex flex-col">
                      {(item as any).value ? (
                        <>
                          <span className="text-slate-300 group-hover:text-primary-green transition-colors">{item.label}</span>
                          <span className="text-xs opacity-80" dir="ltr" style={{ textAlign: "right" }}>{(item as any).value}</span>
                        </>
                      ) : (
                        <span dir="ltr" style={{ textAlign: "right" }}>{item.label}</span>
                      )}
                    </div>`
);

content = content.replace(
  /className="flex items-center gap-3 text-sm text-slate-400 hover:text-primary-green transition-colors"/g,
  'className="flex items-start gap-3 text-sm text-slate-400 transition-colors group"'
);

fs.writeFileSync(path, content, 'utf8');
