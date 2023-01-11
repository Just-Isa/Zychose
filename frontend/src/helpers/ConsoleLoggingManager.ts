import jsonconfig from "../../../swtp.config.json";

interface NullConsole {
  log: Function;
  error: Function;
}

let logger: Console | NullConsole = {} as Console;

if (jsonconfig.showConsoleOutput) {
  logger = window.console;
} else {
  logger = {
    log: (...args: any) => {},
    error: (...args: any) => {},
  };
}

export { logger };
