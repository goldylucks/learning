'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
var faker_1 = __importDefault(require('faker'))
var Id_1 = __importDefault(require('../Id'))
function generateSeedData(_a) {
  var numberOfRectangles = _a.numberOfRectangles
  var rectangles = generateRectanglesArray(numberOfRectangles)
  console.log(rectangles[0].id)
  return {
    rectangles: rectangles,
    connectingLines: generateConnectingLines(rectangles),
  }
}
exports['default'] = generateSeedData
/*
 * helper methods
 */
function generateRectanglesArray(numberOfRectangles) {
  return generateArrayOfLength(numberOfRectangles).map(generateRectangle)
}
function generateRectangle() {
  return {
    id: Id_1['default'].makeId(),
    name: faker_1['default'].name.findName(),
    x: randomIntUpTo(800 - 40),
    y: randomIntUpTo(400 - 40),
  }
}
function randomIntUpTo(n) {
  return Math.round(Math.random() * n)
}
function generateConnectingLines(rectangles) {
  return halven(rectangles).map(function (_) {
    return generateConnectingLine(rectangles)
  })
}
function generateConnectingLine(rectangles) {
  var rectangleA = getRandomItem(rectangles)
  var rectangleB = getRandomItem(
    rectangles.filter(function (r) {
      return r.name !== rectangleA.name
    })
  )
  var _a = getOrderedRectangles(rectangleA, rectangleB),
    startingNode = _a[0],
    targetNode = _a[1]
  return {
    id: Id_1['default'].makeId(),
    startingNodeName: startingNode.name,
    targetNodeName: targetNode.name,
  }
}
function generateArrayOfLength(n) {
  return Array.from(Array(n).keys())
}
function halven(arr) {
  return arr.slice(arr.length / 2)
}
function getRandomItem(arr) {
  var randomIndex = randomIntUpTo(arr.length - 1)
  return arr[randomIndex]
}
// ensure a nice flow of connecting lines from left to right
function getOrderedRectangles(rectangleA, rectangleB) {
  return rectangleA.x > rectangleB.x
    ? [rectangleB, rectangleA]
    : [rectangleA, rectangleB]
}
