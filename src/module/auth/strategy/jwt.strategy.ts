import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { UserService } from "../../user/user.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("x-access-token"),
      secretOrKey: configService.get<string>("JWT_KEY")
    })
  }

  async validate(payload: any) {
    const user = await this.userService.findOneUserId(payload.sub)
    if (!user) {
      throw new UnauthorizedException()
    }
    const { password, ...userData } = user.toJSON()
    return userData
  }
}
