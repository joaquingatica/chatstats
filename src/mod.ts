import { serve } from "http/server.ts";

for await (const req of serve({ port: 8000 })) {
  req.respond({ body: 'ChatStats' });
}
