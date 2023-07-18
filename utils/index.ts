export function directionByIndex(index: number) {
  switch (index) {
    case 0: {
      return "top";
    }
    case 1: {
      return "left";
    }
    case 2: {
      return "bottom";
    }
    case 3: {
      return "right";
    }
    default: {
      break;
    }
  }
}
