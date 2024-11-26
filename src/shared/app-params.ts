export class AppParams {
    static readonly MIN_VALID_YEAR = !isNaN(Number(process.env.MIN_VALID_YEAR)) ? Number(process.env.MIN_VALID_YEAR) : 1800;
    static readonly MAX_VALID_YEAR = !isNaN(Number(process.env.MAX_VALID_YEAR)) ? Number(process.env.MAX_VALID_YEAR) : (new Date).getFullYear();
    static readonly YEAR_CSV_POSITION = !isNaN(Number(process.env.YEAR_CSV_POSITION)) ? Number(process.env.YEAR_CSV_POSITION) : 0;
    static readonly TITLE_CSV_POSITION = !isNaN(Number(process.env.TITLE_CSV_POSITION)) ? Number(process.env.TITLE_CSV_POSITION) : 1;
    static readonly STUDIOS_CSV_POSITION = !isNaN(Number(process.env.STUDIOS_CSV_POSITION)) ? Number(process.env.STUDIOS_CSV_POSITION) : 2;
    static readonly PRODUCERS_CSV_POSITION = !isNaN(Number(process.env.PRODUCERS_CSV_POSITION)) ? Number(process.env.PRODUCERS_CSV_POSITION) : 3;
    static readonly WINNER_CSV_POSITION = !isNaN(Number(process.env.WINNER_CSV_POSITION)) ? Number(process.env.WINNER_CSV_POSITION) : 4;
    static readonly IGNORE_TITLE = process.env.IGNORE_TITLE ?? true;
    static readonly CSV_RELATIVE_PATH = process.env.CSV_RELATIVE_PATH ?? '../database.csv';
    static readonly CSV_SPLIT_ROW_SYMBOL = process.env.CSV_SPLIT_ROW_SYMBOL ?? '\n';
    static readonly CSV_SPLIT_COL_SYMBOL = process.env.CSV_SPLIT_COL_SYMBOL ?? ';';
    static readonly CSV_ENCODE = 'utf8';
}
