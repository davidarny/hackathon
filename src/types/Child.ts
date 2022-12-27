export type ChildGender = "female" | "male";

export type ChildAge = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Child {
    x: number;
    y: number;
    gender: ChildGender;
    age: ChildAge;
}
