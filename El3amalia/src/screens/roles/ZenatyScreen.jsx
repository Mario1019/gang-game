import { useState } from "react";

function ZenatyScreen({
  currentPlayer,
  allPlayers,
  addNightAction,
  roleOwner,
  playedPlayers = [],
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [locked, setLocked] = useState(false);

  const availablePlayers = allPlayers.filter(
    (player) => player.playerName !== currentPlayer.playerName,
  );

  /*
    ========================
    اختيار الهدف
    ========================
  */

  const choosePlayer = (player) => {
    if (locked) {
      return;
    }

    setSelectedPlayer(player.playerName);

    setLocked(true);

    const alreadyPlayed = playedPlayers.includes(player.playerName);

    addNightAction({
      role: "زناتي",
      actor: roleOwner || currentPlayer.playerName,
      action: alreadyPlayed ? "delayedRemove" : "instantDelayedBlock",

      target: player.playerName,
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
        زناتي ⏳
      </h1>

      <p
        style={{
          marginTop: "20px",
          color: "#999",
          fontSize: "24px",
        }}
      >
        اختار لاعب توقفه الليلة القادمة 😈
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
            disabled={locked}
            onClick={() => choosePlayer(player)}
            style={{
              background:
                selectedPlayer === player.playerName ? "crimson" : "#111",

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
            )}{" "}
          </button>
        ))}
      </div>

      {selectedPlayer && (
        <div
          style={{
            marginTop: "50px",

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
              marginTop: "20px",

              fontSize: "24px",

              color: "#999",
            }}
          >
            سيتم إيقافه الليلة القادمة 😈
          </p>
        </div>
      )}
    </div>
  );
}

export default ZenatyScreen;
