function getAge(timestamp, unit = 'seconds') {
  switch (unit) {
    case 'days':
      return (new Date() - timestamp) / (1000 * 60 * 60 * 24);
    case 'hours':
      return (new Date() - timestamp) / (1000 * 60 * 60);
    case 'minutes':
      return (new Date() - timestamp) / (1000 * 60);
    case 'seconds':
      return Math.floor((new Date() - timestamp) / 1000);
    default:
      return Math.floor(new Date() - timestamp);
  }
}

export default getAge;
