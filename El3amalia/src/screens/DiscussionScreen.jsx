import {
  useEffect,
  useState,
}
from "react";

function DiscussionScreen({

  discussionTime,

  goToNight,
}) {

  const [
    timeLeft,

    setTimeLeft
  ] = useState(
    discussionTime * 60
  );

  /*
    ========================
    التايمر
    ========================
  */

  useEffect(() => {

    const timer =
      setInterval(() => {

        setTimeLeft(
          (prev) => {

            if (
              prev <= 1
            ) {

              clearInterval(
                timer
              );

              goToNight();

              return 0;
            }

            return prev - 1;
          }
        );

      }, 1000);

    return () =>
      clearInterval(
        timer
      );

  }, [goToNight]);

  /*
    ========================
    الوقت
    ========================
  */

  const minutes =
    Math.floor(
      timeLeft / 60
    );

  const seconds =
    timeLeft % 60;

  return (

    <div
      style={{
        height:
          "100vh",

        background:
          "radial-gradient(circle, #111, #000)",

        color:
          "white",

        display:
          "flex",

        flexDirection:
          "column",

        justifyContent:
          "center",

        alignItems:
          "center",

        fontFamily:
          "sans-serif",

        textAlign:
          "center",

        padding:
          "20px",
      }}
    >

      <h1
        style={{
          fontSize:
            "55px",

          textShadow:
            "0 0 15px crimson",
        }}
      >
        وقت النقاش 🔥
      </h1>

      <div
        style={{
          marginTop:
            "40px",

          fontSize:
            "90px",

          fontWeight:
            "bold",
        }}
      >
        {minutes}:

        {seconds
          .toString()
          .padStart(2, "0")}
      </div>

      <p
        style={{
          marginTop:
            "30px",

          color:
            "#999",

          fontSize:
            "22px",

          maxWidth:
            "500px",

          lineHeight:
            "1.8",
        }}
      >
        حاولوا تعرفوا مين
        الشرطة ومين
        بيمثل إنه من العصابة 👀
      </p>

      <button
        onClick={() => {

          goToNight();
        }}

        style={{
          marginTop:
            "50px",

          background:
            "crimson",

          border:
            "none",

          color:
            "white",

          padding:
            "18px 40px",

          borderRadius:
            "20px",

          fontSize:
            "22px",

          cursor:
            "pointer",

          boxShadow:
            "0 0 20px crimson",
        }}
      >
        إنهاء النقاش 🌙
      </button>
    </div>
  );
}

export default DiscussionScreen;