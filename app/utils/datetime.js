import moment from 'moment/moment';

export const formatYear = (date) => moment(date).format('YYYY');

export const fromMinutesToHoursAndMinutes = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const formattedHours = hours ? `${hours}h` : '';
    const formattedMinutes = minutes ? `${minutes}min` : '';
    const space = formattedHours.length && formattedMinutes.length ? ' ' : '';

    return `${formattedHours}${space}${formattedMinutes}`;
}
