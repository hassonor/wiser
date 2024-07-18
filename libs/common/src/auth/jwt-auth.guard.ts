import { CanActivate, Injectable, Inject, ExecutionContext } from "@nestjs/common";
import { Observable, tap, map } from "rxjs";
import { AUTH_SERVICE } from "@app/common/constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "@app/common/dto";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      return false;
    }
    return this.authClient.send<UserDto>("authenticate", {
      Authentication: jwt
    }).pipe(
      tap((res) => {
        context.switchToHttp().getRequest().user = res;
      }),
      map(() => true)
    );
  }
}