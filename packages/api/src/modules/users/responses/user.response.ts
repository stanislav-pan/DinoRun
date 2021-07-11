import { PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserAttributes } from 'src/modules/users/models/user.model';

@Exclude()
export class UserResponse extends UserAttributes {}

@Exclude()
export class CommonUserData extends PickType(UserResponse, [
  'id',
  'displayName',
  'avatar',
] as const) {}
