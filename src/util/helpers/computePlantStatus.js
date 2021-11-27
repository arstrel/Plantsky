import { green, orange, red, yellow } from '@mui/material/colors';

import add from 'date-fns/add';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isWithinInterval from 'date-fns/isWithinInterval';
import sub from 'date-fns/sub';

export const computeStatus = (plant) => {
  const now = new Date();
  const lastWatered = new Date(plant.lastWatered);
  const wateringDatetime = add(lastWatered, {
    hours: plant.wateringPeriodHours,
  });
  const fifthOfWateringPeriod = Math.floor(plant.wateringPeriodHours / 5);
  const fifthBeforeWatering = sub(wateringDatetime, {
    hours: fifthOfWateringPeriod,
  });
  const fifthAfterWatering = add(wateringDatetime, {
    hours: fifthOfWateringPeriod,
  });

  // now is before (watering time minus fifth) = green; OK
  const isInTheGreen = isBefore(now, fifthBeforeWatering);
  if (isInTheGreen) {
    return { text: '✔', color: green[500] };
  }

  // now is between (watering time minus fifth) and (watering time) = yellow; OK
  const isInTheYellow = isWithinInterval(now, {
    start: fifthBeforeWatering,
    end: wateringDatetime,
  });
  if (isInTheYellow) {
    return { text: 'OK', color: yellow[600] };
  }

  // now is between (watering time plus fifth) = orange; DRY
  const isInTheOrange = isWithinInterval(now, {
    start: wateringDatetime,
    end: fifthAfterWatering,
  });
  if (isInTheOrange) {
    return { text: 'DRY', color: orange[500] };
  }

  // now is past (watering time plus fifth) = red: SAD
  const isInTheRed = isAfter(now, fifthAfterWatering);
  if (isInTheRed) {
    return { text: 'SAD', color: red[500] };
  }
};
