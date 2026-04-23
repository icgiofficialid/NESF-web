import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";

const GAME_DURATION = 30;
const STAR_LIFETIME = 1500;

type Star = { id: number; x: number; y: number; size: number };

let starId = 0;

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameOver, setGameOver] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [combo, setCombo] = useState(0);
  const [flash, setFlash] = useState<{ x: number; y: number; pts: number } | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  const spawnStar = useCallback(() => {
    if (!areaRef.current) return;
    const { width, height } = areaRef.current.getBoundingClientRect();
    const size = Math.random() * 28 + 28;
    const x = Math.random() * (width - size);
    const y = Math.random() * (height - size);
    const id = ++starId;
    setStars(prev => [...prev, { id, x, y, size }]);
    setTimeout(() => {
      setStars(prev => prev.filter(s => s.id !== id));
    }, STAR_LIFETIME);
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);
    setStars([]);
    setCombo(0);
    setStarted(true);
  };

  useEffect(() => {
    if (!started || gameOver) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setGameOver(true);
          setStarted(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    spawnRef.current = setInterval(spawnStar, 700);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, [started, gameOver, spawnStar]);

  const catchStar = (e: React.MouseEvent | React.TouchEvent, id: number, x: number, y: number) => {
    e.stopPropagation();
    setStars(prev => prev.filter(s => s.id !== id));
    setCombo(c => c + 1);
    const pts = combo >= 4 ? 3 : combo >= 2 ? 2 : 1;
    setScore(s => s + pts);
    setFlash({ x, y, pts });
    setTimeout(() => setFlash(null), 600);
  };

  const timerColor = timeLeft > 15 ? "text-primary" : timeLeft > 7 ? "text-yellow-400" : "text-red-500";
  const timerBg = timeLeft > 15 ? "bg-primary" : timeLeft > 7 ? "bg-yellow-400" : "bg-red-500";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-4 px-4 py-8">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-muted-foreground text-sm">Page not found — catch the stars! ⭐</p>
      </div>

      {/* Score & Timer */}
      <div className="flex items-center gap-6 text-sm">
        <div className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-widest">Score</p>
          <p className="text-2xl font-bold text-primary">{score}</p>
        </div>
        {combo >= 2 && started && (
          <div className="text-center animate-bounce">
            <p className="text-xs text-yellow-400 font-bold">🔥 x{combo} Combo!</p>
          </div>
        )}
        <div className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-widest">Time</p>
          <p className={`text-2xl font-bold ${timerColor} transition-colors`}>{timeLeft}s</p>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full max-w-sm h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className={`h-full ${timerBg} transition-all duration-1000 rounded-full`}
          style={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }}
        />
      </div>

      {/* Game Area */}
      <div
        ref={areaRef}
        className="relative w-full max-w-sm rounded-2xl border border-border overflow-hidden select-none"
        style={{ height: "320px", background: "hsl(var(--card))" }}
      >
        {/* Stars */}
        {stars.map(star => (
          <button
            key={star.id}
            onClick={(e) => catchStar(e, star.id, star.x, star.y)}
            onTouchStart={(e) => catchStar(e, star.id, star.x, star.y)}
            className="absolute flex items-center justify-center rounded-full animate-ping-once hover:scale-125 active:scale-90 transition-transform duration-100 cursor-pointer"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              fontSize: star.size * 0.65,
              background: "transparent",
              border: "none",
              lineHeight: 1,
            }}
          >
            ⭐
          </button>
        ))}

        {/* Combo flash */}
        {flash && (
          <div
            className="absolute pointer-events-none text-yellow-400 font-bold text-lg animate-bounce z-10"
            style={{ left: flash.x, top: flash.y }}
          >
            +{flash.pts}
          </div>
        )}

        {/* Overlay */}
        {(!started) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/85 backdrop-blur-sm gap-4">
            {gameOver ? (
              <>
                <p className="text-4xl">🎉</p>
                <p className="text-xl font-bold text-foreground">Time's Up!</p>
                <p className="text-muted-foreground text-sm">Final Score: <span className="text-primary font-bold">{score}</span></p>
                {score >= 20 ? <p className="text-yellow-400 text-sm font-semibold">🏆 Amazing!</p>
                  : score >= 10 ? <p className="text-primary text-sm font-semibold">⭐ Great job!</p>
                  : <p className="text-muted-foreground text-sm">Keep practicing!</p>}
              </>
            ) : (
              <>
                <p className="text-4xl">⭐</p>
                <p className="text-foreground font-semibold">Catch the stars!</p>
                <p className="text-muted-foreground text-xs text-center px-6">Tap stars before they disappear. Build combos for bonus points!</p>
              </>
            )}
            <button
              onClick={startGame}
              className="bg-primary text-primary-foreground px-8 py-2.5 rounded-full text-sm font-bold hover:brightness-110 active:scale-95 transition-all"
            >
              {gameOver ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}
      </div>

      {/* Hint */}
      {started && (
        <p className="text-xs text-muted-foreground">Tap stars quickly — combos give bonus points! 🔥</p>
      )}

      <a
        onClick={() => navigate("/")}
        className="text-sm text-primary underline cursor-pointer hover:text-primary/80 mt-2"
      >
        Return to Home
      </a>
    </div>
  );
};

export default NotFound;