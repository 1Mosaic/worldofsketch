const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3030;

const mimeTypes = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.mov': 'video/quicktime',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
};

http.createServer((req, res) => {
  let urlPath = req.url === '/' ? '/index.html' : decodeURIComponent(req.url);
  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext.toLowerCase()] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`SKETCH server running at http://localhost:${PORT}`);
});
