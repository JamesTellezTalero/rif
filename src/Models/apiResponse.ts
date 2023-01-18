import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class apiResponse{
    @Column({ nullable: false })
    code: number;
    @Column({ nullable: false })
    message: string;
    data: object;
}