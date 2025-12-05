import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);
dayjs.extend(isoWeek);

dayjs.locale('es');

export default dayjs;
