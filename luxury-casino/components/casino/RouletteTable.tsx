"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/* ---------- European roulette data ---------- */
const ORDER = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const REDS = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
const colorOf = (n: number) => (n === 0 ? "green" : REDS.has(n) ? "red" : "black");
const SLOTS = ORDER.length;
const DT = (Math.PI * 2) / SLOTS;
const COLS = 14, ROWS = 5, PX = 100; // zero + 12 columns + "2 to 1", dozens and outside bets

type Tone = "green" | "red" | "black" | "plain";
type Cell = { id: string; label: string; x: number; y: number; w: number; h: number; pay: number; win: (n: number) => boolean; tone: Tone };

function buildCells(): Cell[] {
  const cells: Cell[] = [{ id: "n0", label: "0", x: 0, y: 0, w: 1, h: 3, pay: 35, win: (n) => n === 0, tone: "green" }];
  for (let n = 1; n <= 36; n++) {
    cells.push({ id: "n" + n, label: String(n), x: 1 + Math.floor((n - 1) / 3), y: 2 - ((n - 1) % 3), w: 1, h: 1, pay: 35, win: (m) => m === n, tone: colorOf(n) as Tone });
  }
  ([[0, 0], [1, 2], [2, 1]] as const).forEach(([y, m]) =>
    cells.push({ id: "col" + y, label: "2 to 1", x: 13, y, w: 1, h: 1, pay: 2, win: (n) => n > 0 && n % 3 === m, tone: "plain" }));
  ([[1, 12], [13, 24], [25, 36]] as const).forEach(([a, b], i) =>
    cells.push({ id: "d" + i, label: `${["1st", "2nd", "3rd"][i]} 12`, x: 1 + i * 4, y: 3, w: 4, h: 1, pay: 2, win: (n) => n >= a && n <= b, tone: "plain" }));
  const out: { id: string; label: string; win: (n: number) => boolean; tone: Tone }[] = [
    { id: "low", label: "1-18", win: (n) => n >= 1 && n <= 18, tone: "plain" },
    { id: "even", label: "EVEN", win: (n) => n > 0 && n % 2 === 0, tone: "plain" },
    { id: "red", label: "", win: (n) => REDS.has(n), tone: "red" },
    { id: "black", label: "", win: (n) => n > 0 && !REDS.has(n), tone: "black" },
    { id: "odd", label: "ODD", win: (n) => n % 2 === 1, tone: "plain" },
    { id: "high", label: "19-36", win: (n) => n >= 19, tone: "plain" },
  ];
  out.forEach((o, k) => cells.push({ ...o, x: 1 + k * 2, y: 4, w: 2, h: 1, pay: 1 }));
  return cells;
}
const CELLS = buildCells();

/* ---------- Canvas textures ---------- */
function drawBoard(cv: HTMLCanvasElement, hover: string | null, result: string | null) {
  const g = cv.getContext("2d")!, W = COLS * PX, H = ROWS * PX, k = cv.width / W;
  g.setTransform(k, 0, 0, k, 0, 0); // draw in 100px-per-cell units, rendered at k x resolution
  g.fillStyle = "#0a5c3a"; g.fillRect(0, 0, W, H);
  g.textAlign = "center"; g.textBaseline = "middle";
  g.strokeStyle = "#d9b44a"; g.lineWidth = 12; g.strokeRect(0, 0, W, H);
  for (const c of CELLS) {
    const x = c.x * PX, y = c.y * PX, w = c.w * PX, h = c.h * PX, cx = x + w / 2, cy = y + h / 2, num = c.id[0] === "n";
    if (num) { g.fillStyle = c.tone === "red" ? "#b3122b" : c.tone === "black" ? "#111" : "#0e7a4a"; g.fillRect(x + 6, y + 6, w - 12, h - 12); }
    if (c.id === result) { g.fillStyle = "rgba(242,217,139,.6)"; g.fillRect(x, y, w, h); }
    else if (c.id === hover) { g.fillStyle = "rgba(255,255,255,.16)"; g.fillRect(x, y, w, h); }
    g.strokeStyle = "#e8d9a8"; g.lineWidth = 4; g.strokeRect(x, y, w, h);
    if (!num && (c.tone === "red" || c.tone === "black")) {
      g.fillStyle = c.tone === "red" ? "#b3122b" : "#111"; g.beginPath();
      g.moveTo(cx, cy - 32); g.lineTo(cx + 52, cy); g.lineTo(cx, cy + 32); g.lineTo(cx - 52, cy); g.closePath(); g.fill();
    } else { g.fillStyle = "#f6eedb"; g.font = num ? "700 46px sans-serif" : "600 28px sans-serif"; g.fillText(c.label, cx, cy); }
  }
}

function wheelTexture() {
  const cv = document.createElement("canvas"); cv.width = cv.height = 2048;
  const g = cv.getContext("2d")!, C = 1024;
  const pt = (t: number, f: number): [number, number] => [C + C * f * Math.sin(t), C + C * f * Math.cos(t)];
  g.fillStyle = "#1a0d06"; g.fillRect(0, 0, 2048, 2048);
  const rg = g.createRadialGradient(C, C, 10, C, C, C * 0.55);
  rg.addColorStop(0, "#f2d98b"); rg.addColorStop(0.6, "#b58a2a"); rg.addColorStop(1, "#5a3d0c");
  g.fillStyle = rg; g.beginPath(); g.arc(C, C, C * 0.54, 0, 7); g.fill();
  const A = 0.54, B = 0.985;
  ORDER.forEach((n, i) => {
    const t0 = i * DT;
    g.beginPath(); g.moveTo(...pt(t0, A));
    for (let k = 0; k <= 6; k++) g.lineTo(...pt(t0 + (DT * k) / 6, B)); // radial edge + outer arc
    // then back along the inner arc
    for (let k = 6; k >= 0; k--) g.lineTo(...pt(t0 + (DT * k) / 6, A));
    g.closePath();
    g.fillStyle = n === 0 ? "#0e7a4a" : REDS.has(n) ? "#b3122b" : "#111"; g.fill();
    const tc = t0 + DT / 2, q = pt(tc, 0.9);
    g.save(); g.translate(q[0], q[1]); g.rotate(-tc);
    g.fillStyle = "#f6eedb"; g.font = "700 96px sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(String(n), 0, 0);
    g.restore();
  });
  g.strokeStyle = "#d9b44a"; g.lineWidth = 16;
  [A, B].forEach((f) => { g.beginPath(); g.arc(C, C, C * f, 0, 7); g.stroke(); });
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 16; return t;
}

type Api = { spin: (cb: (idx: number) => void) => void; drawChips: () => void; setResult: (id: string | null) => void };
const CHIPS = [5, 25, 100, 500];
const rnd = () => crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
const sum = (o: Record<string, number>) => Object.values(o).reduce((a, b) => a + b, 0);

export default function RouletteTable({ spinKey = 0 }: { spinKey?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<Api | null>(null);
  const betsRef = useRef<Record<string, number>>({});
  const lastRef = useRef<Record<string, number>>({});
  const balRef = useRef(1000), chipRef = useRef(25), busy = useRef(false);
  const [bets, setBets] = useState<Record<string, number>>({});
  const [bal, setBal] = useState(1000);
  const [chip, setChip] = useState(25);
  const [msg, setMsg] = useState("Pick a chip, click the board to bet, then spin.");
  const [history, setHistory] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
const [dialogType, setDialogType] = useState<
  "message" | "clear" | "rebet"
>("message");

const openDialog = (
  message: string,
  type: "message" | "clear" | "rebet" = "message"
) => {
  setMsg(message);
  setDialogType(type);
  setDialogOpen(true);
};

  const sync = () => { setBets({ ...betsRef.current }); setBal(balRef.current); };
  const pick = (v: number) => { chipRef.current = v; setChip(v); };
  const place = (id: string) => {
    if (busy.current) return;
    if (sum(betsRef.current) + chipRef.current > balRef.current) { setMsg("Not enough chips"); return; }
    betsRef.current[id] = (betsRef.current[id] || 0) + chipRef.current;
    setMsg(""); apiRef.current?.setResult(null); sync();
  };
  
const clear = () => {
  if (busy.current) return;

  openDialog(
    "Are you sure you want to clear all your current bets?",
    "clear"
  );
};

const rebet = () => {
  if (busy.current) return;

//   if (!sum(lastRef.current)) {
//     openDialog("No previous bets available to repeat.", "message");
//     return;
//   }

  if (sum(lastRef.current) > balRef.current) {
    openDialog("Not enough chips to repeat your previous bets.", "message");
    return;
  }

  openDialog(
    "Do you want to bet again?",
    "rebet"
  );
};

  const confirmClear = () => {
  if (busy.current) return;

  betsRef.current = {};
  sync();
  setDialogOpen(false);
};

const confirmRebet = () => {
  if (
    busy.current ||
    !sum(lastRef.current) ||
    sum(lastRef.current) > balRef.current
  ) {
    setDialogOpen(false);
    return;
  }

  betsRef.current = { ...lastRef.current };
  apiRef.current?.setResult(null);
  sync();
  setDialogOpen(false);
};
  const spin = () => {
    if (busy.current) return;
    const total = sum(betsRef.current);
    if (!total) { setMsg("Place a bet on the board first"); return; }
    lastRef.current = { ...betsRef.current };
    balRef.current -= total; busy.current = true; setMsg("No more bets..."); sync();
    apiRef.current?.spin((idx) => {
      const n = ORDER[idx]; let win = 0;
      for (const c of CELLS) { const s = betsRef.current[c.id]; if (s && c.win(n)) win += s * (c.pay + 1); }
      balRef.current += win; betsRef.current = {}; busy.current = false;
      setHistory((h) => [n, ...h].slice(0, 12));
      setMsg(`${n} ${colorOf(n)}. ${win ? `You won ${win.toLocaleString()} chips` : "No win this time"}`);
      openDialog(
  `${n} ${colorOf(n)}. ${
    win
      ? `You won ${win.toLocaleString()} chips`
      : "No win this time"
  }`,
  "message"
);
      apiRef.current?.setResult("n" + n); sync();
    });
  };

  // opening spin: runs once when the page loads (no bet, no cost), then the player takes over
  const demoSpin = () => {
    if (busy.current || !apiRef.current) return;
    busy.current = true; setMsg("Opening spin...");
    apiRef.current.spin((idx) => {
      const n = ORDER[idx]; busy.current = false;
      setHistory([n]); setMsg(`${n} ${colorOf(n)}. Place your bets, then press SPIN.`);
      apiRef.current?.setResult("n" + n);
    });
  };
  useEffect(() => { const id = setTimeout(demoSpin, 1400); return () => clearTimeout(id); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // parent "SPIN" button -> spinKey increments
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (spinKey > 0) spin(); }, [spinKey]);
  useEffect(() => { apiRef.current?.drawChips(); }, [bets]);

  useEffect(() => {
    const mount = mountRef.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement); renderer.domElement.style.display = "block";
    const scene = new THREE.Scene(); scene.background = new THREE.Color(0x080a09);
    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    const cam = new THREE.PerspectiveCamera(24, 1, 0.1, 120);
    cam.up.set(0, 0, -1); // looking straight down: -z is the top of the screen
    const sun = new THREE.DirectionalLight(0xfff1d0, 2.4); sun.position.set(4, 13, 7); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 35 });
    sun.shadow.camera.updateProjectionMatrix(); sun.shadow.bias = -0.0004; scene.add(sun);

    const gold = new THREE.MeshStandardMaterial({ color: 0xd9b44a, metalness: 1, roughness: 0.28 });
    const wood = new THREE.MeshStandardMaterial({ color: 0x3a1a0c, roughness: 0.38, metalness: 0.05, side: THREE.DoubleSide });
    const lacq = new THREE.MeshStandardMaterial({ color: 0x5b2a12, roughness: 0.22, metalness: 0.1, side: THREE.DoubleSide });
    const v2 = (p: number[][]) => p.map(([x, y]) => new THREE.Vector2(x, y));
    const add = (m: THREE.Object3D, parent: THREE.Object3D = scene) => { parent.add(m); return m; };

    /* wheel */
    const wheel = new THREE.Group(); add(wheel);
    const bowl = new THREE.Mesh(new THREE.LatheGeometry(v2([[0.01, 0], [2.85, 0], [2.88, 0.3], [2.74, 0.44], [2.5, 0.46], [2.38, 0.4]]), 64), wood);
    bowl.castShadow = bowl.receiveShadow = true; add(bowl, wheel);
    add(new THREE.Mesh(new THREE.CylinderGeometry(2.38, 1.98, 0.18, 64, 1, true), lacq), wheel).position.y = 0.31;
    const rimT = add(new THREE.Mesh(new THREE.TorusGeometry(2.46, 0.045, 16, 96), gold), wheel); rimT.rotation.x = Math.PI / 2; rimT.position.y = 0.46;
    const edge = add(new THREE.Mesh(new THREE.TorusGeometry(1.99, 0.03, 12, 96), gold), wheel); edge.rotation.x = Math.PI / 2; edge.position.y = 0.22;
    for (let i = 0; i < 8; i++) { // ball deflectors
      const d = add(new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.1), gold), wheel), a = (i / 8) * Math.PI * 2;
      d.position.set(Math.sin(a) * 2.33, 0.4, Math.cos(a) * 2.33); d.rotation.y = Math.PI / 4;
    }
    const spinG = new THREE.Group(); wheel.add(spinG);
    const disc = add(new THREE.Mesh(new THREE.CylinderGeometry(1.98, 1.98, 0.22, 64), wood), spinG); disc.position.y = 0.11;
    const face = add(new THREE.Mesh(new THREE.CircleGeometry(1.97, 96), new THREE.MeshStandardMaterial({ map: wheelTexture(), roughness: 0.9, metalness: 0, envMapIntensity: 0.25 })), spinG);
    face.rotation.x = -Math.PI / 2; face.position.y = 0.222; face.receiveShadow = true;
    const fretG = new THREE.BoxGeometry(0.022, 0.07, 0.9);
    for (let i = 0; i < SLOTS; i++) {
      const t = i * DT, f = add(new THREE.Mesh(fretG, gold), spinG);
      f.position.set(Math.sin(t) * 1.5, 0.255, Math.cos(t) * 1.5); f.rotation.y = t; f.castShadow = true;
    }
    const turret = add(new THREE.Mesh(new THREE.LatheGeometry(v2([[0.001, 0.22], [0.62, 0.22], [0.56, 0.32], [0.36, 0.56], [0.18, 0.84], [0.14, 1.0]]), 48), gold), spinG);
    turret.castShadow = true;
    add(new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 24), gold), spinG).position.y = 1.08;
    for (let k = 0; k < 2; k++) {
      const arm = add(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.6, 12), gold), spinG);
      arm.rotation.z = Math.PI / 2; arm.rotation.y = (k * Math.PI) / 2; arm.position.y = 0.8; arm.castShadow = true;
    }
    for (let k = 0; k < 4; k++) {
      const a = (k * Math.PI) / 2, e = add(new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), gold), spinG);
      e.position.set(Math.sin(a) * 0.8, 0.8, Math.cos(a) * 0.8);
    }
    const marker = add(new THREE.Mesh(new THREE.OctahedronGeometry(0.09), new THREE.MeshStandardMaterial({ color: 0xf2d98b, emissive: 0xf2d98b, emissiveIntensity: 0.9 })), spinG);
    marker.visible = false;
    const ball = add(new THREE.Mesh(new THREE.SphereGeometry(0.1, 32, 32), new THREE.MeshStandardMaterial({ color: 0xfffaf0, emissive: 0x555044, roughness: 0.15, metalness: 0.1 })), wheel);
    ball.castShadow = true;

    /* betting board */
    const bcv = document.createElement("canvas"); bcv.width = COLS * PX * 2; bcv.height = ROWS * PX * 2;
    let hoverId: string | null = null, resultId: string | null = null;
    drawBoard(bcv, null, null);
    const btex = new THREE.CanvasTexture(bcv); btex.colorSpace = THREE.SRGBColorSpace; btex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const CELL = 0.7, BW = COLS * CELL, BH = ROWS * CELL;
    const boardG = new THREE.Group(); scene.add(boardG);
    const board = new THREE.Mesh(new THREE.PlaneGeometry(BW, BH), new THREE.MeshBasicMaterial({ map: btex, toneMapped: false }));
    board.rotation.x = -Math.PI / 2; board.position.y = 0.012; board.receiveShadow = true; boardG.add(board);
    const repaint = () => { drawBoard(bcv, hoverId, resultId); btex.needsUpdate = true; };

    /* chips on the board */
    const chipsG = new THREE.Group(); boardG.add(chipsG);
    const chipGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.07, 32), topGeo = new THREE.CircleGeometry(0.2, 32);
    const tier = (s: number) => (s >= 500 ? 0x6b2fb0 : s >= 100 ? 0x1b1b1b : s >= 25 ? 0x0e7a4a : 0x2a56c4);
    const clearChips = () => chipsG.children.slice().forEach((o) => {
      o.traverse((m) => { const mm = (m as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined; mm?.map?.dispose(); mm?.dispose(); });
      chipsG.remove(o);
    });
    const drawChips = () => {
      clearChips();
      for (const c of CELLS) {
        const s = betsRef.current[c.id]; if (!s) continue;
        const g = new THREE.Group();
        g.position.set(((c.x + c.w / 2) / COLS) * BW - BW / 2, 0.06, -BH / 2 + ((c.y + c.h / 2) / ROWS) * BH);
        const body = new THREE.Mesh(
            chipGeo,
            new THREE.MeshStandardMaterial({
                color: "#B8860B",
                roughness: 0.25,
                metalness: 0.75,
            })
            );
            body.castShadow = true;
            g.add(body); 
                const cv = document.createElement("canvas");
            cv.width = cv.height = 256;

            const x = cv.getContext("2d")!;
            x.scale(2, 2);

            // Rich gold chip face
            const gradient = x.createRadialGradient(64, 55, 5, 64, 64, 65);
            gradient.addColorStop(0, "#FFE9A3");
            gradient.addColorStop(0.65, "#D4A72C");
            gradient.addColorStop(1, "#8A5D08");

            x.fillStyle = gradient;
            x.beginPath();
            x.arc(64, 64, 62, 0, Math.PI * 2);
            x.fill();

            // Dark outline
            x.strokeStyle = "#704A00";
            x.lineWidth = 2;
            x.stroke();

            // Contrasting dashed border
            x.strokeStyle = "#FFF2C2";
            x.lineWidth = 4;
            x.setLineDash([5, 3]);
            x.beginPath();
            x.arc(64, 64, 53, 0, Math.PI * 2);
            x.stroke();

            // Bold black number
            x.setLineDash([]);
            x.font = "900 46px Arial, sans-serif";
            x.textAlign = "center";
            x.textBaseline = "middle";
            x.fillStyle = "#211600";
            x.fillText(String(s), 64, 64);
        const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const top = new THREE.Mesh(topGeo, new THREE.MeshBasicMaterial({ map: t, transparent: true })); top.rotation.x = -Math.PI / 2; top.position.y = 0.037; g.add(top);
        chipsG.add(g);
      }
    };

    /* animation + ball physics state */
    let spinRot = 0, spinning = false, restSlot = DT / 2, doneCb: ((idx: number) => void) | null = null;
    let zoom = 1, zoomT = 1, lift = 0, liftT = 0, baseEl = 1;
    const camTarget = new THREE.Vector3(), focus = new THREE.Vector3();
    const G = 12, WALL = 2.3, POCKET_R = 1.42, FRET_CLEAR = 0.39, BALL_Y = 0.322, H = 1 / 240; // ball rests in the plain inner part of the pocket, clear of the printed number
    const ground = (r: number) => (r > 1.98 ? BALL_Y + (r - 1.98) * 0.45 : BALL_Y);
    // phi: ball angle (world), bw: ball angular speed, r/rv: radius + radial speed, y/vy: height + vertical speed, w: wheel speed
    const B = { on: "idle" as "idle" | "track" | "done", phi: 0, bw: 0, r: WALL, rv: 0, y: 0.466, vy: 0, w: 0.25, time: 0, doneT: 0, psi: 0, idx: 0 };
    let acc = 0;
    apiRef.current = {
      spin: (cb) => {
        doneCb = cb; spinning = true; marker.visible = false; zoomT = 0.88; liftT = 0; acc = 0;
        Object.assign(B, { on: "track", phi: rnd() * Math.PI * 2, bw: -(8.5 + rnd() * 2.5), r: WALL, rv: 0, y: ground(WALL), vy: 0, w: 1.6 + rnd() * 0.6, time: 0, doneT: 0 });
      },
      drawChips,
      setResult: (id) => { resultId = id; if (!id) marker.visible = false; repaint(); },
    };
    drawChips();
    /* one physics step: wheel spin-down, ball on the banked track, deflector kicks, bouncing, fret collisions, settling */
    const step = (h: number) => {
      B.time += h;
      const spin0 = spinRot, phi0 = B.phi;
      B.w += (0.25 - B.w) * 0.2 * h; spinRot += B.w * h;
      // vertical motion: gravity + bounce on the track / wheel floor
      B.vy -= G * h; B.y += B.vy * h;
      const gr = ground(B.r);
      if (B.y < gr) { B.y = gr; B.vy = B.vy < -0.35 ? -B.vy * 0.45 : 0; }
      const rolling = B.y <= gr + 0.003 && Math.abs(B.vy) < 0.05;

      if (B.on === "done") {
        // ease into the centre of the pocket and ride with the wheel
        const c = (Math.floor(B.psi / DT) + 0.5) * DT;
        B.psi += (c - B.psi) * Math.min(1, 8 * h); B.phi = spinRot + B.psi;
        B.r += (POCKET_R - B.r) * Math.min(1, 8 * h); B.doneT += h; B.idx = ((Math.floor(B.psi / DT) % SLOTS) + SLOTS) % SLOTS;
        return;
      }
      if (B.r > 1.98) {
        // banked track: centrifugal force pins the ball to the wall until it slows, then it spirals down
        B.rv += (B.bw * B.bw * B.r - G * 0.4 - (rolling ? 3 : 0.5) * B.rv) * h;
        B.bw -= Math.sign(B.bw) * (0.2 + 0.1 * Math.abs(B.bw)) * h;
        B.phi += B.bw * h; B.r += B.rv * h;
        if (B.r > WALL) { B.r = WALL; if (B.rv > 0) B.rv = 0; }
        if (B.r > 2.15 && Math.floor(phi0 / (Math.PI / 4)) !== Math.floor(B.phi / (Math.PI / 4))) { // hit a deflector: random hop
          if (rolling) { B.vy = 1.0 + rnd() * 1.3; B.rv -= 0.2 + rnd() * 0.5; }
          B.bw *= 0.988 + rnd() * 0.008;
        }
        return;
      }
      // on the wheel: pocket floor holds the radius, friction drags the ball toward the wheel's speed
      B.rv += (-30 * (B.r - POCKET_R) - 5 * B.rv) * h; B.r += B.rv * h;
      let rel = B.bw - B.w;
      rel *= Math.exp(-(rolling ? (B.time > 16 ? 3 : 1.1) : 0.15) * h);
      B.bw = rel + B.w; B.phi += B.bw * h;
      const psi0 = phi0 - spin0, psi1 = B.phi - spinRot, k0 = Math.floor(psi0 / DT), k1 = Math.floor(psi1 / DT);
      if (k0 !== k1 && B.r < 1.94 && B.y < FRET_CLEAR) { // hit a fret: bounce back and pop up a little
        const speed = Math.abs(rel) * B.r, bound = Math.max(k0, k1) * DT;
        B.phi = spinRot + bound + (k1 > k0 ? -1e-4 : 1e-4);
        rel = -rel * 0.45; B.bw = rel + B.w; B.vy += Math.min(speed * 0.25 * (0.5 + rnd()), 2.2);
      }
      if (B.r < 1.9 && rolling && ((Math.abs(rel) < 0.05 && Math.abs(B.rv) < 0.05) || B.time > 22)) {
        B.on = "done"; B.psi = B.phi - spinRot; B.doneT = 0;
      }
    };
    const ballAt = (phi: number, r: number, y: number) => ball.position.set(Math.sin(phi) * r, y, Math.cos(phi) * r);

    /* pointer: hover + click cells, camera parallax */
    const rc = new THREE.Raycaster(), ndc = new THREE.Vector2(); let tmx = 0, tmy = 0;
    const cellAt = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      tmx = ((e.clientX - r.left) / r.width) * 2 - 1; tmy = -(((e.clientY - r.top) / r.height) * 2 - 1);
      ndc.set(tmx, tmy); rc.setFromCamera(ndc, cam);
      const h = rc.intersectObject(board)[0]; if (!h || !h.uv) return null;
      const gx = h.uv.x * COLS, gy = (1 - h.uv.y) * ROWS;
      return CELLS.find((c) => gx >= c.x && gx < c.x + c.w && gy >= c.y && gy < c.y + c.h)?.id ?? null;
    };
    const onMove = (e: PointerEvent) => {
      const id = cellAt(e); renderer.domElement.style.cursor = id ? "pointer" : "default";
      if (id !== hoverId) { hoverId = id; repaint(); }
    };
    const onDown = (e: PointerEvent) => { const id = cellAt(e); if (id) place(id); };
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerdown", onDown);

    /* responsive layout: wheel + board in a row on wide screens, stacked on tall ones */
    let dist = 16;
    const dir = new THREE.Vector3(0, 0.8, 0.6);
    const center = new THREE.Vector3(0, 0, 0);
    const R = 2.95, GAP = 1.3;
    let pts: THREE.Vector3[] = [];
    const layout = (row: boolean) => {
      const hw = BW / 2, hh = BH / 2;
      if (row) {
        const tot = 2 * R + GAP + BW;
        wheel.position.set(-tot / 2 + R, 0, 0); boardG.position.set(tot / 2 - hw, 0, 0);
      } else {
        const tot = 2 * R + GAP + BH;
        wheel.position.set(0, 0, -tot / 2 + R); boardG.position.set(0, 0, tot / 2 - hh);
      }
      const wc = wheel.position, bc = boardG.position, d = R * 0.71;
      pts = [[R, 0], [-R, 0], [0, R], [0, -R], [d, d], [-d, d], [d, -d], [-d, -d]].map(([x, z]) => new THREE.Vector3(wc.x + x, 0, wc.z + z));
      pts.push(new THREE.Vector3(wc.x, 1.3, wc.z));
      [[hw, hh], [-hw, hh], [hw, -hh], [-hw, -hh]].forEach(([x, z]) => pts.push(new THREE.Vector3(bc.x + x, 0.3, bc.z + z)));
    };
    const fit = () => {
      const w = mount.clientWidth, h = mount.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix();
      layout(cam.aspect >= 1.3);
      baseEl = Math.PI / 2; // 90 degrees: wheel and board are seen flat, undistorted
      dir.set(0, 1, 0);
      const fits = (dd: number) => {
        cam.position.copy(dir).multiplyScalar(dd).add(center); cam.lookAt(center); cam.updateMatrixWorld();
        return pts.every((p) => { const q = p.clone().project(cam); return Math.abs(q.x) <= 0.95 && Math.abs(q.y) <= 0.93 && q.z < 1; });
      };
      const solve = () => { let lo = 5, hi = 120; for (let i = 0; i < 24; i++) { const m = (lo + hi) / 2; if (fits(m)) hi = m; else lo = m; } dist = hi; fits(dist); };
      const th = Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2);
      center.set(0, 0, 0);
      for (let k = 0; k < 5; k++) { // nudge the look-at point until the pair sits dead centre
        solve();
        let x0 = 1, x1 = -1, y0 = 1, y1 = -1;
        pts.forEach((p) => { const q = p.clone().project(cam); x0 = Math.min(x0, q.x); x1 = Math.max(x1, q.x); y0 = Math.min(y0, q.y); y1 = Math.max(y1, q.y); });
        center.x += ((x0 + x1) / 2) * dist * th * cam.aspect * 0.9;
        center.z -= ((y0 + y1) / 2) * dist * th / Math.max(Math.sin(baseEl), 0.3) * 0.9;
      }
      solve();
    };
    const ro = new ResizeObserver(fit); ro.observe(mount); fit();

    const clock = new THREE.Clock(); let prev = 0, raf = 0;
    const tick = () => {
      const t = clock.getElapsedTime(), dt = Math.min(t - prev, 0.05); prev = t;
      if (spinning) {
        acc += dt;
        while (acc >= H) {
          step(H); acc -= H;
          if (B.on === "done" && B.doneT > 0.5) {
            spinning = false; B.on = "idle"; zoomT = 1; liftT = 0;
            restSlot = (((B.psi % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)); // pocket centre in the wheel frame
            marker.position.set(Math.sin(restSlot) * 1.72, 0.55, Math.cos(restSlot) * 1.72); marker.visible = true;
            doneCb?.(B.idx); break;
          }
        }
        if (spinning) ballAt(B.phi, B.r, B.y);
      } else { B.w += (0.25 - B.w) * 0.2 * dt; spinRot += B.w * dt; ballAt(spinRot + restSlot, POCKET_R, BALL_Y); }
      spinG.rotation.y = spinRot; marker.rotation.y = t * 2;
      // ease in toward the wheel while it spins, then back out to the full layout
      zoom += (zoomT - zoom) * 0.045; lift += (liftT - lift) * 0.045;
      focus.set(wheel.position.x, 0.35, wheel.position.z);
      camTarget.lerp(spinning ? focus : center, 0.045);
      cam.position.copy(dir).multiplyScalar(dist * zoom).add(camTarget);
      cam.lookAt(camTarget);
      renderer.render(scene, cam);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); clearChips();
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      scene.traverse((o) => {
        const m = o as THREE.Mesh; m.geometry?.dispose();
        const mat = m.material as THREE.MeshStandardMaterial | undefined; mat?.map?.dispose(); mat?.dispose?.();
      });
      pm.dispose(); renderer.dispose(); mount.removeChild(renderer.domElement); apiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = sum(bets);
  return (
    <div className="w-full">
      <div ref={mountRef} className="h-[clamp(430px,118vw,780px)] w-full overflow-hidden rounded-2xl border border-amber-500/20 lg:h-[clamp(460px,62vh,820px)]" />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-500/20 bg-black/40 px-5 py-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-stone-500">BALANCE</p>
          <p className="text-2xl font-semibold text-[#E2C16B]">{bal.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2" role="group" aria-label="Chip value">
          {CHIPS.map((v) => (
            <button key={v} onClick={() => pick(v)} aria-pressed={chip === v}
              className={`h-11 w-11 rounded-full border-2 border-dashed text-sm font-semibold transition ${chip === v ? "border-[#F2D98B] bg-[#B58A2A] text-black" : "border-stone-500 bg-stone-900 text-stone-300 hover:border-amber-300"}`}>
              {v}
            </button>
          ))}
        </div>
        <div className="flex gap-2 text-sm">
          <button onClick={clear} className="rounded-lg border border-stone-600 px-4 py-2 text-stone-300 hover:border-amber-300">Clear</button>
          <button onClick={rebet} className="rounded-lg border border-stone-600 px-4 py-2 text-stone-300 hover:border-amber-300">Rebet</button>
        </div>
        <p className="text-sm text-stone-400">On the table: <span className="text-amber-200">{total.toLocaleString()}</span></p>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-stone-300">{msg}</p>
        <div className="flex gap-1.5" aria-label="Recent results">
          {history.map((n, i) => (
            <span key={i} className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${colorOf(n) === "red" ? "bg-[#b3122b]" : colorOf(n) === "green" ? "bg-[#0e7a4a]" : "bg-[#111] ring-1 ring-stone-700"}`}>{n}</span>
          ))}
        </div>
      </div>
      
{dialogOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    role="presentation"
  >
    <div
      className="w-full max-w-md rounded-2xl border border-amber-400/40 bg-[#11120f] p-6 shadow-2xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <h2
        id="dialog-title"
        className="text-xl font-semibold text-[#F2D98B]"
      >
        {dialogType === "clear"
          ? "Clear Bets"
          : dialogType === "rebet"
            ? "Repeat Previous Bets"
            : "Roulette Message"}
      </h2>

      <p className="mt-4 text-sm leading-6 text-stone-300">
        {msg}
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setDialogOpen(false)}
          className="rounded-lg border border-stone-600 px-4 py-2 text-stone-300 hover:bg-stone-800"
        >
          Cancel
        </button>

        {dialogType === "clear" && (
          <button
            onClick={confirmClear}
            className="rounded-lg bg-red-700 px-4 py-2 font-medium text-white hover:bg-red-600"
          >
            Clear
          </button>
        )}

        {dialogType === "rebet" && (
          <button
            onClick={confirmRebet}
            className="rounded-lg bg-amber-400 px-4 py-2 font-medium text-black hover:bg-amber-300"
          >
            Rebet
          </button>
        )}

        {dialogType === "message" && (
          <button
            onClick={() => setDialogOpen(false)}
            className="rounded-lg bg-amber-400 px-4 py-2 font-medium text-black hover:bg-amber-300"
          >
            OK
          </button>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
}