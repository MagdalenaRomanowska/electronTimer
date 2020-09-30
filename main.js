'use strict';

const path = require('path');  //Zaczynamy od zwykłych importów jak path, który pojawił się już w kursie. Będziemy wykorzystywać jedną funkcję z tego modułu – join. Służy ona do tworzenia odpowiedniej ścieżki do pliku, tak żeby działała poprawnie na każdym systemie. 
const { app, BrowserWindow } = require('electron'); //Obiektem całej aplikacji jest app. Klasa BrowserWindow służy do tworzenia "okienek". W okienku oczywiście będzie mógł być pokazany nasz plik index.html, ale też każdy inny. Co ważne, każda aplikacja może tworzyć i korzystać z wielu okienek.

function main() { //To funkcja startowa. Jej zadaniem ma być uruchomienie jednego okna aplikacji o rozmiarach 800x600 i wyrenderowanie w nim naszego pliku index.html z folderu app.

  // create new window
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true  //Opcja nodeIntegration pozwala na uruchomienie funkcjonalności Node.js w naszej aplikacji.
    },
    width: 520,
    height: 650,
    frame: false,
  })
 
  // load app/index.html as the window content
  mainWindow.loadFile(path.join('app', 'index.html'));

}

app.on('ready', main);  //ten kod zajmuje się uruchomieniem funkcji main, kiedy Electron jest już gotowy do pracy oraz zakończeniem procesu, jeśli ktoś kliknie na przycisk "x" w oknie.

app.on('window-all-closed', function () {
  app.quit();
});