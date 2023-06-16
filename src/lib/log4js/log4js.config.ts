export interface Log4jsConfig {

    /**
     * 日志存放路径
     * @default "logs/http"
     * */
    filename?: string;

    /**
     * 文件名规则，默认 'yyyy-MM-dd.log'
     * The following strings are recognized in the pattern:
     *  - yyyy : the full year, use yy for just the last two digits
     *  - MM   : the month
     *  - dd   : the day of the month
     *  - hh   : the hour of the day (24-hour clock)
     *  - mm   : the minute of the hour
     *  - ss   : seconds
     *  - SSS  : milliseconds (although I'm not sure you'd want to roll your logs every millisecond)
     *  - O    : timezone (capital letter o)
     */
    fileNameSuffixPattern?: string;

    /**
     *
     * The number of old files that matches the pattern to keep (excluding the hot file).
     * @default 90
     */
    numBackups?: number;
}
