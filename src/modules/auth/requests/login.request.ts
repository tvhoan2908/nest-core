import { IsNotEmpty } from "class-validator";

export class LoginRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
