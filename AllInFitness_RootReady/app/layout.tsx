export const metadata = {
  title: "All In Fitness",
  description: "AI-integrated fitness planning, progress, and nutrition.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#6d28d9" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          :root {
            --purple: #6d28d9;
            --blue: #4067e0;
            --grey: #374151;
            --light: #f8fafc;
            --muted: #64748b;
            --card: #ffffff;
            --border: #e5e7eb;
          }
          html, body { margin:0; padding:0; background:#ffffff; color:var(--grey); font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
          .container { max-width: 1120px; margin: 0 auto; padding: 16px; }
          .header { position: sticky; top: 0; background: rgba(255,255,255,0.9); backdrop-filter: blur(6px); border-bottom: 1px solid var(--border); z-index: 10; }
          .brand { display:flex; align-items:center; gap:12px; padding:12px 16px; }
          .brand img { width:40px; height:40px; border-radius:8px; }
          .title { font-weight: 800; font-size: 20px; color: var(--purple); }
          .subtitle { font-size: 12px; color: var(--muted); margin-top: -4px; }
          .tabs { display:grid; grid-auto-flow: column; gap: 8px; padding: 8px 0 12px; }
          .tab { border:1px solid var(--border); background:var(--light); padding:8px 10px; border-radius:8px; cursor:pointer; font-size:14px; }
          .tab.active { background:linear-gradient(90deg, #818cf8, #a78bfa); color:white; border-color: transparent; }
          .grid { display:grid; gap:16px; }
          .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          @media (max-width: 900px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } .tabs { grid-auto-flow: row; } }
          .card { background:var(--card); border:1px solid var(--border); border-radius: 16px; padding: 16px; }
          .h1 { font-size: 22px; font-weight: 700; color: var(--purple); }
          .h2 { font-size: 18px; font-weight: 700; color: var(--blue); }
          .muted { color: var(--muted); font-size: 12px; }
          .btn { border:1px solid var(--border); background:white; padding:8px 12px; border-radius: 10px; cursor:pointer; }
          .btn.primary { background: linear-gradient(90deg, #818cf8, #a78bfa); color:white; border-color: transparent; }
          .row { display:flex; gap:8px; align-items:center; }
          .col { display:flex; flex-direction:column; gap:6px; }
          input, select, textarea { border:1px solid var(--border); border-radius:10px; padding:8px 10px; outline:none; }
          input:focus, select:focus, textarea:focus { border-color:#a78bfa; box-shadow: 0 0 0 3px rgba(167,139,250,.25); }
          ul.clean { list-style:none; padding:0; margin:0; }
          .pill { background:#eef2ff; color:#3730a3; padding:2px 8px; border-radius: 999px; font-size: 12px; }
          .table { width:100%; border-collapse: collapse; font-size: 14px; }
          .table th, .table td { border-bottom:1px solid var(--border); padding:8px; text-align:left; }
          .link { color: var(--blue); cursor:pointer; text-decoration: underline; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
