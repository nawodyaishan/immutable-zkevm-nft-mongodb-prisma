import { User } from '../../user/entities/user.entity';

export class CreateAuthResponseDto {
  // accessToken: string;
  // refreshToken: string;
  authUser: User;
}
