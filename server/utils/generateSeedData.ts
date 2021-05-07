import faker from 'faker'
import { IConnectingLine, IRectangle } from '../../src/types'
import Id from '../Id'

export default function generateSeedData({ numberOfRectangles }) {
  const rectangles = generateRectanglesArray(numberOfRectangles)
  console.log(rectangles[0].id)
  return {
    rectangles,
    connectingLines: generateConnectingLines(rectangles),
  }
}

/*
 * helper methods
 */

function generateRectanglesArray(numberOfRectangles: number): IRectangle[] {
  return generateArrayOfLength(numberOfRectangles).map(generateRectangle)
}

function generateRectangle(): IRectangle {
  return {
    id: Id.makeId(),
    name: faker.name.findName(),
    x: randomIntUpTo(800 - 40),
    y: randomIntUpTo(400 - 40),
  }
}

function randomIntUpTo(n: number): number {
  return Math.round(Math.random() * n)
}

function generateConnectingLines(rectangles: IRectangle[]): IConnectingLine[] {
  return halven(rectangles).map((_) => generateConnectingLine(rectangles))
}

function generateConnectingLine(rectangles: IRectangle[]): IConnectingLine {
  const rectangleA = getRandomItem(rectangles)
  const rectangleB = getRandomItem(
    rectangles.filter((r) => r.name !== rectangleA.name)
  )
  const [startingNode, targetNode] = getOrderedRectangles(
    rectangleA,
    rectangleB
  )
  return {
    id: Id.makeId(),
    startingNodeName: startingNode.name,
    targetNodeName: targetNode.name,
  }
}

function generateArrayOfLength(n: number): number[] {
  return Array.from(Array(n).keys())
}

function halven<T>(arr: T[]): T[] {
  return arr.slice(arr.length / 2)
}

function getRandomItem<T>(arr: T[]): T {
  const randomIndex = randomIntUpTo(arr.length - 1)
  return arr[randomIndex]
}

// ensure a nice flow of connecting lines from left to right
function getOrderedRectangles(
  rectangleA: IRectangle,
  rectangleB: IRectangle
): [IRectangle, IRectangle] {
  return rectangleA.x > rectangleB.x
    ? [rectangleB, rectangleA]
    : [rectangleA, rectangleB]
}
