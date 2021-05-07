export default function buildMakeConnectingLine({ Id }) {
  return function makeConnectingLine({
    startingNodeName,
    targetNodeName,
    createdOn = Date.now(),
    id = Id.makeId(),
    modifiedOn = Date.now(),
  } = {}) {
    validateConnectingLine()

    return Object.freeze({
      getStartingNodeName: () => startingNodeName,
      getTargetNodeName: () => targetNodeName,
      getId: () => id,
      getModifiedOn: () => modifiedOn,
    })

    function validateConnectingLine() {
      if (!Id.isValidId(id)) {
        throw new Error('ConnectingLine must have a valid id.')
      }
      if (!startingNodeName) {
        throw new Error('ConnectingLine must have a starting node name.')
      }
      if (!targetNodeName) {
        throw new Error('ConnectingLine must have a target node name.')
      }
    }
  }
}
