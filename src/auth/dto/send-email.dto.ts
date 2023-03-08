import { IsNotEmpty, IsString } from "class-validator";

export class SendResetEmailDto {
    @IsString()
    @IsNotEmpty()
    email: string
}