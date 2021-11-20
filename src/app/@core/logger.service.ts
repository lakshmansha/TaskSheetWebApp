import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';


/**
 * Simple logger system with the possibility of registering custom outputs.
 *
 * 4 different log levels are provided, with corresponding methods:
 * - debug   : for debug information
 * - info    : for informative status of the application (success, ...)
 * - warning : for non-critical errors that do not prevent normal application behavior
 * - error   : for critical errors that prevent normal application behavior
 *
 * Example usage:
 * ```
 * import { Logger } from 'app/core/logger.service';
 *
 * const log = new Logger('myFile');
 * ...
 * log.debug('something happened');
 * ```
 *
 * To disable debug and info logs in production, add this snippet to your root component:
 * ```
 * export class AppComponent implements OnInit {
 *   ngOnInit() {
 *     if (environment.production) {
 *       Logger.enableProductionMode();
 *     }
 *     ...
 *   }
 * }
 *
 * If you want to process logs through other outputs than console, you can add LogOutput functions to Logger.outputs.
 */

/**
 * The possible log levels.
 * LogLevel.Off is never emitted and only used with Logger.level property to disable logs.
 */
export enum LogLevel {
  Off = 0,
  Error,
  Warning,
  Info,
  Debug,
}

/**
 * Log output handler function.
 */
export type LogOutput = (source: string | undefined, level: LogLevel, ...objects: any[]) => void;

export class Logger {
  /**
   * Current logging level.
   * Set it to LogLevel.Off to disable logs completely.
   */
  static level = LogLevel.Debug;

  /**
   * Additional log outputs.
   */
  static outputs: LogOutput[] = [];

  /**
   * Enables production mode.
   * Sets logging level to LogLevel.Warning.
   */
  static enableProductionMode() {
    Logger.level = LogLevel.Warning;
  }

  constructor(private source?: string) {}

  /**
   * Logs messages or objects  with the debug level.
   * Works the same as console.log().
   */
  debug(...objects: any[]) {
    this.log(console.log, LogLevel.Debug, objects);
  }

  /**
   * Logs messages or objects  with the info level.
   * Works the same as console.log().
   */
  info(...objects: any[]) {
    this.log(console.info, LogLevel.Info, objects);
  }

  /**
   * Logs messages or objects  with the warning level.
   * Works the same as console.log().
   */
  warn(...objects: any[]) {
    this.log(console.warn, LogLevel.Warning, objects);
  }

  /**
   * Logs messages or objects  with the error level.
   * Works the same as console.log().
   */
  error(...objects: any[]) {
    this.log(console.error, LogLevel.Error, objects);
  }

  private log(func: (...args: any[]) => void, level: LogLevel, objects: any[]) {
    if (level <= Logger.level) {
      const log = this.source ? ['[' + this.source + ']'].concat(objects) : objects;
      func.apply(console, log);
      Logger.outputs.forEach((output) => output.apply(output, [this.source, level, ...objects]));
    }
  }
}

@Injectable()
export class MyMonitoringService {
  appInsights: ApplicationInsights;
  constructor() {
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.appInsights.instrumentationKey,
        enableAutoRouteTracking: true, // option to log all route changes
        appId: environment.appInsights.appName,
      },
    });
    this.appInsights.loadAppInsights();
  }

  logPageView(name?: string, url?: string) {
    // option to call manually
    this.appInsights.trackPageView({
      name: name,
      uri: url,
    });
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    this.appInsights.trackEvent({ name: name }, properties);
  }

  logMetric(name: string, average: number, properties?: { [key: string]: any }) {
    this.appInsights.trackMetric({ name: name, average: average }, properties);
  }

  logException(exception: Error, severityLevel?: number) {
    this.appInsights.trackException({ exception: exception, severityLevel: severityLevel });
  }

  logTrace(message: string, properties?: { [key: string]: any }) {
    this.appInsights.trackTrace({ message: message }, properties);
  }
}

@Injectable()
export class ErrorHandlerService extends ErrorHandler {
  constructor(private myMonitoringService: MyMonitoringService) {
    super();
  }

  handleError(error: Error) {
    this.myMonitoringService.logException(error); // Manually log exception
  }
}