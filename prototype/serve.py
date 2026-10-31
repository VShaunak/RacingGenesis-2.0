import http.server
import socketserver
import sys

PORT = 8081 if len(sys.argv) < 2 else int(sys.argv[1])

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
try:
    with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"Serving at http://localhost:{PORT} with NO-CACHE headers enabled...")
        httpd.serve_forever()
except Exception as e:
    print(f"Error starting server on {PORT}: {e}")
