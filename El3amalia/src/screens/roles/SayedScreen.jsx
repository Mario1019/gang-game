import { useMemo, useState } from "react";

function SayedScreen({
  currentPlayer,

  allPlayers,

  addNightAction,

  playedPlayers = [],
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [locked, setLocked] = useState(false);

  /*
    ========================
    اللاعبين المتاحين
    ========================
  */

  const availablePlayers = allPlayers.filter(
    (player) => player.playerName !== currentPlayer.playerName,
  );

  /*
    ========================
    subset عشوائي
    ========================
  */

  /*
    ========================
    الاختيار
    ========================
  */

  const chooseTarget = (player) => {
    if (locked) {
      return;
    }

    const alreadyPlayed = playedPlayers.includes(player.playerName);

    if (alreadyPlayed) {
      setSelectedPlayer(player.playerName);

      setLocked(true);

      addNightAction({
        role: "سيد بشرية",

        actor: currentPlayer.playerName,

        target: player.playerName,

        action: "stealRole",

        alreadyPlayed: true,
      });

      return;
    }

    setSelectedPlayer(player.playerName);

    setLocked(true);

    /*
        تسجيل السرقة
      */

    addNightAction({
      role: "سيد بشرية",

      actor: currentPlayer.playerName,

      target: player.playerName,

      action: "stealRole",

      /*
          هل لعب بالفعل؟
        */

      alreadyPlayed: playedPlayers.includes(player.playerName),
    });
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
        سيد بشرية 🥊
      </h1>

      <p
        style={{
          marginTop: "20px",

          color: "#999",

          fontSize: "24px",

          lineHeight: "1.8",
        }}
      >
        اختار لاعب…
        <br />
        ويمكن الليلة تبقى مكانه 😈
      </p>

      <div
        style={{
          marginTop: "50px",

          display: "flex",

          flexDirection: "column",

          gap: "18px",
        }}
      >
        {availablePlayers.map((player, index) => {
          const alreadyPlayed = playedPlayers.includes(player.playerName);

          return (
            <button
              key={index}
              disabled={locked}
              onClick={() => chooseTarget(player)}
              style={{
                background:
                  selectedPlayer === player.playerName
                    ? "crimson"
                    : alreadyPlayed
                      ? "#1a1a1a"
                      : "#111",

                border: "1px solid crimson",

                color: "white",

                padding: "20px",

                borderRadius: "20px",

                fontSize: "24px",

                cursor: "pointer",

                opacity:
                  locked && selectedPlayer !== player.playerName ? 0.45 : 1,
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
              {alreadyPlayed && " 👁️"}
            </button>
          );
        })}
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
            الهدف المختار
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

          <p
            style={{
              marginTop: "15px",

              color: "#999",

              fontSize: "22px",
            }}
          >
            {playedPlayers.includes(selectedPlayer)
              ? "👁️ لعب بالفعل"
              : "🔥 دوره لسه مجاش"}
          </p>
        </div>
      )}
    </div>
  );
}

export default SayedScreen;
