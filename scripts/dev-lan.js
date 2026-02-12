const os = require("os");
const { spawn } = require("child_process");

function getLanIPv4() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (
        net.family === "IPv4" &&
        !net.internal &&
        (
          net.address.startsWith("192.168.") ||
          net.address.startsWith("10.") ||
          (net.address.startsWith("172.") && (() => {
            const n = parseInt(net.address.split(".")[1], 10);
            return n >= 16 && n <= 31;
          })())
        )
      ) {
        return net.address;
      }
    }
  }
  return "127.0.0.1";
}

const networkHost = getLanIPv4();
const bindHost = "0.0.0.0";
const port = process.env.PORT || "3000";

console.log("▲ Next.js Dev");
console.log(`- Local:   http://localhost:${port}/`);
console.log(`- Network: http://${networkHost}:${port}/`);

const nextBin = require.resolve("next/dist/bin/next");
const child = spawn(
  process.execPath,
  [nextBin, "dev", "--hostname", bindHost, "--port", port],
  { stdio: ["ignore", "pipe", "pipe"], env: process.env }
);

function forward(stream, chunk) {
  const text = chunk.toString();
  const filtered = text
    .split(/\r?\n/)
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      if (trimmed.startsWith("▲ Next.js")) return false;
      if (trimmed.startsWith("- Local:")) return false;
      if (trimmed.startsWith("- Network:")) return false;
      if (trimmed.startsWith("- Environments:")) return false;
      return true;
    })
    .join("\n");
  if (filtered) {
    (stream === "stdout" ? process.stdout : process.stderr).write(filtered + "\n");
  }
}

child.stdout.on("data", (chunk) => forward("stdout", chunk));
child.stderr.on("data", (chunk) => forward("stderr", chunk));
child.on("exit", (code) => process.exit(code ?? 0));
