import { useState }
from "react";

function TaysirScreen({

  currentPlayer,

  allPlayers,

  nightActions,

  addNightAction,

  roleOwner,
}) {

  const [
    selectedPlayer,

    setSelectedPlayer,
  ] = useState(null);

  const [
    locked,

    setLocked,
  ] = useState(false);

  /*
    ========================
    مين بينفذ فعليًا
    ========================
  */

  const realActor =

    roleOwner ||

    currentPlayer
      .playerName;

  /*
    ========================
    البلاغات
    ========================
  */

  const messages =

    nightActions.filter(
      (action) =>

        action.action ===
          "intel" ||

        action.action ===
          "stealIntel"
    );

  /*
    ========================
    اللاعبين المتاحين
    ========================
  */

  const availablePlayers =

    allPlayers.filter(
      (player) =>

        player.playerName !==
          currentPlayer
            .playerName
    );

  /*
    ========================
    قبض
    ========================
  */

  const arrestPlayer =
    (name) => {

      if (locked) {

        return;
      }

      setSelectedPlayer(
        name
      );

      setLocked(true);

      addNightAction({

        role:
          "تيسير بيه",

        actor:
          realActor,

        target:
          name,

        action:
          "arrest",
      });
    };

  /*
    ========================
    تخطي القبض
    ========================
  */

  const skipArrest =
    () => {

      if (locked) {

        return;
      }

      setSelectedPlayer(
        "مفيش أدلة كفاية"
      );

      setLocked(true);

      addNightAction({

        role:
          "تيسير بيه",

        actor:
          realActor,

        action:
          "skipArrest",
      });
    };

  return (

    <div
      style={{
        minHeight:
          "100vh",

        background:
          "#050505",

        color:
          "white",

        padding:
          "30px",

        fontFamily:
          "sans-serif",

        textAlign:
          "center",
      }}
    >

      <h1
        style={{
          fontSize:
            "55px",

          textShadow:
            "0 0 20px crimson",
        }}
      >
        تيسير بيه 🚔
      </h1>

      <p
        style={{
          marginTop:
            "20px",

          color:
            "#999",

          fontSize:
            "24px",
        }}
      >
        وصلك بلاغ الليلة
      </p>

      <div
        style={{
          marginTop:
            "40px",

          display:
            "flex",

          flexDirection:
            "column",

          gap:
            "18px",
        }}
      >

        {messages.length > 0 ? (

          messages.map(
            (
              message,
              index
            ) => (

              <div
                key={index}

                style={{
                  background:
                    "#111",

                  border:
                    "1px solid crimson",

                  borderRadius:
                    "20px",

                  padding:
                    "20px",

                  fontSize:
                    "24px",
                }}
              >
                {
                  message.message
                }
              </div>
            )
          )

        ) : (

          <div
            style={{
              background:
                "#111",

              border:
                "1px solid #444",

              borderRadius:
                "20px",

              padding:
                "20px",

              fontSize:
                "22px",

              color:
                "#888",
            }}
          >
            مفيش أي بلاغات
            الليلة 😮‍💨
          </div>
        )}
      </div>

      <h2
        style={{
          marginTop:
            "60px",

          fontSize:
            "35px",
        }}
      >
        هتقبض على مين؟
      </h2>

      <div
        style={{
          marginTop:
            "35px",

          display:
            "flex",

          flexDirection:
            "column",

          gap:
            "18px",
        }}
      >

        {availablePlayers.map(
          (
            player,
            index
          ) => (

            <button
              key={index}

              disabled={locked}

              onClick={() =>
                arrestPlayer(
                  player.playerName
                )
              }

              style={{
                background:

                  selectedPlayer ===
                  player.playerName

                    ? "crimson"

                    : "#111",

                border:
                  "1px solid crimson",

                color:
                  "white",

                padding:
                  "20px",

                borderRadius:
                  "20px",

                fontSize:
                  "24px",

                cursor:
                  "pointer",

                opacity:

                  locked &&
                  selectedPlayer !==
                    player.playerName

                    ? 0.45

                    : 1,
              }}
            >
              {
                player.playerName
              }
            </button>
          )
        )}
      </div>

      <button
        disabled={locked}

        onClick={skipArrest}

        style={{
          marginTop:
            "50px",

          background:

            selectedPlayer ===
            "مفيش أدلة كفاية"

              ? "crimson"

              : "#222",

          border:
            "1px solid #666",

          color:
            "white",

          padding:
            "20px 35px",

          borderRadius:
            "20px",

          fontSize:
            "22px",

          cursor:
            "pointer",
        }}
      >
        مفيش أدلة كفاية 🕵️
      </button>
    </div>
  );
}

export default TaysirScreen;