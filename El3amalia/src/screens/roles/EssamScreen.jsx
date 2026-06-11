import { useEffect, useState } from "react";

function EssamScreen({
  currentPlayer,

  addNightAction,
}) {
  /*
    ========================
    الشفرة الثابتة
    ========================
  */

  const [puzzle] = useState(() => {
    const puzzleTypes = ["add", "subtract", "multiply", "sqrt"];

    const type = puzzleTypes[Math.floor(Math.random() * puzzleTypes.length)];

    if (type === "add") {
      const a = Math.floor(Math.random() * 900) + 100;

      const b = Math.floor(Math.random() * 900) + 100;

      const c = Math.floor(Math.random() * 900) + 100;

      return {
        question: `${a} + ${b} + ${c}`,
        correctAnswer: a + b + c,
      };
    }

    if (type === "subtract") {
      const a = Math.floor(Math.random() * 900) + 500;

      const b = Math.floor(Math.random() * 200) + 50;

      const c = Math.floor(Math.random() * 200) + 50;

      return {
        question: `${a} - ${b} - ${c}`,
        correctAnswer: a - b - c,
      };
    }

    if (type === "multiply") {
      const a = Math.floor(Math.random() * 8) + 5;

      const b = Math.floor(Math.random() * 8) + 5;

      return {
        question: `${a} × ${b}`,
        correctAnswer: a * b,
      };
    }

    const roots = [25, 36, 49, 64, 81, 100, 121, 144, 169, 225];

    const value = roots[Math.floor(Math.random() * roots.length)];

    return {
      question: `√${value}`,
      correctAnswer: Math.sqrt(value),
    };
  });

  const [answer, setAnswer] = useState("");

  const [timeLeft, setTimeLeft] = useState(45);

  const [gameOver, setGameOver] = useState(false);

  const [message, setMessage] = useState("");

  /*
    ========================
    التايمر
    ========================
  */

  useEffect(() => {
    if (gameOver) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          /*
                ========================
                عبقرينو خسر
                ========================
              */

          addNightAction({
            role: "عصام عبقرينو",

            actor: currentPlayer.playerName,

            action: "failedPuzzle",
          });

          setGameOver(true);

          setMessage("⛓️ عبقرينو وقع 😭");

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, addNightAction, currentPlayer]);

  /*
    ========================
    فك الشفرة
    ========================
  */

  const submitAnswer = () => {
    /*
        ========================
        إجابة صح
        ========================
      */

    if (Number(answer) === puzzle.correctAnswer) {
      addNightAction({
        role: "عصام عبقرينو",

        actor: currentPlayer.playerName,

        action: "solvePuzzle",
      });

      setGameOver(true);

      setMessage("🧠 عبقرينو فك الشفرة 😈");
    } else {
      /*
          ========================
          إجابة غلط
          ========================
        */

      addNightAction({
        role: "عصام عبقرينو",

        actor: currentPlayer.playerName,

        action: "failedPuzzle",
      });

      setGameOver(true);

      setMessage("💀 إجابة غلط… عبقرينو خرج 😭");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        background: "#050505",

        color: "white",

        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        fontFamily: "sans-serif",

        textAlign: "center",

        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "55px",

          textShadow: "0 0 20px crimson",
        }}
      >
        عصام عبقرينو 🧠
      </h1>

      <div
        style={{
          marginTop: "30px",

          fontSize: "90px",

          color: timeLeft <= 15 ? "crimson" : "white",
        }}
      >
        {timeLeft}
      </div>

      {!gameOver ? (
        <>
          <p
            style={{
              marginTop: "20px",

              fontSize: "35px",
            }}
          >
            احسب بسرعة:
          </p>

          <h2
            style={{
              marginTop: "20px",

              fontSize: "65px",
            }}
          >
            {puzzle.question}
          </h2>

          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{
              marginTop: "40px",

              padding: "18px",

              width: "220px",

              borderRadius: "18px",

              border: "1px solid crimson",

              background: "#111",

              color: "white",

              fontSize: "30px",

              textAlign: "center",

              outline: "none",
            }}
          />

          <button
            onClick={submitAnswer}
            style={{
              marginTop: "35px",

              background: "crimson",

              border: "none",

              color: "white",

              padding: "18px 40px",

              borderRadius: "20px",

              fontSize: "24px",

              cursor: "pointer",

              boxShadow: "0 0 20px crimson",
            }}
          >
            فك الشفرة 🔓
          </button>
        </>
      ) : (
        <h2
          style={{
            marginTop: "40px",

            fontSize: "45px",

            color: "crimson",

            lineHeight: "1.8",
          }}
        >
          {message}
        </h2>
      )}
    </div>
  );
}

export default EssamScreen;
