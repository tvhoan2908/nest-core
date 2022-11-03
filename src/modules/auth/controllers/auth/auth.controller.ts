import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ParseClassPipe } from "../../../core/pipes/parse-class.pipe";
import { IBaseResponse, ResponseEntity } from "../../../core/resources/base-response";
import { LoginRequest } from "../../requests/login.request";
import { AuthService } from "../../services/auth/auth.service";

@Controller("api/v1/auth")
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post("login")
  async login(@Body(ParseClassPipe) request: LoginRequest): Promise<IBaseResponse<string>> {
    const data = await this.authService.login(request);

    return new ResponseEntity<string>(data);
  }
}
