import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="container py-5">
      <h1 className="mb-3 text-3xl font-semibold">Vite + React Preview</h1>
      <p className="text-zinc-600 mb-3">
        Edit any TSX component and press Ctrl+S – preview updates instantly.
      </p>
      <div className="d-flex gap-3">
        <button className="btn btn-primary" onClick={() => setCount((c) => c + 1)}>
          Count {count}
        </button>
        <a className="btn btn-secondary" href="http://localhost:3000" target="_blank">
          Open Next.js app
        </a>
      </div>
    </div>
  );
}
