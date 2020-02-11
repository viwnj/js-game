import Application from './Application';
import EE from './EventEmitter';
declare global {
  interface Window {
    __EVENTEMITTER__x: any;
  }
}

function main(): number {
  const App: any = new Application();
  EE.on('GameStateChanged', (state: string) => App.Load(state));

  App.ticker.add((delta: number) => {
    App.Render(App.stage);
    App.Update(App.ticker);
  });
  document.body.appendChild(App.view);

  return 0;
}

main();
