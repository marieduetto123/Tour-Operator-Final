#!/usr/bin/env python3
"""Local static server with Vercel-style rewrites (port 3000)."""
import http.server
import socketserver
from functools import partial

PORT = 3000
REWRITES = {
    "/": "/travelcore-rm-hub.html",
    "/travelcore-rm-hub": "/travelcore-rm-hub.html",
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path in REWRITES:
            query = self.path.split("?", 1)[1] if "?" in self.path else ""
            self.path = REWRITES[path] + (f"?{query}" if query else "")
        return super().do_GET()


if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), partial(Handler, directory=".")) as httpd:
        print(f"Serving at http://localhost:{PORT}/")
        httpd.serve_forever()
