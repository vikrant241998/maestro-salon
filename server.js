// Zero-dependency development server: unknown non-asset routes redirect home.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.mp4':'video/mp4','.gif':'image/gif'};
const port = Number(process.env.PORT || 3000);
http.createServer((req,res)=>{
  const u = new URL(req.url,'http://localhost');
  let pathname;
  try { pathname = decodeURIComponent(u.pathname); } catch {res.writeHead(400).end();return;}
  if (pathname==='/' || pathname==='/index.html') pathname='/index.html';
  const filePath=path.resolve(root,'.'+pathname);
  if (!(filePath===root || filePath.startsWith(root+path.sep))) {res.writeHead(403).end();return;}
  fs.stat(filePath,(err,stats)=>{
    if(err || !stats.isFile()) {
      if(path.extname(pathname)) {res.writeHead(404).end('Asset not found');return;}
      res.writeHead(302,{Location:'/'}).end();return;
    }
    const ext=path.extname(filePath).toLowerCase();
    const headers={'Content-Type':types[ext]||'application/octet-stream','Cache-Control':ext==='.html'?'no-cache':'public, max-age=3600'};
    const stream=fs.createReadStream(filePath);
    res.writeHead(200,headers);stream.pipe(res);
    stream.on('error',()=>{if(!res.headersSent)res.writeHead(500);res.end()});
  });
}).listen(port,()=>console.log(`Maestro Salon running at http://localhost:${port}`));
