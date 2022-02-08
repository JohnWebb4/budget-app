function getCurrentMonth() {
  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(0);
  thisMonth.setMilliseconds(0);
  thisMonth.setSeconds(0);

  return thisMonth;
}

export {getCurrentMonth};
