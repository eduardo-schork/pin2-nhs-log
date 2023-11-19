import moment from 'moment-timezone';
import 'moment/dist/locale/pt-br';

function formatDateToPresent(rawDate: any) {
    const formattedDate = moment.tz(rawDate, 'America/Sao_Paulo').format('LLL');
    return formattedDate;
}

export default formatDateToPresent;
