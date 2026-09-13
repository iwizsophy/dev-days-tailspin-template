import { parseArgs } from 'node:util';
import { dev, preview } from 'astro';

// Keep the server in the process owned by App Run or Playwright. Astro's CLI
// otherwise detaches automatically when it detects an agent environment.
const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    port: { type: 'string' },
    host: { type: 'string', default: '127.0.0.1' },
  },
});
const [mode] = positionals;
if (positionals.length !== 1 || !['dev', 'preview'].includes(mode)) {
  throw new Error('Usage: node scripts/serve.mjs <dev|preview> [--port N] [--host ADDRESS]');
}
const port = values.port === undefined ? 4321 : Number(values.port);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('Port must be an integer between 1 and 65535');
}
const start = mode === 'dev' ? dev : preview;
const server = await start({ server: { port, host: values.host } });
let stopping = false;
async function stop() {
  if (stopping) return;
  stopping = true;
  try {
    await server.stop();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
