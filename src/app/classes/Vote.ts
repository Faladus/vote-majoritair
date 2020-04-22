import { Participant } from './Participant';

export class Vote {

    public id: number;

    public name: string;

    public description: string;

    public participants: Participant[];

    public groups: number[][];

    public open: boolean;

}