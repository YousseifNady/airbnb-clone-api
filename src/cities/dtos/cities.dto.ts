import { Expose, Transform } from "class-transformer";

export class CitiesDto {
    @Expose()
    @Transform(({ obj }) => obj._id.toString())
    id!: string;

    @Expose()
    name!: string;
}