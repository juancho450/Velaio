export  interface Task {
    taskName: string;
    taskDeadline: string;
    status: string;
    people: Person[];
}

interface Person {
    name: string;
    age: number;
    skills: Skill[];
}

interface Skill {
    skill: string;
}