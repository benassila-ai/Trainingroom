export type Course = {
    id: number;
    title: string;
    description?: string | undefined;
    level: string;
    duration: number;
    maxEnrollment: number;
    price: number;
    category: string;
};

export type NewCourse =  Omit<Course, 'id'>;