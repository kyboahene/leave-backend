import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    body: string

    @IsNumber()
    leave_id: number
}
