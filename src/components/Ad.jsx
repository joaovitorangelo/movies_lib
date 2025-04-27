import { useEffect } from "react";

const Ad = () => {
  useEffect(() => {
    console.log("Componente Ad montado."); // Log para depuração
    // Verifica se o AdSense está carregado e executa o script
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    } else {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.onload = () => {
        window.adsbygoogle.push({});
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div style={{ backgroundColor: "red", height: "100px", width: "100%" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5163363332807097"
        data-ad-slot="6136444841"
        data-adtest="on"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default Ad;
