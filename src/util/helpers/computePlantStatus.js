import { green, orange, red, yellow } from '@mui/material/colors';

import add from 'date-fns/add';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isWithinInterval from 'date-fns/isWithinInterval';
import sub from 'date-fns/sub';

export const computeStatus = (plant) => {
  const now = new Date();
  const wateringDatetime = new Date(plant.nextWater);

  const fifthOfWateringPeriod = Math.max(
    Math.floor(plant.waterIntervalDays / 5),
    1
  );
  const fifthBeforeWatering = sub(wateringDatetime, {
    days: fifthOfWateringPeriod,
  });
  const fifthAfterWatering = add(wateringDatetime, {
    days: fifthOfWateringPeriod,
  });

  // now is before (watering time minus fifth) = green; OK
  const isInTheGreen = isBefore(now, fifthBeforeWatering);
  if (isInTheGreen) {
    return { text: '✔', color: green[500], sortValue: 40 };
  }

  // now is between (watering time minus fifth) and (watering time) = yellow; OK
  const isInTheYellow = isWithinInterval(now, {
    start: fifthBeforeWatering,
    end: wateringDatetime,
  });
  if (isInTheYellow) {
    return { text: 'OK', color: yellow[600], sortValue: 30 };
  }

  // now is between (watering time plus fifth) = orange; DRY
  const isInTheOrange = isWithinInterval(now, {
    start: wateringDatetime,
    end: fifthAfterWatering,
  });
  if (isInTheOrange) {
    return { text: 'DRY', color: orange[500], sortValue: 20 };
  }

  // now is past (watering time plus fifth) = red: SAD
  const isInTheRed = isAfter(now, fifthAfterWatering);
  if (isInTheRed) {
    return { text: 'SAD', color: red[500], sortValue: 10 };
  }
};
