import { newspaperTemplates, pickTemplate } from "../game/newspaperTemplates";

function MorningScreen({
  nightResult,

  meetingTriggered,

  goToDiscussion,
}) {
  /*
    ========================
    النتائج الحقيقية
    ========================
  */

  const newspaperItems = [];

  if (nightResult?.killedPlayer) {
    const murderText = pickTemplate(newspaperTemplates.MURDER).replace(
      "{player}",
      nightResult.killedPlayer,
    );

    newspaperItems.push(`☠️ ${murderText}`);
  }

  if (nightResult?.houdaSacrificePlayer) {
    newspaperItems.push(
      `☠️ لقي ${nightResult.houdaSacrificePlayer} مصرعه أثناء محاولته حماية أحد السكان.`,
    );
  }

  if (nightResult?.arrestedPlayer) {
    const arrestText = pickTemplate(newspaperTemplates.ARREST).replace(
      "{player}",
      nightResult.arrestedPlayer,
    );

    newspaperItems.push(`🚔 ${arrestText}`);
  }

  if (nightResult?.meetingTriggered) {
    newspaperItems.push(`🚨 طالب بعض الأهالي بعقد اجتماع طارئ هذا الصباح.`);
  }

  if (newspaperItems.length === 0) {
    newspaperItems.push(`📰 ${pickTemplate(newspaperTemplates.QUIET_NIGHT)}`);
  } /*
    ========================
    تهريب ناجح
    ========================
  */

  return (
    <div
      style={{
        minHeight: "100vh",

        background: "#050505",

        color: "white",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        flexDirection: "column",

        textAlign: "center",

        fontFamily: "sans-serif",

        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "70px",

          textShadow: "0 0 20px crimson",

          marginBottom: "60px",
        }}
      >
        الصبح 🌑
      </h1>

      <div
        style={{
          background: "#111",

          border: "2px solid #333",

          borderRadius: "30px",

          padding: "50px",

          maxWidth: "900px",

          boxShadow: "0 0 40px rgba(0,0,0,0.7)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          {newspaperItems.map((item, index) => (
            <div
              key={index}
              style={{
                fontSize: "34px",
                lineHeight: "1.8",
                color: "#ddd",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {meetingTriggered && (
          <div
            style={{
              marginTop: "45px",

              padding: "30px",

              border: "1px solid crimson",

              borderRadius: "25px",

              background: "rgba(220,20,60,0.08)",

              boxShadow: "0 0 25px rgba(220,20,60,0.3)",
            }}
          >
            <h3
              style={{
                fontSize: "34px",

                color: "crimson",

                textShadow: "0 0 12px crimson",
              }}
            >
              🚨 اجتماع طارئ
            </h3>

            <p
              style={{
                marginTop: "20px",

                fontSize: "24px",

                lineHeight: "1.9",

                color: "#bbb",
              }}
            >
              العصابة عايزة تتكلم النهارده…
              <br />
              واضح إن حد بقى تحت المجهر 😈
            </p>
          </div>
        )}
      </div>

      <button
        onClick={goToDiscussion}
        style={{
          marginTop: "70px",

          background: meetingTriggered ? "crimson" : "#222",

          border: "none",

          color: "white",

          padding: "22px 55px",

          borderRadius: "25px",

          fontSize: "28px",

          cursor: "pointer",

          boxShadow: meetingTriggered ? "0 0 20px crimson" : "0 0 10px #111",
        }}
      >
        {meetingTriggered ? "ابدأ الاجتماع 🚨" : "يوم جديد 🌑"}
      </button>
    </div>
  );
}

export default MorningScreen;
