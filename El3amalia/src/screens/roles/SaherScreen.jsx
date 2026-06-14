import { useState } from "react";

function SaherScreen({
  currentPlayer,

  allPlayers,

  addNightAction,

  roleOwner,
}) {
  const [selectedTarget, setSelectedTarget] = useState(null);

  const [bulletSaved, setBulletSaved] = useState(false);

  const availableTargets = allPlayers.filter(
    (player) => player.playerName !== currentPlayer.playerName,
  );

  /*
    مين بينفذ الدور فعليًا
  */

  const realActor = roleOwner || currentPlayer.playerName;

  /*
    ========================
    اختيار الضحية
    ========================
  */

  const chooseTarget = (target) => {
    if (currentPlayer.bulletCount <= 0) {
      return;
    }

    setBulletSaved(false);

    setSelectedTarget(target);

    addNightAction({
      role: "ساهر",
      actor: realActor,
      target,
      action: "kill",
    });
  };

  /*
    ========================
    توفير الطلقة
    ========================
  */

  const saveBullet = () => {
    setSelectedTarget(null);

    setBulletSaved(true);

    addNightAction({
      role: "ساهر",

      actor: realActor,

      action: "saveBullet",
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
        ساهر 🔪
      </h1>

      <h2
        style={{
          marginTop: "15px",
          color: "gold",
        }}
      >
        💥 {currentPlayer.bulletCount}
      </h2>

      <p
        style={{
          marginTop: "20px",

          color: "#999",

          fontSize: "24px",

          lineHeight: "1.8",
        }}
      >
        اختار لاعب للتخلص منه
        <br />
        أو وفّر الطلقة للجولة القادمة
      </p>

      <div
        style={{
          marginTop: "50px",

          display: "flex",

          flexDirection: "column",

          gap: "20px",
        }}
      >
        {availableTargets.map((player, index) => (
          <button
            key={index}
            disabled={currentPlayer.bulletCount <= 0}
            onClick={() => chooseTarget(player.playerName)}
            style={{
              background:
                selectedTarget === player.playerName ? "crimson" : "#111",

              border: "1px solid crimson",

              color: "white",

              padding: "20px",

              borderRadius: "20px",

              fontSize: "24px",

              cursor: "pointer",

              transition: "0.2s",
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

      <button
        onClick={saveBullet}
        style={{
          marginTop: "50px",

          background: bulletSaved ? "crimson" : "#222",

          border: "1px solid #666",

          color: "white",

          padding: "20px 35px",

          borderRadius: "20px",

          fontSize: "22px",

          cursor: "pointer",
        }}
      >
        توفير الطلقة 🎯
      </button>

      {selectedTarget && (
        <div
          style={{
            marginTop: "40px",

            background: "#111",

            border: "1px solid crimson",

            borderRadius: "22px",

            padding: "22px",

            fontSize: "28px",
          }}
        >
          🔪 تم اختيار: {selectedTarget}
        </div>
      )}

      {bulletSaved && (
        <div
          style={{
            marginTop: "40px",

            background: "#111",

            border: "1px solid #666",

            borderRadius: "22px",

            padding: "22px",

            fontSize: "28px",

            color: "#ccc",
          }}
        >
          🎯 تم توفير الطلقة
        </div>
      )}
    </div>
  );
}

export default SaherScreen;
