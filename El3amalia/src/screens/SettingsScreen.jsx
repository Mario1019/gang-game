function SettingsScreen({
  playerCount,
  setPlayerCount,
  discussionTime,
  setDiscussionTime,
  goToPlayers,
}) {
  return (
    <div
      style={{
        height: "100vh",
        background: "#0a0a0a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        <div>❓</div>
        <div>⚙️</div>
      </div>

      <h1
        style={{
          marginTop: "20px",
          fontSize: "50px",
          textShadow: "0 0 15px crimson",
        }}
      >
        العملية
      </h1>

      <div
        style={{
          marginTop: "80px",
          width: "80%",
        }}
      >
        <p
          style={{
            fontSize: "22px",
          }}
        >
          عدد اللاعبين
        </p>

        <input
          type="range"
          min="5"
          max="12"
          value={playerCount}
          onChange={(e) =>
            setPlayerCount(Number(e.target.value))
          }
          style={{
            width: "100%",
          }}
        />

        <p
          style={{
            textAlign: "center",
            fontSize: "35px",
          }}
        >
          {playerCount}
        </p>

        <p
          style={{
            marginTop: "50px",
            fontSize: "22px",
          }}
        >
          مدة النقاش
        </p>

        <input
  type="range"
  min="1"
  max="10"
  value={discussionTime}
  onChange={(e) =>
    setDiscussionTime(
      Number(e.target.value)
    )
  }
  style={{
    width: "100%",
  }}
/>

        <p
          style={{
            textAlign: "center",
            fontSize: "35px",
          }}
        >
          {discussionTime} دقائق
        </p>
      </div>

      <button
        onClick={goToPlayers}
        style={{
          marginTop: "70px",
          background: "crimson",
          border: "none",
          color: "white",
          padding: "18px 40px",
          borderRadius: "20px",
          fontSize: "22px",
          cursor: "pointer",
          boxShadow: "0 0 20px crimson",
        }}
      >
        ابدأ الخطة
      </button>
    </div>
  );
}

export default SettingsScreen;