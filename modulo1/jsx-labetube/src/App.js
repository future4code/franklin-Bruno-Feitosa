import logo from "./logo.svg";
import iconePerfil from "./icone-perfil.png";
import lupa from "./lupa.png";
import "./App.css";

function App() {
  const titulo = "Título do vídeo";

  // const titles = [];

  // function populaVideo() {
  //   for (let i = 1; i <= 8; i++) {
  //     titles.push(`${i} - Vídeo`);
  //   }
  // }

  // populaVideo();

  // const titulos = titles.map((title, index) => {
  //   return title[index];
  // });

  function reproduzVideo() {
    alert("O vídeo está sendo reproduzido");
  }

  return (
    <div>
      <div className="tela-inteira">
        <header>
          <h1>Lab Tube</h1>
          <input type="text" placeholder="Busca" id="campoDeBusca" />
          <img
            src={iconePerfil}
            className="icone-perfil"
            alt="Ícone de perfil do usuário"
          />
        </header>

        <main>
          <nav className="menu-vertical">
            <ul>
              <li className="botoes-meunu-vertical">Início</li>
              <li className="botoes-meunu-vertical">Em alta</li>
              <li className="botoes-meunu-vertical">Inscrições</li>
              <hr />
              <li className="botoes-meunu-vertical botoes-meunu-vertical-originais">
                Originais
              </li>
              <li className="botoes-meunu-vertical">Histórico</li>
            </ul>
          </nav>

          <section className="painel-de-videos">
            <div
              className="box-pagina-principal media1"
              onClick={reproduzVideo}
            >
              <img src="https://picsum.photos/400/400?a=1 " alt="" />
              <h4>{titulo}</h4>
            </div>
            <div
              className="box-pagina-principal media2"
              onClick={reproduzVideo}
            >
              <img src="https://picsum.photos/400/400?a=2 " alt="" />
              <h4>{titulo}</h4>
            </div>
            <div
              className="box-pagina-principal media3"
              onClick={reproduzVideo}
            >
              <img src="https://picsum.photos/400/400?a=3 " alt="" />
              <h4>{titulo}</h4>
            </div>
            <div
              className="box-pagina-principal media4"
              onClick={reproduzVideo}
            >
              <img src="https://picsum.photos/400/400?a=4 " alt="" />
              <h4>{titulo}</h4>
            </div>
            <div
              className="box-pagina-principal media5"
              onClick={reproduzVideo}
            >
              <img src="https://picsum.photos/400/400?a=5 " alt="" />
              <h4>{titulo}</h4>
            </div>
            <div
              className="box-pagina-principal media6"
              onClick={reproduzVideo}
            >
              <img src="https://picsum.photos/400/400?a=6 " alt="" />
              <h4>{titulo}</h4>
            </div>
            <div
              className="box-pagina-principal media7"
              onClick={reproduzVideo}
            >
              <img src="https://picsum.photos/400/400?a=7 " alt="" />
              <h4>{titulo}</h4>
            </div>
            <div
              className="box-pagina-principal media8"
              onClick={reproduzVideo}
            >
              <img src="https://picsum.photos/400/400?a=8 " alt="" />
              <h4>{titulo}</h4>
            </div>
          </section>
        </main>

        <footer className="footer">
          <h4>&copy; Copyright Lab Tube - 2022</h4>
        </footer>
      </div>
    </div>
  );
}

export default App;
