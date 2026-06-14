import { useState } from "react";

function BeboScreen({
  currentPlayer,

  allPlayers,

  addNightAction,

  roleOwner,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const availablePlayers = allPlayers.filter(
    (player) => player.playerName !== currentPlayer.playerName,
  );

  /*
    ========================
    تهريب لاعب
    ========================
  */

  const choosePlayer = (name) => {
    setSelectedPlayer(name);

    addNightAction({
      actor: currentPlayer.playerName,

      role: "بيبو ماجيفار",

      action: "escape",

      target: name,
    });
  };

  /*
    ========================
    الهروب بنفسه
    ========================
  */

  const saveHimself = () => {
    setSelectedPlayer(currentPlayer.playerName);

    addNightAction({
      actor: roleOwner || currentPlayer.playerName,

      role: "بيبو ماجيفار",

      action: "escape",

      target: currentPlayer.playerName,
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
        بيبو ماجيفار 🚗
      </h1>

      <p
        style={{
          marginTop: "20px",

          color: "#999",

          fontSize: "24px",

          lineHeight: "1.8",
        }}
      >
        اختار مين تهرّبه الليلة
        <br />
        أو انفد بجلدك
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
            onClick={() => choosePlayer(player.playerName)}
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

      <button
        onClick={saveHimself}
        style={{
          marginTop: "50px",

          background:
            selectedPlayer === currentPlayer.playerName ? "crimson" : "#222",

          border: "1px solid #666",

          color: "white",

          padding: "20px 35px",

          borderRadius: "20px",

          fontSize: "24px",

          cursor: "pointer",
        }}
      >
        انفد بجلدك 🏃
      </button>
    </div>
  );
}

export default BeboScreen;
