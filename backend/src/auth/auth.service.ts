import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'src/profiles/profiles.schema';
import { ProfileService } from 'src/profiles/profiles.service';

@Injectable()
export class AuthService {
  constructor(
    private prService: ProfileService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: Profile = await this.prService.findUser(email);

    if (user && user.password === pass) {
      // delete user.password;
      console.log('auth.service', user);
      // const { password, ...result } = user; // This does not do what it is supposed to do (remove the password and return the rest of the user object.)
      console.log('auth.service2 result', user);
      return user;
    }
    return null;
  }

  async loginUser(user: Profile) {
    console.log('auth.service user', user);

    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
