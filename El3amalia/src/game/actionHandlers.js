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

export function normalizeAction(
  action
) {

  return {

    type:
      action.action ||

      null,

    actor:
      action.actor ||

      null,

    target:
      action.target ||

      null,

    role:
      action.role ||

      null,

    message:
      action.message ||

      null,

    metadata:
      action.metadata ||

      {},
  };
}