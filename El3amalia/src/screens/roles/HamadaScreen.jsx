import { useState } from "react";

function HamadaScreen({
  currentPlayer,

  allPlayers,

  addNightAction,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const availablePlayers = allPlayers.filter(
    (player) => player.playerName !== currentPlayer.playerName,
  );

  /*
    ========================
    الفدا
    ========================
  */

  const protectPlayer = (player) => {
    /*
        تسجيل الأكشن
      */

    addNightAction({
      role: "حمادة كلهم",

      actor: currentPlayer.playerName,

      target: player.playerName,

      action: "sacrificeProtection",
    });

    setSelectedPlayer(player.playerName);
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        background: "#050505",

        color: "white",

        padding: "30px",

        fontFamily: "sans-serif",

        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "55px",

          textShadow: "0 0 20px crimson",
        }}
      >
        حمادة كلهم 🛡️
      </h1>

      <p
        style={{
          marginTop: "20px",

          color: "#999",

          fontSize: "24px",

          lineHeight: "1.8",
        }}
      >
        اختار شخص…
        <br />
        ولو وقع الليلة هتقع مكانه 😈
      </p>

      <div
        style={{
          marginTop: "50px",

          display: "flex",

          flexDirection: "column",

          gap: "18px",
        }}
      >
        {availablePlayers.map((player, index) => (
          <button
            key={index}
            onClick={() => protectPlayer(player)}
            style={{
              background:
                selectedPlayer === player.playerName ? "crimson" : "#111",

              border: "1px solid crimson",

              color: "white",

              padding: "20px",

              borderRadius: "20px",

              fontSize: "24px",

              cursor: "pointer",
            }}
          >
            {player.zekoMasked ? (
              <img
                src="/Images/ذيكو الكاريزما.png"
                alt="؟؟؟"
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            ) : (
              player.playerName
            )}
          </button>
        ))}
      </div>

      {selectedPlayer && (
        <div
          style={{
            marginTop: "45px",

            padding: "22px",

            border: "1px solid crimson",

            borderRadius: "22px",

            background: "#111",
          }}
        >
          <p
            style={{
              color: "#999",

              fontSize: "22px",
            }}
          >
            الشخص اللي هتفديه
          </p>

          <h2
            style={{
              marginTop: "12px",

              fontSize: "40px",

              color: "crimson",
            }}
          >
            {selectedPlayer}
          </h2>
        </div>
      )}
    </div>
  );
}

export default HamadaScreen;
