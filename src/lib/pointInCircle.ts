export function pointInCircle(pt: [number, number], center: [number, number], r: number) {
    const lhs = Math.pow(center[0] - pt[0], 2) + Math.pow(center[1] - pt[1], 2);
    const rhs = Math.pow(r, 2);

    return lhs < rhs ? -1 : lhs === rhs ? 0 : 1;
}
