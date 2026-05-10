function EmergencyMeetingScreen({

  playersState,

  meetingTarget,

  eliminatePlayer,
}) {

  /*
    ========================
    اللاعبين الأحياء فقط
    ========================
  */

  const alivePlayers =

    playersState.filter(
      (player) =>
        player.alive
    );

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
          "40px",

        fontFamily:
          "sans-serif",

        textAlign:
          "center",
      }}
    >

      <h1
        style={{
          fontSize:
            "70px",

          color:
            "crimson",

          textShadow:
            "0 0 25px crimson",
        }}
      >
        🚨 اجتماع العصابة
      </h1>

      <p
        style={{
          marginTop:
            "25px",

          fontSize:
            "28px",

          color:
            "#aaa",

          lineHeight:
            "1.9",
        }}
      >
        واضح إن حد
        لعبها غلط الليلة…
        <br />

        والعصابة قررت
        تفتح الكلام 😈
      </p>

      {meetingTarget && (

        <div
          style={{

            marginTop:
              "40px",

            background:
              "#111",

            border:
              "1px solid crimson",

            borderRadius:
              "25px",

            padding:
              "25px",

            maxWidth:
              "700px",

            marginInline:
              "auto",
          }}
        >

          <p
            style={{
              color:
                "#888",

              fontSize:
                "22px",
            }}
          >
            الشخص اللي
            عليه العين الليلة
          </p>

          <h2
            style={{

              marginTop:
                "15px",

              fontSize:
                "50px",

              color:
                "crimson",
            }}
          >
            {meetingTarget}
          </h2>
        </div>
      )}

      <div
        style={{
          marginTop:
            "60px",

          display:
            "flex",

          flexDirection:
            "column",

          gap:
            "18px",

          maxWidth:
            "700px",

          marginInline:
            "auto",
        }}
      >

        {alivePlayers.map(
          (
            player,
            index
          ) => (

            <button
              key={index}

              onClick={() =>
                eliminatePlayer(
                  player.playerName
                )
              }

              style={{

                background:
                  player.playerName ===
                  meetingTarget

                    ? "crimson"

                    : "#111",

                border:
                  "1px solid crimson",

                color:
                  "white",

                padding:
                  "22px",

                borderRadius:
                  "22px",

                fontSize:
                  "28px",

                cursor:
                  "pointer",

                transition:
                  "0.2s",
              }}
            >
              {
                player.playerName
              }
            </button>
          )
        )}
      </div>

      <p
        style={{
          marginTop:
            "50px",

          color:
            "#666",

          fontSize:
            "20px",

          lineHeight:
            "1.8",
        }}
      >
        اختاروا الشخص
        اللي العصابة
        قررت تتخلص منه.
      </p>
    </div>
  );
}

export default EmergencyMeetingScreen;