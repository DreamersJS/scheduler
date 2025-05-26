export const to24Hour = (timeStr) => {
    // Convert "3:30" to "03:30", if needed
    const [hour, min] = timeStr.split(':');
    return `${hour.padStart(2, '0')}:${min}`;
  };