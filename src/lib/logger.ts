type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  // Mặc định log trong mọi môi trường cho đến khi có cấu hình chi tiết hơn
  // Có thể điều chỉnh logic isProduction tùy nhu cầu thực tế
  private isProduction = process.env.NODE_ENV === 'production';

  private formatMessage(level: LogLevel, message: string, ...args: unknown[]) {
    const timestamp = new Date().toISOString();
    return [`[${timestamp}] [${level.toUpperCase()}] ${message}`, ...args];
  }

  info(message: string, ...args: unknown[]) {
    console.log(...this.formatMessage('info', message, ...args));
  }

  warn(message: string, ...args: unknown[]) {
    console.warn(...this.formatMessage('warn', message, ...args));
  }

  error(message: string, ...args: unknown[]) {
    console.error(...this.formatMessage('error', message, ...args));
  }

  debug(message: string, ...args: unknown[]) {
    // Debug log có thể ẩn trong production nếu muốn
    if (!this.isProduction) {
      console.debug(...this.formatMessage('debug', message, ...args));
    }
  }
}

export const logger = new Logger();
