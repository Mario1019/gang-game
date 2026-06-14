import { useState } from "react";

function MafatnScreen({
  currentPlayer,
  allPlayers,
  addNightAction,
  roleOwner,
  playedPlayers = [],
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const availablePlayers = allPlayers.filter(
    (player) => player.playerName !== currentPlayer.playerName,
  );

  /*
    ========================
    اختيار الضحية
    ========================
  */

  const chooseTarget = (player) => {
    if (selectedPlayer) {
      return;
    }

    setSelectedPlayer(player.playerName);

    const alreadyPlayed = playedPlayers.includes(player.playerName);

    addNightAction({
      role: "مفاتن",

      actor: roleOwner || currentPlayer.playerName,

      action: alreadyPlayed ? "delayedPressureChoice" : "pressureChoice",

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
        مفاتن 💋
      </h1>

      <p
        style={{
          marginTop: "20px",
          color: "#999",
          fontSize: "24px",
        }}
      >
        اختاري شخص…
        <br />
        وخليه يتوتر 😈
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
            disabled={!!selectedPlayer}
            onClick={() => chooseTarget(player)}
            style={{
              background:
                selectedPlayer === player.playerName ? "crimson" : "#111",

              border: "1px solid crimson",

              color: "white",

              padding: "20px",

              borderRadius: "20px",

              fontSize: "24px",

              cursor: selectedPlayer ? "default" : "pointer",

              opacity:
                selectedPlayer && selectedPlayer !== player.playerName
                  ? 0.45
                  : 1,
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
            marginTop: "45px",
            background: "#111",
            border: "1px solid crimson",
            borderRadius: "22px",
            padding: "22px",
            fontSize: "28px",
          }}
        >
          💋 تم تشتيت: {selectedPlayer}
        </div>
      )}
    </div>
  );
}

export default MafatnScreen;
