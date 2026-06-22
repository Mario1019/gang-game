import { useEffect } from "react";

function PlayersScreen({
  playerCount = 5,
  players = [],
  setPlayers,
  goToReady,
  goBack,
}) {
  const handlePlayerName = (index, value) => {
    const updatedPlayers = [...players];

    updatedPlayers[index] = value;

    setPlayers(updatedPlayers);
  };

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem("lastPlayers"));

    if (savedPlayers?.length) {
      setPlayers(savedPlayers);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "white",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "45px",
          textShadow: "0 0 15px crimson",
        }}
      >
        أفراد العملية
      </h1>

      <div
        style={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {Array.from({
          length: playerCount,
        }).map((_, index) => (
          <input
            key={index}
            type="text"
            value={players[index] || ""}
            onChange={(e) => handlePlayerName(index, e.target.value)}
            placeholder={`اللاعب ${index + 1}`}
            style={{
              padding: "18px",
              borderRadius: "15px",
              border: "1px solid #333",
              background: "#151515",
              color: "white",
              fontSize: "18px",
              outline: "none",
            }}
          />
        ))}
      </div>

      <button
        onClick={goBack}
        style={{
          marginTop: "40px",
          width: "100%",
          background: "#222",
          border: "1px solid #444",
          color: "white",
          padding: "18px",
          borderRadius: "20px",
          fontSize: "22px",
          cursor: "pointer",
        }}
      >
        ← رجوع
      </button>

      <button
        onClick={() => {
          localStorage.setItem("lastPlayers", JSON.stringify(players));

          goToReady();
        }}
        style={{
          marginTop: "50px",
          width: "100%",
          background: "crimson",
          border: "none",
          color: "white",
          padding: "18px",
          borderRadius: "20px",
          fontSize: "22px",
          cursor: "pointer",
          boxShadow: "0 0 20px crimson",
        }}
      >
        توزيع الأدوار
      </button>
    </div>
  );
}

export default PlayersScreen;
