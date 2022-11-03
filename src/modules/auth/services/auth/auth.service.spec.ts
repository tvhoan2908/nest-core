import { JwtModule } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { env } from "../../../../env";
import { AuthImplService } from "./auth-impl.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: env.jwtSecretKey,
          signOptions: {
            expiresIn: "1d",
          },
        }),
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthImplService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("generateToken()", () => {
    it("should return access token", async () => {
      console.log("env.jwtSecretKey", env.jwtSecretKey);
      const token = service.generateToken(1);
      console.log("Generate Token: ", token);
      expect(typeof token).toBe("string");
    });
  });
});
