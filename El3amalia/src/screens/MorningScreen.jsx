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

  const resolvedKill = nightResult?.resolvedActions?.find(
    (action) => action.type === "kill",
  );

  const resolvedArrest = nightResult?.resolvedActions?.find(
    (action) => action.type === "arrest",
  );

  /*
    ========================
    عنوان الصباح
    ========================
  */

  let morningHeadline = "📰 أخبار عاجلة: ليلة هادئة نسبيًا داخل الحارة";

  /*
    ========================
    القتل
    ========================
  */

  if (resolvedKill) {
    morningHeadline = `☠️ العثور على جثة ${resolvedKill.target}`;
  }

  /*
    ========================
    القبض
    ========================
  */

  if (resolvedArrest) {
    morningHeadline = `🚔 تم القبض على ${resolvedArrest.target}`;
  }

  /*
    ========================
    قتل + قبض
    ========================
  */

  if (resolvedKill && resolvedArrest) {
    morningHeadline = `☠️ ${resolvedKill.target} اتقتل
       و 🚔 ${resolvedArrest.target} اتقبض عليه`;
  }

  /*
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
        <h2
          style={{
            fontSize: "38px",

            lineHeight: "1.8",

            color: "#ddd",
          }}
        >
          {morningHeadline}
        </h2>

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
