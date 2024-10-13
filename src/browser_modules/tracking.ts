export type TrackingEntry = {
  message: string;
};

export function submitTrackingEntry(entry: TrackingEntry) {
  return fetch('/api/v1/tracking', { body: JSON.stringify(entry) })
    .then((res) => {
      if (!res.ok) {
        throw Error('Unable to submit tracking information: ' + res.text());
      }

      return true;
    })
    .catch((err) => {
      console.groupCollapsed('Tracking Error');
      console.log('We should add some handling for this');
      console.error(err);

      console.groupEnd();
    });
}
