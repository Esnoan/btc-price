const { app, BrowserWindow, screen } = require('electron');
const express = require('express');
const server = require('./back/build/server.js');

let appWin;

createWindow = () => {
  var mainScreen = screen.getPrimaryDisplay();
  appWin = new BrowserWindow({
    width: 500,
    height: mainScreen.size.height,
    title: 'Angular and Electron',
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#232637',
      symbolColor: '#faa916',
    },
    x: mainScreen.size.width - 500,
    y: 0,
  });

  appWin.loadURL(`file://${__dirname}/front/dist/front/index.html`);

  appWin.setMenu(null);

  // appWin.webContents.openDevTools();

  appWin.on('closed', () => {
    appWin = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
