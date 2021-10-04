import * as moment from 'moment';
import { IDatePickerConfig } from 'ng2-date-picker';

const DatePickerConfiguration = {
    closeOnSelect: false,
    format: 'YYYY-MM-DD',
    firstDayOfWeek: 'mo',
    min: moment().add(1, 'days'),
    locale: 'es-us',
    showGoToCurrent: true
} as IDatePickerConfig;

export default DatePickerConfiguration;
