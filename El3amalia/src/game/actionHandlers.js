export function getAction(
  nightActions,
  actionName
) {

  return nightActions.find(
    (action) =>
      action.action ===
      actionName
  );
}

export function getActions(
  nightActions,
  actionName
) {

  return nightActions.filter(
    (action) =>
      action.action ===
      actionName
  );
}